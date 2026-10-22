import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import Layout from "./Layout";
import ItemForm from "../components/organisms/ItemForm";
import { itemsMutationRepository } from "../repositories/itemsMutationRepository";

export default function NewItem() {
    const navigate = useNavigate();

    async function handleCreate(item) {
        const createdItem = await itemsMutationRepository.create(item);
        navigate(`/Achados-e-Perdidos-PPI-IFRN/itens/${createdItem.id}`);
    }

    return (
        <Layout>
            <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
                <div className="mb-8">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-green-100">
                        <Plus className="size-6 text-green-800" />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        Cadastrar item
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Preencha os dados do objeto encontrado para registrá-lo no sistema.
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
                    <ItemForm
                        submitLabel="Cadastrar item"
                        onSubmit={handleCreate}
                    />
                </div>
            </div>
        </Layout>
    );
}
