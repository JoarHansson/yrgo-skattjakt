import Link from "next/link";
import Roger from "@/content/roger-firstpage.png";
import Sword from "@/content/sword.png";
import ScrollBig from "@/content/scroll-big.png";

export default function HomePage() {
  return (
    <main className="w-full h-screen relative bg-[#060F2C]">
      <div className="flex justify-between flex-col h-full">
        <div className="p-4">
          <img
            src={Roger.src}
            alt="pirate and ship"
            className="mx-auto p-8 pb-2"
          />

          <div className="text-[#FDF3E0]">
            <h1 className="m-auto text-center heading ">Balderskägg</h1>
            <p className="m-auto paragraph text-center">ett upptäckaräventyr</p>
            <p className="m-auto paragraph text-center">på Lindholmen</p>
          </div>
        </div>

        <div className="font-gelasio text-[14px] text-[#FDF3E0] text-center pb-8">
          <p>av MF, UX och WU </p>
          <p>® 2024</p>
        </div>
      </div>
      <Link
        href={"/welcome"}
        className="absolute top-0 left-0 h-full w-full z-20"
      ></Link>
    </main>
  );
}
