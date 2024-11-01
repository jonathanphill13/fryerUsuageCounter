import { useEffect, useState } from "react";
import { db } from "../src/config/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { FryerCard } from "./components/FryerCard/FryerCard";
import './App.css'

export default function App() {
  // const fryerInformation= {
  //   isOn: false,
  //   usageDays:0,
  //   lastUsedDate:"",
  //   usageLogs:[],
  //   lastOilChange:""

  // }
  // const [fryerInfo, setFryerInfo]= useState(fryerInformation)
  const [fryers, setFryers] = useState([]);
  
  useEffect(() => {
    const fryerCollectionRef = collection(db, "fryerIds");

    // Set up real-time listener with onSnapshot
    const unsubscribe = onSnapshot(fryerCollectionRef, (snapshot) => {
      const fryerData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFryers(fryerData);
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="app">
      {fryers.map((fryer) => (
        <div key={fryer.id}>
          <FryerCard
            id={fryer.id}
            usageDays={fryer.usageDays}
          />
        </div>
      ))}
    </div>
  );
}

// const handleStatusChange = async (e, fryerId) => {
//   const fryerRef = collection(db, "fryerIds");
//   // const docSnap = await getDocs(fryerRef);
//   // docSnap.forEach((doc) => console.log(doc.data()?.isOn));
//   const fryerClickedRef = doc(db, "fryerIds", "Fryer" + fryerId);
//   if(e.value ==='isOn'){
//     await updateDoc(fryerClickedRef, {
//       isOn: true
//     })
//   }
//   if(e.value ==='isOff'){
//     await updateDoc(fryerClickedRef, {
//       isOn: false
//     })
//   }

//   console.log(fryerId);
//   console.log(fryerClickedRef);
// };
