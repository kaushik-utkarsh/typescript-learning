import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    const res = await prisma.users.updateMany({
      where:{
        name:"harsh kaushik"
      },
      data:{
        name: "sharma",
      }
      
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
