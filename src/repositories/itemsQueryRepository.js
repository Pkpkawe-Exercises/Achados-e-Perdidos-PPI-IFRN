import api from "../lib/api";

class ItemsQueryRepository {
  async get(params = {}) {
    const { data } = await api.get("/itens", { params });

    return data;
  }

  async getById(id) {
    const { data } = await api.get(`/itens/${id}`);

    return data;
  }
}

export const itemsQueryRepository = new ItemsQueryRepository();