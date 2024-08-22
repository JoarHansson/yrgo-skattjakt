"use client";

import { useContext, useState } from "react";
import { UserContext } from "@/app/user-settings-provider";

function UserSettings() {
  const context = useContext(UserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  type avatar = {
    name: string;
  };

  const avatars: avatar[] = [
    { name: "avatar 1" },
    { name: "avatar 2" },
    { name: "avatar 3" },
  ];

  if (!context) {
    throw new Error(
      "UserSettings component must be used within a UserSettingsProvider"
    );
  }

  const { userSettings, setUserSettings } = context;

  const updateUserName = () => {
    setUserSettings((prevSettings) => ({ ...prevSettings, name: name }));
  };

  const updateUserAvatar = (avatar: avatar) => {
    setUserSettings((prevSettings) => ({
      ...prevSettings,
      avatar: avatar.name,
    }));
  };

  return (
    <>
      <div className="m-4">
        <p>Name: {userSettings.name}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="enter your name..."
          className="border-black border"
        />
        <br />
        <button onClick={updateUserName} className="underline">
          Confirm
        </button>
      </div>
      <div className="m-4">
        <p>Avatar: {userSettings.avatar}</p>
        {avatars.map((avatar) => {
          return (
            <button
              key={avatar.name}
              onClick={() => updateUserAvatar(avatar)}
              className="underline"
            >
              {avatar.name}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default UserSettings;
