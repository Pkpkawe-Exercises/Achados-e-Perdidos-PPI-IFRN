import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { categoriesQueryRepository } from "../../repositories/categoriesQueryRepository";
import { locationsQueryRepository } from "../../repositories/locationsQueryRepository";

const emptyForm = {
  nome: "",
  descricao: "",
  categoria: "",
  local: "",
  data_encontrado: "",
};

function getOptionLabel(option) {
  if (typeof option === "string") return option;

  return (
    option.nome ??
    option.name ??
    option.categoria ??
    option.local ??
    ""
  );
}

export default function ItemForm({
  initialData = emptyForm,
  onSubmit,
  submitLabel,
}) {
  const [form, setForm] = useState(() => ({
    ...emptyForm,
    ...initialData,
    descricao: initialData.descricao ?? "",
    data_encontrado: initialData.data_encontrado?.slice(0, 10) ?? "",
  }));

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadOptions() {
      try {
        const [categoriesData, locationsData] = await Promise.all([
          categoriesQueryRepository.get(),
          locationsQueryRepository.get(),
        ]);

        if (!cancelled) {
          setCategories(categoriesData);
          setLocations(locationsData);
        }
      } catch {
        if (!cancelled) {
          setError("Não foi possível carregar categorias e locais.");
        }
      } finally {
        if (!cancelled) {
          setLoadingOptions(false);
        }
      }
    }

    loadOptions();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      await onSubmit({
        nome: form.nome.trim(),
        descricao: form.descricao.trim(),
        categoria: form.categoria,
        local: form.local,
        data_encontrado: form.data_encontrado,
      });
    } catch {
      setError("Não foi possível salvar o item. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="nome" className="mb-2 block text-sm font-medium text-gray-700">
          Nome do item *
        </label>
        <input
          id="nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          className={inputClass}
          placeholder="Ex.: Garrafa térmica"
          maxLength={150}
          required
        />
      </div>

      <div>
        <label htmlFor="descricao" className="mb-2 block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <textarea
          id="descricao"
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          className={`${inputClass} min-h-28 resize-y`}
          placeholder="Descreva características que ajudem a identificar o item."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="categoria" className="mb-2 block text-sm font-medium text-gray-700">
            Categoria *
          </label>
          <select
            id="categoria"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            className={inputClass + " " + "cursor-pointer"}
            required
            disabled={loadingOptions}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => {
              const label = getOptionLabel(category);

              return (
                <option key={label} value={label}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label htmlFor="local" className="mb-2 block text-sm font-medium text-gray-700">
            Local encontrado *
          </label>
          <select
            id="local"
            name="local"
            value={form.local}
            onChange={handleChange}
            className={inputClass + " " + "cursor-pointer"}
            required
            disabled={loadingOptions}
          >
            <option value="">Selecione um local</option>
            {locations.map((location) => {
              const label = getOptionLabel(location);

              return (
                <option key={label} value={label}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="data_encontrado" className="mb-2 block text-sm font-medium text-gray-700">
          Data em que foi encontrado *
        </label>
        <input
          id="data_encontrado"
          name="data_encontrado"
          type="date"
          value={form.data_encontrado}
          onChange={handleChange}
          className={inputClass + " " + "cursor-pointer"}
          required
        />
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-between">
        <Link
          to="/Achados-e-Perdidos-PPI-IFRN"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <ArrowLeft className="size-4" />
          Voltar
        </Link>

        <button
          type="submit"
          disabled={saving || loadingOptions}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          <Save className="size-4" />
          {saving ? "Salvando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
