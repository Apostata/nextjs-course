import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Not Found! 404</h1>
      <ul>
        <li>
          <Link replace href="/">
            Go back to Home
          </Link>
        </li>
      </ul>
    </div>
  );
}
