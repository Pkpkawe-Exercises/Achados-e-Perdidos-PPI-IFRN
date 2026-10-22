import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-gray-50 px-4 py-12">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-green-100/60 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-red-100/40 blur-3xl"
            />

            <section className="relative w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xl shadow-green-950/5 sm:p-12">
                <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl border border-green-100 bg-green-50">
                    <AlertTriangle className="text-red-600" />
                </div>

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-600">
                    Erro 404
                </p>

                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-green-950 sm:text-4xl">
                    Página não encontrada
                </h1>

                <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-gray-500 sm:text-base">
                    Parece que este item se perdeu pelo caminho.
                    A página que você procura não existe ou foi movida.
                </p>

                <Link
                    to="/"
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-800 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-900/15 transition duration-200 hover:-translate-y-0.5 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-200 sm:w-auto"
                >
                    <ArrowLeft />

                    Voltar para o início
                </Link>

                <div className="mx-auto mt-8 h-px w-full max-w-48 bg-linear-to-r from-transparent via-green-200 to-transparent" />

                <p className="mt-5 text-xs font-medium tracking-wide text-gray-400">
                    Achados e Perdidos · IFRN
                </p>
            </section>
        </main>
    );
}
