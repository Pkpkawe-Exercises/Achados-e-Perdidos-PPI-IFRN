import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderCircle, Pencil } from "lucide-react";
import Layout from "./Layout";
import ItemForm from "../components/organisms/ItemForm";
import { itemsQueryRepository } from "../repositories/itemsQueryRepository";
import { itemsMutationRepository } from "../repositories/itemsMutationRepository";

export default function EditItem() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadItem() {
            try {
                const data = await itemsQueryRepository.getById(id);

                if (!cancelled) {
                    setItem(data);
                }
            } catch {
                if (!cancelled) {
                    setError("Não foi possível carregar os dados do item.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadItem();

        return () => {
            cancelled = true;
        };
    }, [id]);

    async function handleUpdate(updatedItem) {
        await itemsMutationRepository.update(id, updatedItem);
        navigate(`/Achados-e-Perdidos-PPI-IFRN/itens/${id}`);
    }

    return (
        <Layout>
            <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
                <div className="mb-8">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-green-100">
                        <Pencil className="size-6 text-green-800" />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        Editar item
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Atualize as informações do item cadastrado.
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
                    {loading ? (
                        <div className="flex items-center justify-center gap-2 py-12 text-sm text-gray-500">
                            <LoaderCircle className="size-5 animate-spin" />
                            Carregando item...
                        </div>
                    ) : error ? (
                        <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                            {error}
                        </div>
                    ) : item ? (
                        <ItemForm
                            key={item.id}
                            initialData={item}
                            submitLabel="Salvar alterações"
                            onSubmit={handleUpdate}
                        />
                    ) : null}
                </div>
            </div>
        </Layout>
    );
}
