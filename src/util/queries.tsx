const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import {
  GuitarObject,
  BassObject,
  AcousticObject,
  AmpFxObject,
} from "../util/util";

async function createGuitar(guitar: GuitarObject) {
  try {
    const result = await prisma.electricGuitar.create({
      data: {
        ...guitar,
      },
    });
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

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

async function createBass(bass: BassObject) {
  try {
    const result = await prisma.bass.create({
      data: {
        ...bass,
      },
    });
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

async function getAllBass() {
  try {
    const result = await prisma.bass.findMany();
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

async function getBassById(id: string) {
  try {
    const result = await prisma.bass.findUnique({
      where: { id },
    });
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

async function createAcoustic(acoustic: AcousticObject) {
  try {
    const result = await prisma.acousticguitar.create({
      data: {
        ...acoustic,
      },
    });
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

async function getAllAcoustic() {
  try {
    const result = await prisma.Acoustic.findMany();
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

async function getAcousticById(id: string) {
  try {
    const result = await prisma.Acoustic.findUnique({
      where: { id },
    });
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

async function createAmpFx(ampFx: AmpFxObject) {
  try {
    const result = await prisma.ampfx.create({
      data: {
        ...ampFx,
      },
    });
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

async function getAllAmpFx() {
  try {
    const result = await prisma.AmpFx.findMany();
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

async function getAmpFxById(id: string) {
  try {
    const result = await prisma.AmpFx.findUnique({
      where: { id },
    });
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  getAllElectricGuitars,
  getElectricGuitarById,
  createGuitar,
  createBass,
  createAcoustic,
  createAmpFx,
  getAllBass,
  getBassById,
  getAllAcoustic,
  getAcousticById,
  getAllAmpFx,
  getAmpFxById,
};
