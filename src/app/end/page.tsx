"use client";

import Link from "next/link";
import Roger from "@/content/roger-firstpage.png";
import ButtonSpelaIgen from "@/content/button_spela_igen.png";
import { useContext } from "react";
import { UserContext } from "../user-settings-provider";

export default function EndPage() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(" must be used within a UserSettingsProvider");
  }
  const { userSettings, setUserSettings } = context;

  const handleClick = () => {
    setUserSettings({ name: "Pirat", avatar: "Avatar1", coins: 0, energy: 0 });
  };

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
            <h1 className="m-auto text-center font-inknut text-[36px] ">
              Slut
            </h1>
          </div>

          <Link href="/">
            <img
              src={ButtonSpelaIgen.src}
              alt="spara knapp"
              className="mx-auto pt-4"
              onClick={handleClick}
            />
          </Link>
        </div>

        <div className="font-gelasio text-[14px] text-[#FDF3E0] text-center pb-8 px-16 bg-[#060F2C]">
          <p>
            av MF Niklas och Kristoffer, UX Anders, Simona och Åsa och WU Joar
            och William
            <br />® 2024
          </p>
        </div>
      </div>
    </main>
  );
}
