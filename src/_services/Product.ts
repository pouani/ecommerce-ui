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
    pathPhoto: string;

    constructor(){
        this.path = "/products"
        this.pathPhoto = "/photos"
    }

    async fetchAllProduits(): Promise<Products> {
        return await Axios.get(`${this.path}/all`);
    }

    async fetchAllProductsCategorie(id: number): Promise<Products>{
        return await Axios.get(`${this.path}/${id}/all`);
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

    async createPhotoImage(data: {} | any): Promise<any>{
        return await Axios.post(`${this.pathPhoto}/upload/${id}`, name);
    }

}

export default new Product;