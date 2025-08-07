//データベース処理だけ
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findPersonById = async (id: number) => {
    return await prisma.person.findUnique({
        where: { id },
        include: { hobbies: { include: { hobby: true } } },
    });
};