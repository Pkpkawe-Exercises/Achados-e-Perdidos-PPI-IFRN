import { MapPin, SlidersHorizontal, Tag } from "lucide-react";

const controlClass =
  "w-full min-w-0 appearance-none rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10";

export default function ItemFilters({
  filters,
  onChange,
  categories,
  locations,
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div className="relative">
        <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-green-800" />

        <select
          aria-label="Filtrar por status"
          value={filters.status}
          onChange={(event) =>
            onChange("status", event.target.value)
          }
          className={`${controlClass} pl-9`}
        >
          <option value="">Todos os status</option>
          <option value="aguardando">Aguardando</option>
          <option value="devolvido">Devolvido</option>
        </select>
      </div>

      <div className="relative">
        <Tag className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-green-800" />

        <select
          aria-label="Filtrar por categoria"
          value={filters.categoria}
          onChange={(event) =>
            onChange("categoria", event.target.value)
          }
          className={`${controlClass} pl-9`}
        >
          <option value="">Todas as categorias</option>

          {categories.map((category) => {
            const value =
              typeof category === "string"
                ? category
                : String(category.id ?? category.nome);

            const label =
              typeof category === "string"
                ? category
                : category.nome ?? category.nome_categoria;

            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>
      </div>

      <div className="relative">
        <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-green-800" />

        <select
          aria-label="Filtrar por local"
          value={filters.local}
          onChange={(event) =>
            onChange("local", event.target.value)
          }
          className={`${controlClass} pl-9`}
        >
          <option value="">Todos os locais</option>

          {locations.map((location) => {
            const value =
              typeof location === "string"
                ? location
                : String(location.id ?? location.nome);

            const label =
              typeof location === "string"
                ? location
                : location.nome ?? location.nome_local;

            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
