// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log(`Setup DB`)

    const user = await prisma.user.create({
      data: {
        username: "admin",
        name: "John Doe",
        password: await bcrypt.hash("admin", 10),
      }
    })
    console.log(`Created user with id: ${user.id}`)
  
  console.log(`DB Setup Complete`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })