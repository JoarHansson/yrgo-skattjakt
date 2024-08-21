import { ScrollArea } from "@/components/ui/scroll-area";
import Button from "@/content/button_ok.png";

interface MessagePopupProps {
  description: string;
  name: string;
  image: string;
  onClose: () => void;
}

export default function messagePopup({
  description,
  name,
  image,
  onClose,
}: MessagePopupProps) {
  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="w-5/6 h-4/6 bg-white border-black border-8 rounded-xl p-8 flex flex-col justify-around items-center">
        <div>
          <img className="rounded-xl" src={image} alt="Karaktär" />
          <h2>{name}</h2>
        </div>
        <ScrollArea>{description}</ScrollArea>
        <img src={Button.src} onClick={onClose} className=""></img>
      </div>
    </div>
  );
}
