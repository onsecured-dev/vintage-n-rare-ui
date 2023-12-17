
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllElectricGuitars() {
  try {
    const result = await prisma.electricGuitar.findMany();
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

async function getElectricGuitarById(id: string) {
  try {
    const result = await prisma.electricGuitar.findUnique({
      where: { id },
    });
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

// Add more query functions as needed

module.exports = {
  getAllElectricGuitars,
  getElectricGuitarById,
  // Export other functions
};
