import Link from "next/link";
import PirateRoger from "@/content/pirate-roger.png";
import Sword from "@/content/sword_new.png";

export default function WelcomePage() {
  return (
    <>
      <main className="w-full h-screen relative pt-16">
        <img src={PirateRoger.src} alt="Roger" className="m-auto px-8 mb-24" />

        <h1 className="heading px-16">
          Hej, <br />
          mitt namn är Roger!
        </h1>

        <Link href={"/introduction"} className="absolute bottom-6 right-12">
          <img src={Sword.src} alt="sword" />
          <p className="paragraph-bold text-right">Nästa</p>
        </Link>
      </main>
    </>
  );
}
