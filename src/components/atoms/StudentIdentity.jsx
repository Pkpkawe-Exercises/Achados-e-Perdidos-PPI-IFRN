import { useEffect, useState } from "react";
import { studentQueryRepository } from "../../repositories/studentQueryRepository";
import Loading from "./Loading";

export default function StudentIdentity() {
    const [student, setStudent] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        async function loadData() {
            try {
                const studentData = await studentQueryRepository.getMe();

                if (active) {
                    setStudent(studentData);
                }
            } catch {
                if (active) {
                    setError(true);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadData();

        return () => {
            active = false;
        };
    }, []);

    if (loading) {
        return <Loading compact />;
    }

    if (error || !student) {
        return (
            <div
                role="status"
                className="hidden items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 sm:flex"
            >
                <span className="size-2 rounded-full bg-gray-400" />
                <span className="text-xs font-medium text-gray-500">
                    Identificação indisponível
                </span>
            </div>
        );
    }

    const studentName =
        typeof student === "string"
            ? student
            : student.nome ?? student.name ?? "Aluno";

    const initial = studentName.trim().charAt(0).toUpperCase() || "A";

    return (
        <div className="flex shrink-0 items-center gap-2.5 rounded-full border border-green-100 bg-green-50/70 py-1.5 pl-3 pr-1.5 sm:gap-3 sm:pl-4">
            <div className="hidden text-right sm:block">
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                    Bem-vindo(a)
                </p>

                <p className="truncate text-sm font-semibold text-green-950">
                    {studentName}
                </p>
            </div>

            <div className="flex size-9 items-center justify-center rounded-full bg-green-800 text-sm font-bold text-white ring-2 ring-white">
                {initial}
            </div>
        </div>
    );
}
