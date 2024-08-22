import Link from "next/link";
import Sword from "@/content/sword.png";
import ScrollBig from "@/content/scroll-big.png";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function IntroductionPage() {
  return (
    <>
      <main className="w-full h-screen relative">
        <div className="px-4 pt-16">
          <div className="flex justify-center items-center relative">
            <img
              src={ScrollBig.src}
              alt="scroll"
              className="mx-auto max-w-sm absolute"
            />
            <h1 className="text-center absolute">Om piratskatten</h1>
          </div>
        </div>

        <div className="w-5/6 h-4/6 pb-8 bg-cardDarker mx-auto rounded-lg pt-16 px-4">
          <ScrollArea>
            Jag har hittat en gammal skattkarta från förr. Men jag är för gammal
            och skruttig för att ensam hitta skatten. Den ondskefulle piraten
            Seke Balderskägg har rövat bort min kära skattkista full av
            piratguld. Han bor uppe i tornet och ser allt så passa er Vill ni
            hjälpa mig? Välj hur er äventyrare skall se ut.  - Är ni redo för
            ett äventyr? Som tur är så sitter jag på en hemlighet. Det är
            nämligen så att i sitt giriga plundrande så har den klåfingriga
            piraten tappat ett antal skatter över hela Lindholmen. Det är nu upp
            till er att hitta dessa skatter. För varje skatt kommer ni att växa
            som pirat och detta kommer öka ert mod.  - Gah en skatt kommer fylla
            på en plupp i eran modmätare uppe i vänstra hörnet. När modmätaren
            är full är ni redo att möta Balderskägg i tornet. Skatter och
            äventyr väntar den nyfikne. Ta er till Lindholmen och börja
            utforska!
          </ScrollArea>
        </div>

        <Link href={"/settings"} className="absolute bottom-1 right-0">
          <img src={Sword.src} alt="sword" />
        </Link>
      </main>
    </>
  );
}
