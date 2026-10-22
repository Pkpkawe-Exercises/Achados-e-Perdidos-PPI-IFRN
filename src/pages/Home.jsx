
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PackageSearch, Plus, Search } from "lucide-react";

import Layout from "./Layout";
import ItemCard from "../components/molecules/ItemCard";
import ItemFilters from "../components/molecules/ItemFilters";
import Loading from "../components/atoms/Loading";

import { itemsQueryRepository } from "../repositories/itemsQueryRepository";
import { categoriesQueryRepository } from "../repositories/categoriesQueryRepository";
import { locationsQueryRepository } from "../repositories/locationsQueryRepository";

export default function Home() {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);

    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        status: "",
        categoria: "",
        local: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadOptions() {
            try {
                const [categoriesData, locationsData] = await Promise.all([
                    categoriesQueryRepository.get(),
                    locationsQueryRepository.get(),
                ]);

                setCategories(categoriesData);
                setLocations(locationsData);
            } catch {
                // Os filtros continuam disponíveis mesmo se falhar o carregamento.
            }
        }

        loadOptions();
    }, []);

    useEffect(() => {
        let active = true;

        async function loadItems() {
            setLoading(true);
            setError(false);

            try {
                const params = {
                    ...(search.trim() && { busca: search.trim() }),
                    ...(filters.status && { status: filters.status }),
                    ...(filters.categoria && { categoria: filters.categoria }),
                    ...(filters.local && { local: filters.local }),
                };

                const data = await itemsQueryRepository.get(params);

                if (active) {
                    setItems(data);
                }
            } catch {
                if (active) setError(true);
            } finally {
                if (active) setLoading(false);
            }
        }

        loadItems();

        return () => {
            active = false;
        };
    }, [search, filters]);


    function handleFilterChange(name, value) {
        setFilters((current) => ({
            ...current,
            [name]: value,
        }));
    }


    return (
        <Layout>
            <section className="space-y-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex items-center gap-2">
                            <PackageSearch className="size-6 text-green-800" />

                            <h1 className="text-xl font-extrabold text-green-950 sm:text-2xl">
                                Itens encontrados
                            </h1>
                        </div>

                        <p className="mt-2 text-sm text-gray-500">
                            Consulte os objetos encontrados e acompanhe seu status.
                        </p>
                    </div>

                    <Link
                        to="/Achados-e-Perdidos-PPI-IFRN/itens/new"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-900"
                    >
                        <Plus className="size-4" />
                        Novo item
                    </Link>
                </div>

                <div className="space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Buscar por nome ou descrição..."
                            aria-label="Buscar itens"
                            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                        />
                    </div>

                    <ItemFilters
                        filters={filters}
                        onChange={handleFilterChange}
                        categories={categories}
                        locations={locations}
                    />
                </div>

                {!loading && !error && (
                    <p className="text-sm text-gray-500" aria-live="polite">
                        {items.length}{" "}
                        {items.length === 1 ? "item encontrado" : "itens encontrados"}
                    </p>
                )}

                {loading ? (
                    <Loading />
                ) : error ? (
                    <div role="alert" className="py-10 text-center">
                        <p className="text-sm text-red-700">
                            Não foi possível carregar os itens.
                        </p>

                        <button
                            onClick={() => setFilters((current) => ({ ...current }))}
                            className="mt-3 text-sm font-semibold text-green-800 hover:underline"
                        >
                            Tentar novamente
                        </button>
                    </div>
                ) : items.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center">
                        <PackageSearch className="mx-auto size-10 text-gray-400" />

                        <h2 className="mt-3 font-bold text-gray-900">
                            Nenhum item encontrado
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Tente alterar os filtros ou realizar outra busca.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {items.map((item) => (
                            <ItemCard key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </section>
        </Layout>
    );
}
