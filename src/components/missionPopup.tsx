import { ScrollArea } from "@/components/ui/scroll-area";
import Button from "@/content/button_ok.png";
import Scroll from "@/content/scroll.png";
import { useContext, useState } from "react";

import Monkey from "@/content/djur/monkey.png";
import Croc from "@/content/djur/croc.png";
import Seal from "@/content/djur/seal.png";
import Parrot from "@/content/djur/parrot.png";
import Bomb from "@/content/bomb.png";
import Moneybag from "@/content/moneybag.png";
import Storyicon from "@/content/story_icon.png";
import { UserContext } from "@/app/user-settings-provider";

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
      setShowDescription(false); // Change this to the desired text
      setClickCount(1);
    } else {
      onClose();
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
      coins: userSettings.coins /* +/- some value here */,
    }));
  };

  return (
    <div
      className="w-screen h-screen flex flex-col justify-around items-center"
      style={{ backgroundColor: backgroundColor }}
    >
      <img src={iconImgSrc} width={100} alt="Icon" className="" />

      <div className="w-5/6 h-3/6 pt-11 bg-orange-200 rounded-2xl p-8 flex flex-col justify-around items-center relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <img src={Scroll.src} width={1050} alt="" />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            {name}
          </div>
        </div>

        <ScrollArea className="text-center">
          {showDescription ? description : congratsMessage}
        </ScrollArea>
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
