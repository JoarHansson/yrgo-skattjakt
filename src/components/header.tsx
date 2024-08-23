import coins from "@/content/coins.png";
import energy from "@/content/energy.png";
import Avatar1 from "@/content/avatarer/circle1.png";
import Avatar2 from "@/content/avatarer/circle2.png";
import Avatar3 from "@/content/avatarer/circle3.png";
import Avatar4 from "@/content/avatarer/circle4.png";
import Avatar5 from "@/content/avatarer/circle5.png";
import { StaticImageData } from "next/image";
import { useContext, useState } from "react";
import { UserContext } from "@/app/user-settings-provider";

interface HeaderProps {
  goldCounter: number;
}

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

export default function Header({ goldCounter }: HeaderProps) {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Component must be used within a UserSettingsProvider");
  }
  const { userSettings } = context;

  const [selectedAvatarName, setSelectedAvatarName] = useState(
    userSettings.avatar
  );

  console.log(userSettings.name);
  console.log(userSettings.avatar);
  console.log(selectedAvatarName);

  const usersAvatar = avatars.find((avatar) => {
    return avatar.name === userSettings.avatar;
  });

  console.log(usersAvatar);

  return (
    <div className="w-full">
      <div className="flex flex-col justify-between items-center  gap-4">
        <img
          src={usersAvatar?.image.src}
          alt={usersAvatar?.name}
          className="w-[75px] h-[75px]"
        />
        <h2 className="">{userSettings.name}</h2>
      </div>

      <div className="flex flex-col justify-between items-center mb-4">
        <img src={coins.src} width={75} alt="coins" />
        <div>{userSettings.coins} guld</div>
      </div>

      <div className="flex flex-col justify-between items-center">
        <img src={energy.src} width={75} alt="coins" />
        <div>{userSettings.energy}/4 </div>
      </div>
    </div>
  );
}
