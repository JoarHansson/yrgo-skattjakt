import Link from "next/link";

export default function Home() {
  return (
    <div className="m-4">
      <Link href={"/map"} className="underline">
        Start the game
      </Link>
    </div>
  );
}
