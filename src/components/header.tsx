import coins from "@/content/coins.png";
import pirat1 from "@/content/avatarer/man1.png";

interface HeaderProps {
  goldCounter: number;
}

export default function Header({ goldCounter }: HeaderProps) {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between gap-20">
        <img src={pirat1.src} alt="Pirat" width={70} />
        <h2 className="">Playername</h2>
      </div>
      <div className="ml-1 mt-6 flex flex-col justify-start items-start">
        <img src={coins.src} width={50} alt="coins" />
        <div>Gold: {goldCounter} </div>
      </div>
    </div>
  );
}
