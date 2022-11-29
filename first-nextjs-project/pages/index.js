import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home Page!</h1>
      <ul>
        <li>
          <Link href="/portfolio">portfolio</Link>
        </li>
        <li>
          <Link href="/clients">clients</Link>
        </li>
      </ul>
    </div>
  );
}
