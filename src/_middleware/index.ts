/**
 * middleware 
 */

import router from "../_routes"

export function authGuard(to: any){
    let token = localStorage.getItem('acess-token');

    if(token){
        return true;
    }
    router.push('/login');
}