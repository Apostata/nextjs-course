import { useRouter } from "next/router";

export default function ClientProject() {
  const {
    query: { projectId },
  } = useRouter();
  return (
    <div>
      <h1>Cliente Project of id: {projectId}</h1>
    </div>
  );
}
