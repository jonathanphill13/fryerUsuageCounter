import { useEffect, useState, useCallback } from "react";
import { db } from "../../config/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// eslint-disable-next-line react/prop-types
export const MultipleFryerTracker = ({ fryerIds }) => {
  const [usageCounts, setUsageCounts] = useState({});
  useEffect(() => {
    const fetchUsuageCounts = async () => {
      const newUsageCounts = {};
      await(
        fryerIds.map(async (fryerId) => {
          const docRef = doc(db, "fryerIds", fryerId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            newUsageCounts[fryerId] = docSnap.data().usageCount || 0;
          } else {
            await setDoc(docRef, { usageCount: 0 });
            newUsageCounts[fryerId] = 0;
          }
        })
      );
      setUsageCounts(newUsageCounts);
    };
    fetchUsuageCounts();
  },[fryerIds]);

  const increaseUsage = useCallback(async (fryerId) => {
    const docRef = doc(db, "fryerIds", fryerId);
    const newCount = (usageCounts[fryerId] || 0) + 1;
    await updateDoc(docRef, { usageCount: newCount });
    setUsageCounts((prevCounts) => ({ ...prevCounts, [fryerId]: newCount }));
  }, [usageCounts]);

  // Reset usage count for a specific fryer
  const resetUsage = useCallback(async (fryerId) => {
    const docRef = doc(db, "fryerIds", fryerId);
    await updateDoc(docRef, { usageCount: 0 });
    setUsageCounts((prevCounts) => ({ ...prevCounts, [fryerId]: 0 }));
  }, []);
  return (
    <div className="multiFryerTracker">
      {fryerIds.map((fryerId) => (
        <div key={fryerId} className="fryerTracker">
          <h2>Fryer {fryerId}</h2>
          <p>Used for {usageCounts[fryerId] || 0} day{usageCounts[fryerId] !== 1 ? 's' : ''}</p>
          <button onClick={() => increaseUsage(fryerId)}>Increase Usage</button>
          <button onClick={() => resetUsage(fryerId)}>Reset Usage</button>
        </div>
      ))}
    </div>
  );
};
