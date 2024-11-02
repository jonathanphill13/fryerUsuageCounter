import "./App.css";
import { useEffect, useState } from "react";
import FryerCard from "./components/FryerCard/FryerCard";
import { db } from "./config/firebase";
import { doc, getDocs, collection, onSnapshot } from "firebase/firestore";
function App() {
  const [fryers, setFryers] = useState([]);
  const fryerInformationRef = collection(db, "fryerCounter");
  useEffect(() => {
    const getFryerInfo = async () => {
      try {
        const data = await getDocs(fryerInformationRef);
        const filteredData = data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

        setFryers(filteredData);
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
      const fryerData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFryers(fryerData);
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  },[]);

    // Cleanup the listener on component unmount


  return (
    <div className="app">
      <h1>Fryer Counter</h1>
      {fryers.map((fryer) => {        
        return (
          <FryerCard
            key={fryer.id}
            id={fryer.id}
            numberOfUsageDays={fryer.numberOfUsageDays}
            number={fryer.fryerId}
          />
        );
      })}
      {/* <FryerCard
      number={1}/>
      <FryerCard
      number={2}/>
      <FryerCard
      number={3}/> */}
    </div>
  );
}

export default App;
