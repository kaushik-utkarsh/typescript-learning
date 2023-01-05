import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    const res = await prisma.users.deleteMany({
      where:{
        name:"mujtaba"
      }, 
    });
    console.log(res)
    // console.log(single)
  } catch (err) {
    console.log(err)
  } finally {
    async()=>{
        await prisma.$disconnect();
    }
  }
}

main();
