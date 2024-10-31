import { useEffect, useState } from "react";
import { db } from "../src/config/firebase";
import {
  getDocs,
  onSnapshot,
  collection,
  doc,
  updateDoc,
  Timestamp,
  serverTimestamp,
  increment,
} from "firebase/firestore";

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
  const [timerId, setTimerId] = useState(null);

  // useEffect(() => {
  //   const fetchFryerInfo = async () => {
  //     try {
  //       const data = await getDocs(collection(db, "fryerIds"));
  //       const formattedData = data.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setFryers(formattedData);
  //     } catch (error) {
  //       console.error("Error fetching fryer information:", error);
  //     }
  //   };

  //   fetchFryerInfo();
  // }, []);
  useEffect(() => {
    const fryerCollectionRef = collection(db, "fryerIds");

    // Set up real-time listener with onSnapshot
    const unsubscribe = onSnapshot(fryerCollectionRef, (snapshot) => {
      const fryerData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setFryers(fryerData);
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);
  const handleStatusChange = async (e, fryerId) => {
    const fryerClickedRef = doc(db, "fryerIds", "Fryer" + fryerId);
    const isOn = e.target.value === "isOn";
    // Update Firestore with the current status
    if(isOn){
      await updateDoc(fryerClickedRef, {
        usageDays: increment(1),
      });

    }
    await updateDoc(fryerClickedRef, {
      isOn,
      lastUpdated: serverTimestamp(), // Optional for tracking purposes
    });

    // If turned ON, start an 8-hour timer to auto-turn off
    if (isOn) {
      // Clear any previous timer
      clearTimeout(timerId);

      // Set a new timer to turn off after 8 hours (8 hours = 28,800,000 ms)
      const newTimerId = setTimeout(async () => {
        await updateDoc(fryerClickedRef, { isOn: false });
        console.log(`Fryer ${fryerId} automatically turned OFF after 8 hours.`);
      }, 10000); // 8 hours in milliseconds

      // Store the timer ID in state to clear it later if necessary
      setTimerId(newTimerId);
    } else {
      // If manually turned off, clear the timer
      clearTimeout(timerId);
    }
  };

  return (
    <div className="App">
      {fryers.map((fryer) => (
        <div key={fryer.id}>
          <h1>{`Fryer ${fryer.id}`}</h1>
          <fieldset>
            <legend>Select the Fryer Status</legend>

            <div>
              <input
                type="radio"
                id={`${fryer.id}-on`}
                name={`status-${fryer.id}`}
                value="isOn"
                onChange={(e) => handleStatusChange(e, `${fryer.id}`)}
              />
              <label htmlFor={`${fryer.id}-on`}>ON</label>
            </div>

            <div>
              <input
                type="radio"
                id={`${fryer.id}-off`}
                name={`status-${fryer.id}`}
                value="isOff"
                defaultChecked
                onChange={(e) => handleStatusChange(e, `${fryer.id}`)}
              />
              <label htmlFor={`${fryer.id}-off`}>OFF</label>
            </div>
          </fieldset>
          <p>
            Last turned on:{" "}
            {fryer.lastOn ? fryer.lastOn.toDate().toLocaleString() : "N/A"}
          </p>
          <p>Days turned on: {fryer.usageDays || 0}</p>
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
