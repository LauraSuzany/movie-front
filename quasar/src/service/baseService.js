import { axiosRequest } from "../utils/axiosRequest";
import { responseService } from "./utils/responseService";

export default class baseService {
  constructor(path) {
    this.path = path;
    this.axiosRequest = axiosRequest;
    this.responseService = responseService;
  }
  list = async () => {
    try {
      const response = await this.axiosRequest.get(this.path);
      return response.data;
    } catch (error) {
      throw responseService(error, "list");
    }
  };
  show = async (id) => {
    try {
      const response = await this.axiosRequest.get(`${this.path}/${id}`);
      return response.data;
    } catch (error) {
      throw responseService(error, "get", "item");
    }
  };
  create = async (data) => {
    try {
      const response = await this.axiosRequest.post(this.path, data);
      return response.data;
    } catch (error) {
      throw responseService(error, "create");
    }
  };

  update = async (id, data) => {
    try {
      const response = await this.axiosRequest.put(`${this.path}/${id}`, data);
      return response.data;
    } catch (error) {
      throw responseService(error, "update");
    }
  };

  remove = async (id) => {
    try {
      const response = await this.axiosRequest.delete(`${this.path}/${id}`);
      return response.data;
    } catch (error) {
      throw responseService(error, "remove");
    }
  };
}
