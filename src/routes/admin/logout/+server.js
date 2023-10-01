import { redirect } from '@sveltejs/kit';
export function GET({cookies}){
    cookies.set('auth', null, {
        path: '/',
        maxAge: 0,
        httpOnly: true
    });
    throw redirect(302, '/admin/login');
}  