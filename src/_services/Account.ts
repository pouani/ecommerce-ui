import Axios from "@/api"
class Account {
    //fonction de connection
     login = (credentials : {} | string) => {
        return Axios.post('auth/authenticate', credentials)
    }
    
    //fonction de deconnection, ici on supprime tout simplement le token du localstorage
    logout = () => {
        localStorage.removeItem('token')
        localStorage.clear()
    }

    // récupération de l'utilisateur connecté
    setUser = () => {
        return Axios.get('')
    }

    //stockage du token
    saveToken = (token: string) => {
        localStorage.setItem('ms-token', token)
    }

    //on recupere le token
    getToken = () => {
        return localStorage.getItem('ms-token')
    }

    //methode qui determine si on est connectee ou pas
    isLogged = () => {
        const token = localStorage.getItem('ms-token')
        return !!token
    }
}


export default new Account();