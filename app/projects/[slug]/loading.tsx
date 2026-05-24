import LoadingSpinner from "@/components/LoadingSpinner";

export default function ProjectDetailLoading() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24 lg:px-24">
      <LoadingSpinner variant="detail" />
    </div>
  );
}
