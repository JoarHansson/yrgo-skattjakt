"use client";

import { useContext, useState } from "react";
import { UserContext } from "@/app/user-settings-provider";
import Avatar1 from "@/content/avatarer/avatar1.png";
import Avatar2 from "@/content/avatarer/avatar2.png";
import Avatar3 from "@/content/avatarer/avatar3.png";
import Avatar4 from "@/content/avatarer/avatar4.png";
import Avatar5 from "@/content/avatarer/avatar5.png";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { StaticImageData } from "next/image";
import Link from "next/link";
import ButtonSpara from "@/content/button_spara.png";
import { Check } from "lucide-react";

export default function UserSettings() {
  const context = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("Avatar1");

  type avatarType = {
    name: string;
    image: StaticImageData;
  };

  const avatars: avatarType[] = [
    { name: "Avatar1", image: Avatar1 },
    { name: "Avatar2", image: Avatar2 },
    { name: "Avatar3", image: Avatar3 },
    { name: "Avatar4", image: Avatar4 },
    { name: "Avatar5", image: Avatar5 },
  ];

  if (!context) {
    throw new Error(
      "UserSettings component must be used within a UserSettingsProvider"
    );
  }

  const { userSettings, setUserSettings } = context;

  const updateUserName = () => {
    setUserSettings((prevSettings) => ({ ...prevSettings, name: userName }));
  };

  const updateUserAvatar = (a: string) => {
    setUserSettings((prevSettings) => ({
      ...prevSettings,
      avatar: a,
    }));
  };

  return (
    <>
      <Carousel className="w-full max-w-xs m-auto ">
        <CarouselContent>
          {avatars.map((avatar, index) => (
            <CarouselItem key={avatar.name}>
              <div className="p-1 relative">
                {selectedAvatar === avatar.name && (
                  <div className="top-4 bg-accent right-4 absolute h-12 w-12 rounded-full flex items-center justify-center">
                    <Check
                      className="text-green-500 scale-150"
                      strokeWidth={3}
                    />
                  </div>
                )}

                <Card className="bg-cardDarker">
                  <CardContent className="flex aspect-square items-center justify-center p-6 ">
                    <button
                      className="text-4xl font-semibold flex justify-center items-center"
                      onClick={() => setSelectedAvatar(avatar.name)}
                    >
                      <img src={avatar.image.src} className="scale-75" />
                    </button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="w-full max-w-xs m-auto p-1 ">
        <input
          className="p-1 w-full bg-cardDarker heading rounded-lg px-4 py-2"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Skriv ditt namn"
        />
      </div>

      <Link
        href="/instructions"
        onClick={() => {
          updateUserName();
          updateUserAvatar(selectedAvatar);
        }}
      >
        <img src={ButtonSpara.src} alt="spara knapp" className="mx-auto pt-8" />
      </Link>
    </>
  );
}
