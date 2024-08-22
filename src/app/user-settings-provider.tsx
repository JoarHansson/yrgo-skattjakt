"use client";

import { createContext, useState } from "react";

interface UserSettings {
  name: string;
  avatar: string;
  coins: number;
  energy: number;
}

interface UserContextType {
  userSettings: UserSettings;
  setUserSettings: React.Dispatch<React.SetStateAction<UserSettings>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export default function UserSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userSettings, setUserSettings] = useState<UserSettings>({
    name: "Pirat",
    avatar: "Avatar1",
    coins: 0,
    energy: 0,
  });

  return (
    <UserContext.Provider value={{ userSettings, setUserSettings }}>
      {children}
    </UserContext.Provider>
  );
}
