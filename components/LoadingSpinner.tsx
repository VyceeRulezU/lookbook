interface LoadingSpinnerProps {
  variant?: "grid" | "detail" | "card";
}

export default function LoadingSpinner({
  variant = "card",
}: LoadingSpinnerProps) {
  if (variant === "grid") {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg bg-warm">
            <div className="skeleton aspect-card w-full" />
            <div className="space-y-3 p-4">
              <div className="skeleton h-4 w-3/4 rounded" />
              <div className="skeleton h-3 w-1/2 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "detail") {
    return (
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="skeleton aspect-featured w-full rounded-lg" />
        <div className="space-y-4">
          <div className="skeleton h-8 w-2/3 rounded" />
          <div className="skeleton h-4 w-1/3 rounded" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-3/4 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="skeleton aspect-portrait w-full rounded-lg" />
          <div className="skeleton aspect-portrait w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg bg-warm">
      <div className="skeleton aspect-card w-full" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
      </div>
    </div>
  );
}
