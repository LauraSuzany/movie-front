import axios from "axios";

const axiosRequest = axios.create({
  baseURL: `${process.env.URL_BASE}`,
});

// axiosRequest.interceptors.request.use((config) => {
//     const token = localStorage.getItem('TOKEN')
//     if (token) {
//         config.headers.common.Authorization = `Bearer ${token}`;
//     }
//     return config
// }, (error) => {
//     return Promise.reject(error)
// })

// axiosRequest.interceptors.response.use(response => {
//     return response;
// }, error => Promise.reject(error));

export { axiosRequest };
