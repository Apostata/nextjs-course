import { useRouter } from "next/router";

export default function BlogPosts() {
  const { query } = useRouter();
  console.log(query);
  return (
    <div>
      <h1>Blog Posts Page!</h1>
    </div>
  );
}
