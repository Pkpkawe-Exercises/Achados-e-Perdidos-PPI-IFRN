import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Package,
    Pencil,
    Trash2,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

import Layout from "./Layout";
import Loading from "../components/atoms/Loading";
import ItemStatusBadge from "../components/atoms/ItemStatusBadge";
import ItemDetailInfo from "../components/molecules/ItemDetailInfo";
import ReturnItemForm from "../components/molecules/ReturnItemForm";

import { itemsQueryRepository } from "../repositories/itemsQueryRepository";
import { itemsMutationRepository } from "../repositories/itemsMutationRepository";

export default function DetailItem() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [returning, setReturning] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [success, setSuccess] = useState("");

    const loadItem = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await itemsQueryRepository.getById(id);
            setItem(data);
        } catch {
            setError("Não foi possível carregar os detalhes deste item.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        async function fetchItem() {
            await loadItem();
        }

        fetchItem();
    }, [loadItem]);


    async function handleDelete() {
        const confirmed = window.confirm(
            `Deseja realmente excluir "${item.nome}"? Essa ação não pode ser desfeita.`,
        );

        if (!confirmed) return;

        setDeleting(true);
        setError("");

        try {
            await itemsMutationRepository.delete(id);
            navigate("/");
        } catch {
            setError("Não foi possível excluir o item. Tente novamente.");
            setDeleting(false);
        }
    }

    if (loading) {
        return (
            <Layout>
                <Loading />
            </Layout>
        );
    }

    if (error && !item) {
        return (
            <Layout>
                <div className="mx-auto max-w-xl py-12 text-center">
                    <AlertCircle className="mx-auto size-12 text-red-600" />

                    <h1 className="mt-4 text-xl font-bold text-gray-900">
                        Não foi possível abrir o item
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">{error}</p>

                    <button
                        onClick={loadItem}
                        className="mt-5 rounded-xl bg-green-800 px-5 py-3 text-sm font-semibold text-white hover:bg-green-900 cursor-pointer"
                    >
                        Tentar novamente
                    </button>

                    <div>
                        <Link
                            to="/Achados-e-Perdidos-PPI-IFRN"
                            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-green-800 hover:underline"
                        >
                            <ArrowLeft className="size-4" />
                            Voltar para o início
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!item) return null;

    const returned = item.status?.toLowerCase() === "devolvido";

    return (
        <Layout>
            <section className="mx-auto max-w-4xl space-y-6">
                <Link
                    to="/Achados-e-Perdidos-PPI-IFRN"
                    className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-gray-600 transition hover:text-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
                >
                    <ArrowLeft className="size-4" />
                    Voltar para os itens
                </Link>

                {error && (
                    <div
                        role="alert"
                        className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                    >
                        <AlertCircle className="mt-0.5 size-5 shrink-0" />
                        {error}
                    </div>
                )}

                {success && (
                    <div
                        role="status"
                        className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
                    >
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                        {success}
                    </div>
                )}

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-100 bg-linear-to-r from-green-50 to-white p-5 sm:p-8">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                            <div className="flex items-start gap-4">
                                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-green-100 bg-white shadow-sm">
                                    <Package className="size-7 text-green-800" />
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-green-800">
                                        Detalhes do item
                                    </p>

                                    <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-green-950 sm:text-3xl">
                                        {item.nome}
                                    </h1>

                                    <div className="mt-3">
                                        <ItemStatusBadge status={item.status} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Link
                                    to={`/Achados-e-Perdidos-PPI-IFRN/itens/${id}/edit`}
                                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-green-300 hover:bg-green-50 hover:text-green-800"
                                >
                                    <Pencil className="size-4" />
                                    Editar
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                                >
                                    <Trash2 className="size-4" />
                                    {deleting ? "Excluindo..." : "Excluir"}
                                </button>
                            </div>
                        </div>
                    </div>

                    <ItemDetailInfo item={item} />

                    {!returned && (
                        <ReturnItemForm
                            loading={returning}
                            onReturn={async (name) => {
                                setReturning(true);
                                setError("");
                                setSuccess("");

                                try {
                                    await itemsMutationRepository.returnItem(id, {
                                        devolvido_para: name,
                                    });

                                    await loadItem();
                                    setSuccess("Item devolvido com sucesso.");

                                    return true;
                                } catch {
                                    setError("Não foi possível registrar a devolução.");
                                    return false;
                                } finally {
                                    setReturning(false);
                                }
                            }}
                        />
                    )}

                    {returned && (
                        <div className="border-t border-green-100 bg-green-50/70 p-5 sm:p-8">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="size-6 shrink-0 text-green-700" />

                                <div>
                                    <h2 className="font-bold text-green-950">
                                        Item devolvido
                                    </h2>

                                    <p className="mt-1 text-sm text-green-800">
                                        A devolução deste item já foi registrada.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
}
