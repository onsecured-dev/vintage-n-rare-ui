import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import {
  GuitarObject,
  BassObject,
  AcousticObject,
  AmpFxObject,
} from "../util/util";

export const createGuitar = async (guitar: GuitarObject) => {
  try {
    // findOrCreate brand
    let brand = await prisma.brands.findUnique({
      where: {
        brand: guitar.brand,
      },
    });

    if (!brand) {
      brand = await prisma.brands.create({
        data: {
          brand: guitar.brand,
        },
      });
    }
    const year = parseInt(guitar.year.toString());
    const result = await prisma.electricguitar.create({
      data: {
        fullName: `${guitar.year} ${guitar.brand} ${guitar.model} `,
        ...guitar,
        year: year,
        brand: brand.id.toString(),
        updatedAt: new Date(),
      },
    });

    // validate year

    // guitar type

    // save in searchtable
    const res = await prisma.searchtable.create({
      data: {
        name: `${guitar.year} ${guitar.brand} ${guitar.model} `,
        yearsYear: year,
        brandsId: brand.id,
        typeId: 1,
        nftid: guitar.NFTId,
      },
    });

    return result;
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllElectricGuitars = async () => {
  try {
    const result = await prisma.electricGuitar.findMany();
    return result;
  } finally {
    await prisma.$disconnect();
  }
};

export const getElectricGuitarById = async (id: string) => {
  try {
    const result = await prisma.electricGuitar.findUnique({
      where: { id },
    });
    return result;
  } finally {
    await prisma.$disconnect();
  }
};

export const getPagEGuitar = async (
  pageNumber: number = 1,
  resultsPerPage: number = 20
) => {
  try {
    const result = await prisma.electricGuitar.findMany({
      skip: (pageNumber - 1) * resultsPerPage,
      take: resultsPerPage,
    });
    return result;
  } finally {
    await prisma.$disconnect();
  }
};

export const createBass = async (bass: BassObject) => {
  try {
    // findOrCreate brand
    let brand = await prisma.brands.findUnique({
      where: {
        brand: bass.brand,
      },
    });

    if (!brand) {
      brand = await prisma.brands.create({
        data: {
          brand: bass.brand,
        },
      });
    }

    const result = await prisma.bass.create({
      data: {
        fullName: `${bass.year} ${bass.brand} ${bass.model} `,
        ...bass,
        brand: brand.id,
      },
    });

    // validate year

    // bass type

    // save in searchtable
    const res = await prisma.searchTable.create({
      data: {
        name: `${bass.year} ${bass.brand} ${bass.model} `,
        yearsYear: bass.year,
        brandsId: brand.id,
        typeId: 3,
        nftid: bass.NFTId,
      },
    });

    return result;
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllBass = async () => {
  try {
    const result = await prisma.bass.findMany();
    return result;
  } finally {
    await prisma.$disconnect();
  }
};

export const getBassById = async (id: string) => {
  try {
    const result = await prisma.bass.findUnique({
      where: { id },
    });
    return result;
  } finally {
    await prisma.$disconnect();
  }
};

export const createAcoustic = async (acoustic: AcousticObject) => {
  try {
    // findOrCreate brand
    let brand = await prisma.brands.findUnique({
      where: {
        brand: acoustic.brand,
      },
    });

    if (!brand) {
      brand = await prisma.brands.create({
        data: {
          brand: acoustic.brand,
        },
      });
    }

    const result = await prisma.acousticguitar.create({
      data: {
        fullName: `${acoustic.year} ${acoustic.brand} ${acoustic.model} `,
        ...acoustic,
        brand: brand.id,
      },
    });

    // validate year

    // acoustic type

    // save in searchtable
    const res = await prisma.searchTable.create({
      data: {
        name: `${acoustic.year} ${acoustic.brand} ${acoustic.model} `,
        yearsYear: acoustic.year,
        brandsId: brand.id,
        typeId: 3,
        nftid: acoustic.NFTId,
      },
    });

    return result;
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllAcoustic = async () => {
  try {
    const result = await prisma.Acoustic.findMany();
    return result;
  } finally {
    await prisma.$disconnect();
  }
};

export const getAcousticById = async (id: string) => {
  try {
    const result = await prisma.Acoustic.findUnique({
      where: { id },
    });
    return result;
  } finally {
    await prisma.$disconnect();
  }
};

export const createAmpFx = async (ampFx: AmpFxObject) => {
  try {
    // findOrCreate brand
    let brand = await prisma.brands.findUnique({
      where: {
        brand: ampFx.brand,
      },
    });

    if (!brand) {
      brand = await prisma.brands.create({
        data: {
          brand: ampFx.brand,
        },
      });
    }

    const result = await prisma.ampFx.create({
      data: {
        fullName: `${ampFx.year} ${ampFx.brand} ${ampFx.model} `,
        ...ampFx,
        brand: brand.id,
      },
    });

    // validate year

    // ampFx type

    // save in searchtable
    const res = await prisma.searchTable.create({
      data: {
        name: `${ampFx.year} ${ampFx.brand} ${ampFx.model} `,
        yearsYear: ampFx.year,
        brandsId: brand.id,
        typeId: 3,
        nftid: ampFx.NFTId,
      },
    });

    return result;
  } finally {
    await prisma.$disconnect();
  }
};
export const getAllAmpFx = async () => {
  try {
    const result = await prisma.AmpFx.findMany();
    return result;
  } finally {
    await prisma.$disconnect();
  }
};

export const getAmpFxById = async (id: string) => {
  try {
    const result = await prisma.AmpFx.findUnique({
      where: { id },
    });
    return result;
  } finally {
    await prisma.$disconnect();
  }
};

export const getWords = async (words: string[]) => {
  try {
    const result = await prisma.Wordbank.findUnique({
      where: {
        words: words[0],
        // word: {
        //   OR: [
        //     { condition1: value1 },

        //   ],
        // }
      },
    });
    return result;
  } catch (error) {
    console.log("Error :", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const searchDb = async (query: string | string[] | null) => {
  // check if query is string or array
  // if (typeof query === 'string') {
  //   return await searchQuery(query)
  // }

  if (!query) {
    const res = await prisma.searchtable.findMany({});
    return res;
  }

  const res = await prisma.searchtable.findMany({
    where: {
      name: {
        search: query,
      },
    },
  });
  return res;
};

export const searchQuery = async (query: string) => {
  // perform a findMany on each model and specify the common fields to return
  // use textSearch in column FullName
  let guitars = await prisma.electricGuitar.findMany({
    select: {
      brand: true,
      model: true,
      year: true,
      NFTId: true,
    },
    where: {
      fullName: {
        search: query,
      },
    },
  });

  console.log("Guitars: ", guitars);

  let bass = await prisma.bass.findMany({
    select: {
      brand: true,
      model: true,
      year: true,
      NFTId: true,
    },
    where: {
      fullName: {
        search: query,
      },
    },
  });

  console.log("bass: ", bass);

  let acoustic = await prisma.acousticguitar.findMany({
    select: {
      brand: true,
      model: true,
      year: true,
      NFTId: true,
    },
    where: {
      fullName: {
        search: query,
      },
    },
  });

  console.log("acoustic: ", acoustic);

  let ampFx = await prisma.ampfx.findMany({
    select: {
      brand: true,
      model: true,
      year: true,
      NFTId: true,
    },
    where: {
      fullName: {
        search: query,
      },
    },
  });
  console.log("ampFx: ", ampFx);
  console.log("Combined: \n", {
    ...guitars,
    ...bass,
    ...acoustic,
    ...ampFx,
  });

  // return combined
  return {
    ...guitars,
    ...bass,
    ...acoustic,
    ...ampFx,
  };
};
