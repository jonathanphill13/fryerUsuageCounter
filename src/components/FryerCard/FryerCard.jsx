import { useState, useEffect } from "react";
import "./FryerCard.css";
import { db } from "../../config/firebase";
import { doc, updateDoc, serverTimestamp, increment } from "firebase/firestore";

export const FryerCard = ({ id, usageDays }) => {
  const [isOn, setIsOn] = useState(false); // Tracks if the fryer is ON or OFF
  const [timerId, setTimerId] = useState(null);
  const fryerRef = doc(db, "fryerIds", "Fryer" + id);

  const handleStatusChange = async (e) => {
    const newIsOn = e.target.value === "isOn";
    setIsOn(newIsOn); // Update local state immediately

    await updateDoc(fryerRef, {
      isOn: newIsOn,
      lastUpdated: serverTimestamp(),
      ...(newIsOn && { usageDays: increment(1) }),
    });

    if (newIsOn) {
      clearTimeout(timerId);

      const newTimerId = setTimeout(async () => {
        await updateDoc(fryerRef, { isOn: false });
        setIsOn(false); // Reflect the automatic turn-off in the component state
        console.log(`Fryer ${id} automatically turned OFF after 8 hours.`);
      }, 10000); // 8 hours in milliseconds

      setTimerId(newTimerId);
    } else {
      clearTimeout(timerId);
    }
  };

  useEffect(() => {
    return () => clearTimeout(timerId);
  }, [timerId]);

  return (
    <div className="fryerCard">
      <h1>{"Fryer " + id}</h1>
      <fieldset>
        <legend>Select the Fryer Status</legend>

        <div>
          <input
            type="radio"
            id={`${id}-on`}
            name={`status-${id}`}
            value="isOn"
            checked={isOn}
            onChange={handleStatusChange}
          />
          <label htmlFor={`${id}-on`}>ON</label>
        </div>

        <div>
          <input
            type="radio"
            id={`${id}-off`}
            name={`status-${id}`}
            value="isOff"
            checked={!isOn}
            onChange={handleStatusChange}
          />
          <label htmlFor={`${id}-off`}>OFF</label>
        </div>
      </fieldset>
      <p>Days turned on: {usageDays || 0}</p>
    </div>
  );
};
