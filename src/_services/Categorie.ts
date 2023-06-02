
import Axios from "../api";

interface Categories {
    id: number;
    nomCategorie: string;
    description: string;
    codeCategorie?: string | null;
}  

class Categorie 
{
    path: String;

    constructor(){
        this.path = '/categories';
    }

    // methode pour recuperer les categories
    async fetchAllCategories(): Promise<Categories> {
        return await Axios.get(`${this.path}/all`);
    }

    // methode pour recuperer une categorie
    async fetchOneCategorie(id: number): Promise<Categories> {
        return await Axios.get(`${this.path}/${id}`);
    }

    // methode pour supprimer une categorie
    async deleteCategorie(id: number): Promise<void> {
        await Axios.delete(`${this.path}/delete/${id}`);
    }

    // methode pour creer une categorie
    async createCategorie(data: Categories | any): Promise<Categories>{
        return await Axios.post(`${this.path}/create`, data);
    }
    
}

export default new Categorie;