const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import {
  GuitarObject,
  BassObject,
  AcousticObject,
  AmpFxObject,
} from "../util/util";

export const createGuitar = async (guitar: GuitarObject) => {
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

export const getAllElectricGuitars = async () => {
  try {
    const result = await prisma.electricGuitar.findMany();
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

export const  getElectricGuitarById = async (id: string) => {
  try {
    const result = await prisma.electricGuitar.findUnique({
      where: { id },
    });
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

export const createBass = async(bass: BassObject) => {
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

export const getAllBass = async () => {
  try {
    const result = await prisma.bass.findMany();
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

export const getBassById = async (id: string) => {
  try {
    const result = await prisma.bass.findUnique({
      where: { id },
    });
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

export const  createAcoustic = async (acoustic: AcousticObject) => {
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

export const getAllAcoustic= async () => {
  try {
    const result = await prisma.Acoustic.findMany();
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

export const getAcousticById = async (id: string) => {
  try {
    const result = await prisma.Acoustic.findUnique({
      where: { id },
    });
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

export const createAmpFx = async (ampFx: AmpFxObject) => {
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
export const getAllAmpFx = async () => {
  try {
    const result = await prisma.AmpFx.findMany();
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

export const getAmpFxById = async (id: string) => {
  try {
    const result = await prisma.AmpFx.findUnique({
      where: { id },
    });
    return result;
  } finally {
    await prisma.$disconnect();
  }
}

