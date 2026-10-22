import { Search, X } from "lucide-react";

export default function ItemSearch({ value, onChange }) {
    return (
        <div className="relative">
            <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400"
            />

            <input
                type="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Buscar por nome ou descrição..."
                aria-label="Buscar itens por nome ou descrição"
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-700/10 cursor-pointer"
            />

            {value && (
                <button
                    type="button"
                    onClick={() => onChange("")}
                    aria-label="Limpar busca"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                >
                    <X className="size-4" />
                </button>
            )}
        </div>
    );
}
