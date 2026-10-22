export default function Loading({ compact = false }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center justify-center ${compact
          ? "gap-2 rounded-full bg-green-50 px-3 py-2"
          : "min-h-48 flex-col gap-4"
        }`}
    >
      <div className="relative flex size-6 items-center justify-center">
        <span className="absolute size-6 rounded-full border-2 border-green-100" />

        <span className="size-6 animate-spin rounded-full border-2 border-transparent border-t-green-800 border-r-red-600" />
      </div>

      <span
        className={`font-medium text-green-900 ${compact ? "text-xs" : "text-sm"
          }`}
      >
        Carregando...
      </span>
    </div>
  );
}
