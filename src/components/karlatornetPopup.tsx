import { ScrollArea } from "@/components/ui/scroll-area";
import Button from "@/content/button_ok.png";
import Scroll from "@/content/scroll.png";
import Pirat from "@/content/avatarer/man1.png";
import { useState } from "react";

import Monkey from "@/content/djur/monkey.png";
import Croc from "@/content/djur/croc.png";
import Seal from "@/content/djur/seal.png";
import Parrot from "@/content/djur/parrot.png";
import Bomb from "@/content/bomb.png";
import Moneybag from "@/content/moneybag.png";
import Storyicon from "@/content/story_icon.png";

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

export default function KarlatornetPopup({
  congratsMessage,
  description,
  storyline,
  name,
  characterImage,
  icon,
  onClose,
}: MessagePopupProps) {
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

  return (
    <div className="w-screen h-screen bg-red-700 flex flex-col justify-around items-center">
      <img src={iconImgSrc} width={100} alt="Icon" className="" />

      <div className="w-5/6 h-3/6 pt-11 bg-black-200 rounded-2xl p-8 flex flex-col justify-around items-center relative">
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
