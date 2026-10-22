import { Link } from "react-router-dom";
import { MapPin, Package } from "lucide-react";
import ItemStatusBadge from "../atoms/ItemStatusBadge";

export default function ItemCard({ item }) {
  const id = item.id ?? item.item_id;
  const title = item.nome ?? item.titulo ?? "Item sem nome";
  const description =
    item.descricao ?? item.description ?? "Sem descrição disponível.";
  const location =
    typeof item.local === "string"
      ? item.local
      : item.local?.nome ?? item.local?.nome_local ?? "Local não informado";

  const image = item.imagem ?? item.imagem_url ?? item.foto ?? null;

  return (
    <Link
      to={`/itens/${id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg hover:shadow-green-950/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
    >
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gray-50">
        {image ? (
          <img
            src={image}
            alt={title}
            className="size-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-linear-to-br from-green-50 to-gray-100">
            <Package
              aria-hidden="true"
              className="size-12 text-green-800/40"
              strokeWidth={1.3}
            />
          </div>
        )}

        <div className="absolute bottom-3 left-3">
          <ItemStatusBadge status={item.status} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h2 className="line-clamp-1 font-bold text-gray-900 transition-colors group-hover:text-green-800">
          {title}
        </h2>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
          {description}
        </p>

        <div className="mt-auto flex items-center gap-2 border-t border-gray-100 pt-3 text-xs text-gray-500">
          <MapPin className="size-4 shrink-0 text-green-800" />

          <span className="truncate">{location}</span>
        </div>
      </div>
    </Link>
  );
}
