import Link from "next/link";
import PirateRoger from "@/content/pirate-roger.png";
import Sword from "@/content/sword.png";
import ScrollBig from "@/content/scroll-big.png";

export default function WelcomePage() {
  return (
    <>
      <main className="w-full h-screen relative">
        <div className="p-4">
          <img
            src={PirateRoger.src}
            alt="Roger"
            className="m-auto max-w-xs px-8 mb-32  "
          />
          <div className="flex justify-center items-center relative">
            <img
              src={ScrollBig.src}
              alt="scroll"
              className="mx-auto max-w-sm absolute"
            />
            <h1 className="text-center absolute">Introduktion</h1>
          </div>

          <div className="w-[292px] pb-8 bg-cardDarker mx-auto rounded-lg pt-16 px-4">
            <div>Hej barn,</div>
            <div>mitt namn är Roger!</div>
          </div>

          <Link href={"/introduction"} className="absolute bottom-1 right-0">
            <img src={Sword.src} alt="sword" />
          </Link>
        </div>
      </main>
    </>
  );
}
