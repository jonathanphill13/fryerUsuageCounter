import { useState, useCallback, useEffect } from "react";
import "./FryerCard.css";
import { assets } from "../../assets/assets";




const FryerCard = ({ number }) => {
  const [count, setCount] = useState(0);
  

  const increaseFryerUseDays = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const resetFryerUseDays = useCallback(() => {
    setCount(0);
  }, []);
  return (
    <div className="fryerCard">
      <h2>Fryer {number} </h2>
      <p>
        Used for {count} day{count !== 1 ? "s" : ""}
      </p>
      <button className="image-button" onClick={increaseFryerUseDays}>
        <img src={assets.add_icon_green} alt="" />
      </button>

      <button className="button" onClick={resetFryerUseDays}>
        Reset Usage Days
      </button>
    </div>
  );
};

export default FryerCard;
