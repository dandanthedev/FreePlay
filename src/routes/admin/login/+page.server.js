import prisma from '$lib/prisma';
import bcrypt from 'bcrypt';
import { genCookie, signJwt, verifyCookie } from '$lib/auth.js';
import { redirect } from '@sveltejs/kit';



export function load({cookies}){
    let auth = cookies.get('auth');
    let payload = verifyCookie(auth);
    if(payload) throw redirect(302, '/admin/dashboard');
}

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const username = formData.get('username');
        const password = formData.get('password');

        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        })
        if(!user) {
            return {
                error: 'User not found'
            }
        }
        const valid = await bcrypt.compare(password, user.password);
        if(!valid) {
            return {
                error: 'Invalid password'
            }
        }

        const token = await signJwt(
            await genCookie({
                user
            })
        )

        cookies.set('auth', token, {
            maxAge: 60 * 60,
            httpOnly: true,
            path: '/'
        })

        return {
           redirect: "/admin"
        }

    }
}