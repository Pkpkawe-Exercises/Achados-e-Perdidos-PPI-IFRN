export default function ItemStatusBadge({ status }) {
  const normalizedStatus = String(status ?? "").toLowerCase();

  const returned = normalizedStatus === "devolvido";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
        returned
          ? "border-green-200 bg-green-50 text-green-800"
          : "border-amber-200 bg-amber-50 text-amber-800"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${
          returned ? "bg-green-600" : "bg-amber-500"
        }`}
      />

      {returned ? "Devolvido" : "Aguardando"}
    </span>
  );
}
