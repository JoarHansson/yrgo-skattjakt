import UserSettings from "@/components/user-settings";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <>
      <UserSettings />
      <Link href={"/map"} className="underline">
        vidare
      </Link>
    </>
  );
}
