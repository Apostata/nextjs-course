import { useRouter } from "next/router";
export default function ClientProjectsById() {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  return (
    <div>
      <h1>List of projects by client, client id:{id}</h1>
      <button
        onClick={() => {
          router.push(`/clients/${id}/12`);
        }}
      >
        Load Project 12
      </button>
    </div>
  );
}
