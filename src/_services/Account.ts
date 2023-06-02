import Axios from "../api"
class Account {
    //fonction de connection
     login = (credentials : {} | string) => {
        return Axios.post('auth/authenticate', credentials)
    }
    
    //fonction de deconnection, ici on supprime tout simplement le token du localstorage
    logout = () => {
        localStorage.removeItem('acess-token')
        localStorage.clear()
    }

    // récupération de l'utilisateur connecté
    setUser = () => {
        return Axios.get('auth/current')
    }

    //stockage du token
    saveToken = (token: string) => {
        localStorage.setItem('acess-token', token)
    }

    //on recupere le token
    getToken = () => {
        return localStorage.getItem('acess-token')
    }

    //methode qui determine si on est connectee ou pas
    isLogged = () => {
        const token = localStorage.getItem('acess-token')
        return !!token
    }
}


export default new Account();