import api from "../lib/api";

class ItemsMutationRepository {
  async create(item) {
    const { data } = await api.post("/itens", item);

    return data;
  }

  async update(id, item) {
    const { data } = await api.put(`/itens/${id}`, item);

    return data;
  }

  async delete(id) {
    await api.delete(`/itens/${id}`);
  }

  async returnItem(id, devolucao) {
    const { data } = await api.patch(
      `/itens/${id}/devolver`,
      devolucao,
    );

    return data;
  }
}

export const itemsMutationRepository = new ItemsMutationRepository();