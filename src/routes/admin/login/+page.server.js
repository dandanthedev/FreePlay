import prisma from '$lib/prisma';
import bcrypt from 'bcrypt';


export const actions = {
    login: async ({ request }) => {
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

        return {
           redirect: "/admin"
        }

    }
}