import "./App.css";
import { useEffect, useState } from "react";
import FryerCard from "./components/FryerCard/FryerCard";
import { db } from "./config/firebase";
import { doc, getDocs, collection, onSnapshot } from "firebase/firestore";
function App() {
  const [fryers, setFryers] = useState([]);
  const fryerInformationRef = collection(db, "fryerCounter");
  console.log(fryerInformationRef);
  
  

  useEffect(() => {
    const getFryerInfo = async () => {
      try {
        const data = await getDocs(fryerInformationRef);
        console.log("Data from Firestore:", data.docs);

        const filteredData = data.docs.map((doc) => {
          console.log(doc);

          return { ...doc.data(), id: doc.id };
        });

        setFryers(filteredData);
        console.log(fryers);
        
      } catch (error) {
        console.error(error);
      }
    };
    getFryerInfo();
  }, []);
  useEffect(() => {
    const fryerCollectionRef = collection(db, "fryerCounter");

    // Set up real-time listener with onSnapshot
    const unsubscribe = onSnapshot(fryerCollectionRef, (snapshot) => {
      console.log("Real-time Firestore data:", snapshot.docs);
      const fryerData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFryers(fryerData);
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  // Cleanup the listener on component unmount

  return (
    <div className="app">
      <h1>Fryer Counter</h1>
      {fryers.map((fryer) => {
        console.log(fryer);
        
        return (
          <FryerCard
            key={fryer.id}
            id={fryer.id}
            numberOfUsageDays={fryer.numberOfUsageDays}
            number={fryer.fryerId}
          />
        );
      })}
    </div>
  );
}

export default App;
