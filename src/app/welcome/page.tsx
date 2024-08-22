import Link from "next/link";

export default function WelcomePage() {
  return (
    <>
      <h1>introduction</h1>
      <div>Hej barn, mitt namn är Roger!</div>
      <Link href={"/introduction"} className="underline">
        vidare
      </Link>
    </>
  );
}
