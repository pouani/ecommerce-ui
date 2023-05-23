/**
 * middleware 
 */

import router from "@/_routes"

export function authGuard(to: any){
    let token = localStorage.getItem('token');

    if(token){
        return true;
    }

    router.push({name: 'login'});
}