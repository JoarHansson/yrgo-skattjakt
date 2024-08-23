"use client";

import Link from "next/link";
import ScrollBig from "@/content/scroll-big.png";
import CoinsLarge from "@/content/coins_large.png";
import BadPirate from "@/content/bad_pirate.png";
import { useContext } from "react";
import { UserContext } from "../user-settings-provider";
import { redirect } from "next/navigation";

export default function WinPage() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(" must be used within a UserSettingsProvider");
  }
  const { userSettings, setUserSettings } = context;

  if (userSettings.energy < 4) {
    redirect("/");
  }

  return (
    <>
      <main className="w-full h-screen relative">
        <div className="px-4 pt-24">
          <div className="flex justify-center items-center relative">
            <img
              src={ScrollBig.src}
              alt="scroll"
              className="mx-auto max-w-sm absolute"
            />
            <h1 className="text-center absolute heading">AARRRGHH!</h1>
          </div>
        </div>

        <div className="w-5/6  pb-16 bg-cardMedium mx-auto rounded-lg pt-16 px-4 paragraph text-center">
          <p>
            Dra skutan baklänges på en liten vagn!
            <br />
            Vilka fullblodssjörövare
            <br />
            och pirater ni blivit!
            <br />
            <br />
            Delad glädje är dubbel glädje,
            <br />
            min skatt är nu även eran skatt.
          </p>
          <img src={CoinsLarge.src} alt="guldmynt" className="mx-auto my-4" />
          <h1 className="heading">Din guldskatt: {userSettings.coins}</h1>
        </div>

        <img
          src={BadPirate.src}
          alt="Balderskägg"
          className="m-auto px-8 -mt-16"
        />

        <Link
          href={"/end"}
          className="absolute top-0 left-0 h-full w-full z-20"
        ></Link>
      </main>
    </>
  );
}
