import axios from "axios";



export function getAxios() {
    const instance = axios.create({
        baseURL: "http://localhost:5000",
        headers: {
            "Content-type": "application/json",
        }
    });

return instance;
}