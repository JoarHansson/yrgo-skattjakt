"use client";

import { useContext, useState } from "react";
import { UserContext } from "@/app/user-settings-provider";

function UserSettings() {
  const context = useContext(UserContext);
  const [name, setName] = useState("");

  if (!context) {
    throw new Error("SomeComponent must be used within a UserSettingsProvider");
  }

  const { userSettings, setUserSettings } = context;

  const updateUserName = () => {
    setUserSettings((prevSettings) => ({ ...prevSettings, name: name }));
  };

  return (
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
  );
}

export default UserSettings;
