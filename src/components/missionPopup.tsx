import { ScrollArea } from "@/components/ui/scroll-area";
import Button from "@/content/button_ok.png";
import ScrollBig from "@/content/scroll-big.png";
import { useContext, useState } from "react";

import Monkey from "@/content/djur/monkey.png";
import Croc from "@/content/djur/croc.png";
import Seal from "@/content/djur/seal.png";
import Parrot from "@/content/djur/parrot.png";
import Bomb from "@/content/bomb.png";
import Moneybag from "@/content/moneybag.png";
import Storyicon from "@/content/story_icon.png";
import { UserContext } from "@/app/user-settings-provider";
import CongratsMission from "./congratsMission";

const imageMap = {
  Monkey: Monkey,
  Croc: Croc,
  Seal: Seal,
  Parrot: Parrot,
  Bomb: Bomb,
  Moneybag: Moneybag,
  Storyicon: Storyicon,
};

interface MessagePopupProps {
  congratsMessage: string;
  description: string;
  storyline: string;
  name: string;
  characterImage: string;
  icon: string;
  onClose: () => void;
}

export default function MissionPopup({
  congratsMessage,
  description,
  storyline,
  name,
  characterImage,
  icon,
  onClose,
}: MessagePopupProps) {
  const backgroundColor = name === "Bomb" ? "#FD5353" : "#FFFCB7";
  // Use type assertion and access the `src` property of the StaticImageData
  const characterImgSrc = imageMap[characterImage as keyof typeof imageMap].src;
  const iconImgSrc = imageMap[icon as keyof typeof imageMap].src;

  const [clickCount, setClickCount] = useState(0);
  const [showDescription, setShowDescription] = useState(true);

  const handleButtonClick = () => {
    if (clickCount === 0) {
      setShowDescription(false);
      setClickCount(1);
    } else {
      onClose();
      updateCoinsCount();
    }
  };

  // coins(/gold) and energy from context:
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(" must be used within a UserSettingsProvider");
  }
  const { userSettings, setUserSettings } = context;

  const updateCoinsCount = () => {
    setUserSettings((prevSettings) => ({
      ...prevSettings,
      coins: userSettings.coins + (name === "Bomb" ? -5 : 10),
    }));
  };

  return (
    <div
      className="w-screen h-screen flex flex-col justify-start gap-7 py-4 items-center"
      style={{ backgroundColor: backgroundColor }}
    >
      <img src={iconImgSrc} width={100} alt="Icon" className="" />

      <div className="w-5/6 h-4/6 bg-cardLight shadow-xl rounded-2xl p-8 flex justify-between pt-16 gap-5 flex-col items-center relative">
        <div className="flex justify-center items-center absolute -top-10 ">
          <img
            src={ScrollBig.src}
            width={900}
            alt="scroll"
            className="mx-auto max-w-sm"
          />
          <h1 className="text-center absolute heading">{name}</h1>
        </div>

        <div className="text-center flex justify-center items-center h-full w-full paragraph">
          {showDescription ? (
            description
          ) : (
            <CongratsMission message={congratsMessage} name={name} />
          )}
        </div>
        {name !== "Bomb" && clickCount === 0 && (
          <p className="text-center text-lg font-bold">
            Har du klarat uppdraget?
          </p>
        )}
        <img src={Button.src} onClick={handleButtonClick} className="z-50" />
      </div>
      <img
        src={characterImgSrc}
        width={200}
        className="absolute left-0"
        style={{ bottom: "-3%", transform: "rotate(13deg)" }}
      />
    </div>
  );
}
