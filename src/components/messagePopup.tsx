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

export default function MessagePopup({
  congratsMessage,
  description,
  storyline,
  name,
  characterImage,
  icon,
  onClose,
}: MessagePopupProps) {
  // Use type assertion and access the `src` property of the StaticImageData
  const characterImgSrc = imageMap[characterImage as keyof typeof imageMap].src;
  const iconImgSrc = imageMap[icon as keyof typeof imageMap].src;

  const [clickCount, setClickCount] = useState(0);
  const [showStoryline, setShowStoryline] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  const handleButtonClick = () => {
    if (clickCount === 0) {
      setShowStoryline(false);
      setShowDescription(true);
      setClickCount(1);
    } else if (clickCount === 1) {
      setShowDescription(false);
      setShowCongrats(true);
      setClickCount(2);
    } else {
      onClose();
      updateEnergyCount();
    }
  };

  // coins(/gold) and energy from context:
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(" must be used within a UserSettingsProvider");
  }
  const { userSettings, setUserSettings } = context;

  const updateEnergyCount = () => {
    setUserSettings((prevSettings) => ({
      ...prevSettings,
      energy: userSettings.energy + 1,
      // always updates by 1?
    }));
  };

  return (
    <div className="w-screen h-screen bg-cyan-300 flex justify-around items-center flex-col py-14 overflow-hidden">
      <img src={iconImgSrc} width={100} alt="Icon" className="" />

      <div className="w-5/6 h-4/6 bg-orange-200 rounded-2xl p-8 flex flex-col justify-around items-center relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <img src={Scroll.src} width={1050} alt="" />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            {name}
          </div>
        </div>

        <ScrollArea>
          {showStoryline && storyline}
          {showDescription && description}
          {showCongrats && congratsMessage}
        </ScrollArea>
        <img src={Button.src} onClick={handleButtonClick} className="" />
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
