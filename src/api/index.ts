/**
 * Importation des modules nécessaire
 */
import { ENV } from "./env";
import axios, { AxiosResponse } from "axios";
import Account from "../_services/Account";
import router from "../_routes";

const Axios = axios.create({
    baseURL : ENV.baseLocal,
    headers: {
        "Content-type": "application/json",
    },
});

/**
 * interceptor pour injection token
 */

Axios.interceptors.request.use((request: any) => {
    if(Account.isLogged()){
        request.headers.Authorization = 'Bearer '+Account.getToken();
    }

    return request;
})

Axios.interceptors.response.use((response : AxiosResponse<any, any>) => {
    return response
}, error => {
    console.log("error",error)

    if(!error.response){
        // Erreur réseau
        return Promise.reject(error)
    }else{
        if(error.response.status == 401){
            Account.logout()
            router.push('/')
        }else{
            // Erreur de l'API
            //methods
            return Promise.reject(error)
        }
    }
})