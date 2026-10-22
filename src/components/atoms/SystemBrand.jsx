
import { Link } from "react-router-dom";

export default function SystemBrand() {
  return (
    <Link
      to="/"
      aria-label="Achados e Perdidos do IFRN — Página inicial"
      className="group flex min-w-0 items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-4"
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-green-100 bg-linear-to-br from-green-50 to-white p-1.5 shadow-sm transition-all duration-300 group-hover:border-green-200 group-hover:shadow-md">
        <img
          src="/Logo.png"
          alt=""
          className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="min-w-0">
        <h1 className="truncate text-sm font-extrabold tracking-tight text-green-950 sm:text-base">
          Achados e Perdidos
        </h1>

        <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-gray-500 sm:text-xs">
          Instituto Federal

          <span
            aria-hidden="true"
            className="size-1 rounded-full bg-red-600"
          />

          <span className="font-bold text-green-800">
            IFRN
          </span>
        </p>
      </div>
    </Link>
  );
}
