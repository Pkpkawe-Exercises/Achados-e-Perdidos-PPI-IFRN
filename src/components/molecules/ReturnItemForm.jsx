import { useState } from "react";
import { CheckCircle2, RotateCcw } from "lucide-react";

export default function ReturnItemForm({ onReturn, loading }) {
    const [recipient, setRecipient] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const name = recipient.trim();

        if (!name) return;

        const success = await onReturn(name);

        if (success) {
            setRecipient("");
        }
    }

    return (
        <section className="border-t border-gray-100 bg-gray-50/70 p-5 sm:p-6">
            <div className="mb-4 flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-100">
                    <RotateCcw className="size-5 text-green-800" />
                </div>

                <div>
                    <h2 className="font-bold text-gray-900">
                        Marcar como devolvido
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Informe quem recebeu o item para registrar a devolução.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <div className="min-w-0 flex-1">
                    <label
                        htmlFor="recipient"
                        className="sr-only"
                    >
                        Nome de quem recebeu
                    </label>

                    <input
                        id="recipient"
                        type="text"
                        maxLength={150}
                        required
                        value={recipient}
                        onChange={(event) => setRecipient(event.target.value)}
                        placeholder="Nome completo de quem recebeu"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-700 focus:ring-4 focus:ring-green-700/10"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || !recipient.trim()}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-green-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                    <CheckCircle2 className="size-4" />
                    {loading ? "Registrando..." : "Confirmar devolução"}
                </button>
            </form>
        </section>
    );
}
