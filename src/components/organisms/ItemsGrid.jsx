import { Link } from "react-router-dom";
import { AlertCircle, PackageSearch, Plus, RefreshCw } from "lucide-react";
import ItemCard from "../molecules/ItemCard";
import Loading from "../atoms/Loading";

export default function ItemsGrid({ items, loading, error, onRetry }) {
  if (loading) {
    return (
      <div className="flex min-h-56 items-center justify-center rounded-2xl border border-gray-200 bg-white">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="flex flex-col items-center rounded-2xl border border-red-100 bg-white px-6 py-12 text-center"
      >
        <AlertCircle className="size-10 text-red-600" />

        <h2 className="mt-4 font-bold text-gray-900">
          Não foi possível carregar os itens
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Verifique sua conexão e tente novamente.
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-900"
        >
          <RefreshCw className="size-4" />
          Tentar novamente
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-green-50">
          <PackageSearch className="size-8 text-green-800" />
        </div>

        <h2 className="mt-4 font-bold text-gray-900">
          Nenhum item encontrado
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
          Não encontramos itens com os filtros selecionados.
          Tente alterar sua busca.
        </p>

        <Link
          to="/itens/new"
          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-green-200 px-4 py-2.5 text-sm font-semibold text-green-800 transition hover:bg-green-50"
        >
          <Plus className="size-4" />
          Cadastrar item
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <ItemCard key={item.id ?? item.item_id} item={item} />
      ))}
    </div>
  );
}
