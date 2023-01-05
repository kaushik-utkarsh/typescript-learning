import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    const data = [
        {
          name: "Harsh Kaushik",
          email: "kaushik23@gmail.com",
          phone_number: 9090909090,
          pwd: "password",
        },
        {
          name: "manoj khanna",
          email: "manoj@gmail.com",
          phone_number: 8787654567,
          pwd: "hello",
        },
        {
          name: "shali khan",
          email: "khan@gmail.com",
          phone_number: 8781234567,
          pwd: "bye",
        },
        {
          name: "mujtaba haidar",
          email: "muj@gmail.com",
          phone_number: 8776542967,
          pwd: "whatsup",
        },
      ]
    const res = await prisma.users.createMany({
      data,
      skipDuplicates: true,
    });
    const single_data = {
        name: "Amita Sharma",
        email: "amita3@gmail.com",
        phone_number: 9078709090,
        pwd: "12345",
      }
    const single = await prisma.users.create({
        data:single_data
    })
    console.log(res)
    console.log(single)
  } catch (err) {
    console.log(err)
  } finally {
    async()=>{
        await prisma.$disconnect();
    }
  }
}

main();
