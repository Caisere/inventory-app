'use server'

import { getCurrentUser } from "./auth"
import { prisma } from "./prisma"


export async function deleteProduct(formData:FormData) {
    const user = await getCurrentUser()
    const userId = user.id

    const id = String(formData.get('id') || '')
    
    await prisma.product.deleteMany({
        where: {
            userId: userId,
            id: id,
        }
    })
}