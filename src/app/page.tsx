import Link from "next/link";
import TowerShipPirate from "@/content/tower-ship-pirate.png";
import Sword from "@/content/sword.png";
import ScrollBig from "@/content/scroll-big.png";

export default function Home() {
  return (
    <main className="w-full h-screen relative">
      <div className="p-4">
        <img
          src={TowerShipPirate.src}
          alt="pirate and ship"
          className="mx-auto max-w-xs "
        />
        <img
          src={ScrollBig.src}
          alt="scroll"
          className="mx-auto max-w-sm px-8 "
        />
        <div className="w-[292px] pb-16 bg-cardDarker mx-auto -my-12 rounded-lg pt-16 px-4">
          <h1 className="m-auto text-center">Skattjakten</h1>
          <h1 className="m-auto text-center">på</h1>
          <h1 className="m-auto text-center">Lindholmen</h1>
        </div>
        <Link href={"/welcome"} className="absolute bottom-1 right-0">
          <img src={Sword.src} alt="sword" />
        </Link>
      </div>
    </main>
  );
}
