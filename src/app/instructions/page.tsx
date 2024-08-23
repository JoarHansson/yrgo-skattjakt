import Link from "next/link";
import ScrollBig from "@/content/scroll-big.png";
import FlagBlack from "@/content/flag_black.png";
import ButtonSpela from "@/content/button_spela.png";
import QuestionMark from "@/content/qmark_white_small.png";
import Energy from "@/content/energy_small.png";
import Gold from "@/content/gold_small.png";

export default function InstructionsPage() {
  return (
    <>
      <main className="w-full relative">
        <img src={FlagBlack.src} alt="svart flagga" className="m-auto pt-8 " />

        <div className="px-4 pt-8">
          <div className="flex justify-center items-center relative">
            <img
              src={ScrollBig.src}
              alt="scroll"
              className="mx-auto max-w-sm absolute"
            />
            <h1 className="text-center absolute heading">Instruktioner</h1>
          </div>
        </div>

        <div className="w-5/6 pb-4 bg-cardDarker mx-auto rounded-lg py-16 mb-8 px-6 paragraph ">
          Är ni redo för ett äventyr? Som tur är så sitter jag på en hemlighet.
          Det är nämligen så att i sitt giriga plundrande så har den klåfingriga
          piraten tappat ett antal{" "}
          <span className="paragraph-bold">skatter</span> över hela Lindholmen.
          <br />
          <br />
          Det är nu upp till er att hitta dessa skatter som kommer ge er{" "}
          <span className="paragraph-bold">energi</span> nog för att utmana
          Seke.
          <br />
          <br />
          Det finns också guld att tjäna om ni hjälper mina vänner.{" "}
          <span className="paragraph-bold">Guldet</span> ska du samla för att få
          så många poäng som möjligt.
          <br />
          <br />
          När energimätaren är full är ni redo att möta Balderskägg i tornet.
          Skatter och äventyr väntar den nyfikne.
          <br />
          <br />
          <div className="flex justify-between pb-8 px-4">
            <div className="flex flex-col justify-end">
              <img src={QuestionMark.src} alt="question mark" />
              <p>Skatter</p>
            </div>
            <div className="flex flex-col justify-end">
              <img src={Energy.src} alt="question mark" />
              <p>Energi</p>
            </div>
            <div className="flex flex-col justify-end">
              <img src={Gold.src} alt="question mark" />
              <p>Guld</p>
            </div>
          </div>
          <div className="instruction-large text-center">
            Ta er till Lindholmen <br />
            och börja utforska!
          </div>
          <Link href="/map">
            <img
              src={ButtonSpela.src}
              alt="spara knapp"
              className="mx-auto pt-8"
            />
          </Link>
        </div>
      </main>
    </>
  );
}
