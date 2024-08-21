"use client";

import { createContext, useState } from "react";

interface UserSettings {
  name: string;
  avatar: string;
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
    name: "",
    avatar: "",
  });

  return (
    <UserContext.Provider value={{ userSettings, setUserSettings }}>
      {children}
    </UserContext.Provider>
  );
}
