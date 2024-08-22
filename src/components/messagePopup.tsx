import { ScrollArea } from "@/components/ui/scroll-area";
import Button from "@/content/button_ok.png";
import Scroll from "@/content/scroll.png";
import Pirat from "@/content/avatarer/man1.png";

import Monkey from "@/content/djur/monkey.png";
import Croc from "@/content/djur/croc.png";
import Seal from "@/content/djur/seal.png";
import Parrot from "@/content/djur/parrot.png";

const imageMap = {
  Monkey: Monkey,
  Croc: Croc,
  Seal: Seal,
  Parrot: Parrot,
};

interface MessagePopupProps {
  description: string;
  name: string;
  characterImage: string;
  onClose: () => void;
}

export default function MessagePopup({
  description,
  name,
  characterImage,
  onClose,
}: MessagePopupProps) {
  // Use type assertion and access the `src` property of the StaticImageData
  const characterImgSrc = imageMap[characterImage as keyof typeof imageMap].src;

  return (
    <div className="w-screen h-screen bg-cyan-300 flex justify-center items-center">
      <img src={Scroll.src} alt="" className="absolute top-24" />
      <img
        src={characterImgSrc}
        width={140}
        className="absolute top-28 left-8"
      />
      <div className="w-5/6 h-4/6 bg-orange-200 rounded-2xl p-8 flex flex-col justify-around items-center">
        <div>
          <h2>{name}</h2>
        </div>
        <ScrollArea>{description}</ScrollArea>
        <img src={Button.src} onClick={onClose} className="" />
      </div>
    </div>
  );
}
