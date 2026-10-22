import {
    CalendarDays,
    MapPin,
    Package,
    Tag,
    UserRound,
} from "lucide-react";

function formatDate(date) {
    if (!date) return "Não informado";

    const parsedDate = new Date(`${date}T00:00:00`);

    return Number.isNaN(parsedDate.getTime())
        ? date
        : parsedDate.toLocaleDateString("pt-BR");
}

function DetailField({ icon: Icon, label, value }) {
    return (
        <div className="flex items-start gap-3 py-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-50">
                <Icon className="size-4 text-green-800" />
            </div>

            <div className="min-w-0">
                <p className="text-xs font-medium text-gray-500">{label}</p>
                <p className="mt-1 wrap-break-words text-sm font-medium text-gray-900">
                    {value || "Não informado"}
                </p>
            </div>
        </div>
    );
}

export default function ItemDetailInfo({ item }) {
    return (
        <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-2 sm:gap-x-8 sm:divide-y-0 p-10">
            <DetailField
                icon={Package}
                label="Descrição"
                value={item.descricao || "Nenhuma descrição informada."}
            />

            <DetailField
                icon={Tag}
                label="Categoria"
                value={item.categoria}
            />

            <DetailField
                icon={MapPin}
                label="Local encontrado"
                value={item.local}
            />

            <DetailField
                icon={CalendarDays}
                label="Encontrado em"
                value={formatDate(item.data_encontrado)}
            />

            <DetailField
                icon={UserRound}
                label="Devolvido para"
                value={item.devolvido_para || "Ainda não devolvido"}
            />

            <DetailField
                icon={CalendarDays}
                label="Data da devolução"
                value={formatDate(item.data_devolucao)}
            />
        </div>
    );
}
