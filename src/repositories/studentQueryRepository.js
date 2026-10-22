import api from "../lib/api";

class StudentQueryRepository {
  async getMe() {
    const { data } = await api.get("/eu");

    return data;
  }
}

export const studentQueryRepository = new StudentQueryRepository();