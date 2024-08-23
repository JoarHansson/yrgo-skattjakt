import Link from "next/link";
import Sword from "@/content/sword_new.png";
import ScrollBig from "@/content/scroll-big.png";
import FlagBlack from "@/content/flag_black.png";
import PirateRoger from "@/content/pirate-roger.png";

export default function IntroductionPage() {
  return (
    <>
      <main className="w-full h-screen relative">
        <img src={FlagBlack.src} alt="svart flagga" className="m-auto pt-8 " />

        <div className="px-4 pt-8">
          <div className="flex justify-center items-center relative">
            <img
              src={ScrollBig.src}
              alt="scroll"
              className="mx-auto max-w-sm absolute"
            />
            <h1 className="text-center absolute heading">Introduktion</h1>
          </div>
        </div>

        <div className="w-5/6  pb-4 bg-cardDarker mx-auto rounded-lg pt-16 px-4 paragraph ">
          Jag har hittat en gammal skattkarta från förr. <br />
          <br />
          Men jag är för gammal och skruttig för att ensam hitta skatten. <br />
          <br />
          <span className="paragraph-bold">
            Den ondskefulle piraten Seke Balderskägg
          </span>{" "}
          har rövat bort min kära skattkista full av piratguld.
          <br />
          <br />
          Han bor uppe i tornet och ser allt så passa er.
          <br />
          <br />
          <span className="paragraph-bold">Vill ni hjälpa mig?</span>
          <Link href={"/settings"} className="flex flex-col items-end mt-8">
            <img src={Sword.src} alt="sword" />
            <p className="paragraph-bold text-right">Nästa</p>
          </Link>
        </div>

        <img
          src={PirateRoger.src}
          alt="Roger"
          className="m-auto px-8 scale-75 -mt-8"
        />
      </main>
    </>
  );
}
