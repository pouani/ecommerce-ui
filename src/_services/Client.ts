import Axios from "../api";

interface Clients {
    id: number,
    email: string,
    nomclient: string,
    prenomclient: string,
    telephoneclient?: string,
    adresseClient?: string,
}

class Client
{
    path: string;

    constructor(){
        this.path = "/clients"
    }

    async getAllClients(): Promise<Clients> {
        return await Axios.get(`${this.path}/all`);
    }

    async getOneClient(id: number): Promise<Client> {
        return await Axios.get(`${this.path}/${id}`);
    }

    async deleteClient(id: number): Promise<Client> {
        return await Axios.delete(`${this.path}/delete/${id}`);
    }
    
}

export default new Client;