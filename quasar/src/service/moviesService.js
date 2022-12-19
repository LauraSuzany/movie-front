import baseService from "./baseService";

export default class moviesService extends baseService {
  constructor() {
    super("/Movie");
  }
}
