import { ScrollArea } from "@/components/ui/scroll-area";
import Button from "@/content/button_ok.png";
import Scroll from "@/content/scroll.png";
import Pirat from "@/content/avatarer/man1.png";
import { useState } from "react";
import ScrollBig from "@/content/scroll-big.png";
import Link from "next/link";
import KarlatornetLight from "@/content/tower_light.png";
import KarlaIntro from "@/content/KarlaIntro.png";

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
  const [showSecondScreen, setShowSecondScreen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const handleButtonClick = () => {
    if (clickCount === 0) {
      setShowSecondScreen(false);
      setClickCount(1);
    } else {
      onClose();
    }
    setIsVisible(true);
  };

  return (
    <div className="w-screen h-screen bg-finalBlack flex flex-col justify-around items-center">
      <div className="flex flex-col h-full w-full" onClick={handleButtonClick}>
        <img className="absolute" src={KarlaIntro.src} alt="" />
      </div>

      {isVisible && (
        <div className="w-screen h-screen bg-finalBlack absolute flex flex-col justify-center items-center gap-4">
          <img src={KarlatornetLight.src} width={140} alt="" />
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
            <ScrollArea className="paragraph">{description}</ScrollArea>
            <Link href="/win">
              <img src={Button.src} className="" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
