import React from "react";
import Coins from "@/content/coins.png";

interface CongratsMissionProps {
  message: string;
  name: string;
}

const CongratsMission: React.FC<CongratsMissionProps> = ({ message, name }) => {
  const coinsChange = name === "Bomb" ? -5 : +10;
  return (
    <div className="flex flex-col justify-around items-center gap-2">
      <div className="congrats-message heading">{message}</div>
      <img src={Coins.src} width={150} alt="" />
      <div className="heading">{coinsChange}</div>
    </div>
  );
};

export default CongratsMission;
