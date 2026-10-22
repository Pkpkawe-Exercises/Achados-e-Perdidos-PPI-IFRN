import api from "../lib/api";

class CategoriesQueryRepository {
  async get() {
    const { data } = await api.get("/categorias");

    return data;
  }
}

export const categoriesQueryRepository =
  new CategoriesQueryRepository();