import { useState, useCallback } from "react";
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
      <img src={assets.add_icon_green} alt="" onClick={increaseFryerUseDays} />
      <button
      className="button"
      onClick={resetFryerUseDays}>Reset Usage Days</button>
    </div>
  );
};

export default FryerCard;
