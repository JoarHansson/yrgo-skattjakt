import React from "react";
import Energy from "@/content/energy.png";

interface CongratsEnergyMessageProps {
  message: string;
}

const CongratsEnergyMessage: React.FC<CongratsEnergyMessageProps> = ({
  message,
}) => {
  return (
    <div className="flex flex-col justify-around items-center gap-8">
      <div className="congrats-message heading">{message}</div>
      <img src={Energy.src} width={150} alt="" />
      <div className="heading">+1</div>
    </div>
  );
};

export default CongratsEnergyMessage;
