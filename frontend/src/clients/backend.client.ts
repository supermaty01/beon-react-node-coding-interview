import axios from "axios";
import { IUserProps } from "../dtos/user.dto";

export class BackendClient {
  private readonly baseUrl: string;

  constructor(baseUrl = "http://localhost:3001/v1") {
    this.baseUrl = baseUrl;
  }

  async getAllUsers({ params }: { params?: { search?: string, page?: number } }): Promise<{ data: IUserProps[], total: number, page: number }> {
    return (await axios.get(`${this.baseUrl}/people`, {
      params,
    })).data;
  }
}
