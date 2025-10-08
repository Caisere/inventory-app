import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const demoUserId = "c3ec4818-6cbd-4b6b-9a26-fed855a22aab"

    // create sample products
    await prisma.product.createMany({
        data: Array.from({length: 25}).map((_, i) => ({
            userId: demoUserId,
            name: `Product-${i + 1}`,
            price: (Math.random() + 90 + 10).toFixed(2),
            quantity: Math.floor(Math.random() * 20),
            lowStockAt: 5,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (1 + 5))
        }))
    })

    console.log('Seed data created successfully')
    console.log(`created 25 products for user ID: ${demoUserId} `)
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect();
    })