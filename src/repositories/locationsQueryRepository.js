import api from "../lib/api";

class LocationsQueryRepository {
  async get() {
    const { data } = await api.get("/locais");

    return data;
  }
}

export const locationsQueryRepository =
  new LocationsQueryRepository();