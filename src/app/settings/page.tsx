import UserSettings from "@/components/user-settings";
import FlagBlack from "@/content/flag_black.png";
import ScrollBig from "@/content/scroll-big.png";

export default function SettingsPage() {
  return (
    <>
      <main className="w-full h-screen relative">
        <img src={FlagBlack.src} alt="svart flagga" className="m-auto pt-8 " />

        <div className="flex justify-center items-center relative px-4 pb-16 pt-8">
          <img
            src={ScrollBig.src}
            alt="scroll"
            className="mx-auto max-w-sm absolute"
          />
          <h1 className="text-center absolute">Välj Avatar</h1>
        </div>

        <UserSettings />
      </main>
    </>
  );
}
