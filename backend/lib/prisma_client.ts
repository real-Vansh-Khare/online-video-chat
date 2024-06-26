import { PrismaClient } from '@prisma/client';

// Create a global variable to hold the PrismaClient instance

const prismaclient = () => {
  
  let prisma: PrismaClient;
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
  } else {
    // Ensure the PrismaClient is not recreated during hot-reloading in development
    if (!(global as any).prisma) {
      (global as any).prisma = new PrismaClient();
    }
    prisma = (global as any).prisma;
  }

  return prisma;
}

export default prismaclient;
