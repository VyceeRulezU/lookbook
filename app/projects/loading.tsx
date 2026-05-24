import LoadingSpinner from "@/components/LoadingSpinner";

export default function ProjectsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-24">
      <div className="skeleton mb-4 h-10 w-48 rounded" />
      <div className="skeleton mb-10 h-5 w-72 rounded" />
      <LoadingSpinner variant="grid" />
    </div>
  );
}
