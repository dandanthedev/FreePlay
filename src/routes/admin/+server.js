import { redirect } from '@sveltejs/kit';
import { verifyCookie } from '$lib/auth.js';
export function GET({cookies}){
    let auth = cookies.get('auth');
    let payload = verifyCookie(auth);
    if(!payload) throw redirect(302, '/admin/login');
    else throw redirect(302, '/admin/dashboard');
}  