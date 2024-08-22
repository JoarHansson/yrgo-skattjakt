import Link from "next/link";

export default function IntroductionPage() {
  return (
    <>
      <h1>introduction</h1>
      <div>this is the intro text</div>
      <Link href={"/settings"} className="underline">
        vidare
      </Link>
    </>
  );
}
