import { PrismaClient } from "@prisma/client";
import { UserSignupData } from "../interfaces/user.interface";

const prisma = new PrismaClient()


const user__create_user = async (user_signup_data: UserSignupData) => {
    const {...user_data} = user_signup_data;
    await prisma.user.create({
        data: {
            ...user_data,
        },
    });
};

const user__get_user_credentials = async (username: string) => {
    const credentials = await prisma.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            password: true
        },
    });
    return credentials;
}


const db = {
    user__create_user,
    user__get_user_credentials
}

export default db;