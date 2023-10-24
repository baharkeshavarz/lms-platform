const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
   try {
        await database.category.createMany({
            data:  [
                { name: "Computer Science" },
                { name: "Music" },
                { name: "Fitness" },
                { name: "Photography"},
                { name: "Accounting"},
                { name: "Engineering"},
                { name: "Filming"},
                { name: "Photography"},
            ]
        });

        console.log("Successfully created data in DB")
   } catch (error) {
        console.log("Error seeding the DB")
   } finally {
        await database.$disconnect();
   }
}

main();