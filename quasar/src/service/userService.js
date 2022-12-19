import baseService from "./baseService";

export default class userService extends baseService {
  constructor() {
    super("/users");
  }
}
