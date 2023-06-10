import Axios from "../api"



interface User {
    id: number,
    email: string,
    nomutilisateur: string,
    prenomutilisateur: string,
    photo?: string,
  }

class User{

    path: string;

    constructor(){
        this.path = "/utilisateurs"
    }

    async createUtilisateur(data: User | any): Promise<User> {
        return await Axios.post(`${this.path}/create`, data);
    }

}

export default new User;