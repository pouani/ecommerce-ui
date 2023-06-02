import Axios from "../api";

interface Products {
    id: number;
    nomproduit: string;
    description: string;
    codeProduit?: string | null;
    prixproduit: number;
    photo?: string | null;
    categorie: {};
} 

class Product
{

    path: string;

    constructor(){
        this.path = "/products"
    }

    async fetchAllProduits(): Promise<Products> {
        return await Axios.get(`${this.path}/all`);
    }

    async fetchOneProduit(id: number): Promise<Products> {
        return await Axios.get(`${this.path}/${id}`);
    }

    async deleteProduit(id: number): Promise<Products> {
        return await Axios.delete(`${this.path}/delete/${id}`);
    }

    async createProduit(data: Products | any): Promise<Products> {
        return await Axios.post(`${this.path}/create`, data);
    }

}

export default new Product;