import UserSettings from "@/components/user-settings";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Skattjakten på Lindholmen</h1>
      <Link href={"/welcome"} className="underline">
        vidare
      </Link>
    </>
  );
}
