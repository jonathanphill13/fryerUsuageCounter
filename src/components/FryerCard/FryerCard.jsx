import { useCallback } from "react";
import "./FryerCard.css";
import { assets } from "../../assets/assets";
import { db } from "../../config/firebase";
import { updateDoc, increment, doc } from "firebase/firestore";

const FryerCard = ({ number, id, numberOfUsageDays }) => {
  const fryerObj = {
    fryerId: "",
    isOff: true,
    isOn: false,
    numberOfUsageDays: 0,
  };

  //   fryerInformaitonRef is a referecne pointing to the db in firestore to a collection called fryerCounter
  const fryerInformationRef = doc(db, "fryerCounter", id);

  // increase fryer usage days if the plus button is clicked
  const increaseFryerUseDays = useCallback(async () => {
    await updateDoc(fryerInformationRef, {
      numberOfUsageDays: increment(1),
    });
  }, []);
  // decrease fryer usage days if the negative button is clicked
  const decreaseFryerUseDays = useCallback(async () => {
    console.log(numberOfUsageDays);

    if (numberOfUsageDays > 0) {
      await updateDoc(fryerInformationRef, {
        numberOfUsageDays: increment(-1),
      });
    }
  }, [numberOfUsageDays]);
  //   resets the fryer usaage days to 0
  const resetFryerUseDays = useCallback(async () => {
    await updateDoc(fryerInformationRef, {
      numberOfUsageDays: 0,
    });
  }, []);
  return (
    <div className="fryerCard">
      <h2>Fryer {number} </h2>
      <p>
        Used for {numberOfUsageDays} day{numberOfUsageDays !== 1 ? "s" : ""}
      </p>
      <button className="image-button" onClick={increaseFryerUseDays}>
        <img src={assets.add_icon_green} alt="" />
      </button>
      <button
        className="image-button"
        onClick={decreaseFryerUseDays}
        disabled={numberOfUsageDays <= 0}
      >
        <img src={assets.remove_icon_red} alt="decrease usage days" />
      </button>

      <button className="button" onClick={resetFryerUseDays}>
        Reset Usage Days
      </button>
    </div>
  );
};

export default FryerCard;
