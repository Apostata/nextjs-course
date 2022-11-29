import { useRouter } from "next/router";

export default function PortfolioProject() {
  const router = useRouter();
  const { projectId } = router.query;

  return (
    <div>
      <h1>Portfolio project of id: {projectId}</h1>
    </div>
  );
}
