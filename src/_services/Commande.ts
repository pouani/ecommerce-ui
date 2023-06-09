import Axios from "../api"

interface Commandes {
    client: ProduitsEntityOrClient;
    codeCommande: string;
    commandeLivre: boolean;
    datecommande: string;
    nomcommande: string;
    produits?: (ProduitsEntityOrClient)[] | null;
    produitcommande: string;
    statutcommande: string;
}
interface ProduitsEntityOrClient {
    id: number;
}
  

class Commande
{
    path: String;

    constructor(){
        this.path = '/commandes'
    }

    //function to get all commandes
    async getAllCommandes(): Promise<Commandes> {
        return await Axios.get(`${this.path}/all`);
    }

    //function to get all commandes by idclient
    async getCommandesByIdClient(id: number){
        return await Axios.get(`${this.path}/all/client/${id}`);
    }

    //function to get one commande
    async getOneCommande(id: number): Promise<Commandes> {
        return await Axios.get(`${this.path}/${id}`);
    }

    //function to delete one commande
    async deleteCommande(id: number): Promise<Commandes> {
        return await Axios.delete(`${this.path}/delete/${id}`);
    }

    //function to create one commande
    async createCommande(commande: Commandes): Promise<Commandes> {
        return await Axios.post(`${this.path}/create`, commande);
    }
}

export default new Commande();