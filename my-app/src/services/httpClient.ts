import { AxiosInstance } from "axios";
import { getAxios } from "./axios";


export class ApiClient {
    public axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = getAxios();
    }

    async getTasks(url: string, data: any) {
       return this.axiosInstance.get(url, data);
    }

    async postTasks(url: string, data: {}) {
        return this.axiosInstance.post(url, data).then((res) =>  res.data);      
    }

    async putTasks(url: string, data: any) {
        return this.axiosInstance.put(url, data).then((res) =>  res.data);
    }

    async deleteTasks(url: string, data: any) {
        return this.axiosInstance.delete(url).then((res) =>  res.data);
    }
}