import { PrismaClient, type Prisma } from "@prisma/client";
const prisma = new PrismaClient();
import {
  GuitarObject,
  BassObject,
  AcousticObject,
  AmpFxObject,
  querySelectFields,
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
    await prisma.electricguitar.create({
      data: {
        fullName: `${guitar.year} ${guitar.brand} ${guitar.model} `,
        ...guitar,
        year: year,
        brand: brand.id,
        updatedAt: new Date(),
      },
    });

    // validate year

    // guitar type

    // save in searchtable
    await prisma.searchtable.create({
      data: {
        name: `${guitar.year} ${guitar.brand} ${guitar.model} `,
        yearsYear: year,
        brandsId: brand.id,
        typeId: 1,
        nftid: guitar.NFTId,
      },
    });

    return {
      success: true,
    };
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllElectricGuitars = async () => {
  try {
    const result = await prisma.electricguitar.findMany();
    return result;
  } finally {
    await prisma.$disconnect();
  }
};

export const getElectricGuitarById = async (id: string) => {
  try {
    const result = await prisma.electricguitar.findUnique({
      where: { NFTId: parseInt(id) },
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
    const result = await prisma.electricguitar.findMany({
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
    const year = parseInt(bass.year.toString());

    const result = await prisma.bass.create({
      data: {
        fullName: `${bass.year} ${bass.brand} ${bass.model} `,
        ...bass,
        year: year,
        brand: brand.id,
      },
    });

    // validate year

    // bass type

    // save in searchtable
    const res = await prisma.searchtable.create({
      data: {
        name: `${bass.year} ${bass.brand} ${bass.model} `,
        yearsYear: year,
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

export const getAllSearchTable = async () => {
  try {
    const result = await prisma.searchtable.findMany({});
    return result;
  } finally {
    await prisma.$disconnect();
  }
};

export const getBassById = async (id: string) => {
  try {
    const result = await prisma.bass.findUnique({
      where: { NFTId: parseInt(id) },
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
    const year = parseInt(acoustic.year.toString());

    const result = await prisma.acousticguitar.create({
      data: {
        fullName: `${acoustic.year} ${acoustic.brand} ${acoustic.model} `,
        ...acoustic,
        brand: brand.id,
        year,
      },
    });

    // validate year

    // acoustic type

    // save in searchtable
    const res = await prisma.searchtable.create({
      data: {
        name: `${acoustic.year} ${acoustic.brand} ${acoustic.model} `,
        yearsYear: year,
        brandsId: brand.id,
        typeId: 2,
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
    const result = await prisma.acousticguitar.findMany();
    return result;
  } finally {
    await prisma.$disconnect();
  }
};

export const getAcousticById = async (id: string) => {
  try {
    const result = await prisma.acousticguitar.findUnique({
      where: { NFTId: parseInt(id) },
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

    const year = parseInt(ampFx.year.toString());

    const result = await prisma.ampfx.create({
      data: {
        fullName: `${ampFx.year} ${ampFx.brand} ${ampFx.model} `,
        ...ampFx,
        year: year,
        brand: brand.id,
      },
    });

    // validate year

    // ampFx type

    // save in searchtable
    const res = await prisma.searchtable.create({
      data: {
        name: `${ampFx.year} ${ampFx.brand} ${ampFx.model} `,
        yearsYear: year,
        brandsId: brand.id,
        typeId: 4,
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
    const result = await prisma.ampfx.findMany();
    return result;
  } finally {
    await prisma.$disconnect();
  }
};

export const getAmpFxById = async (id: string) => {
  try {
    const result = await prisma.ampfx.findUnique({
      where: { NFTId: parseInt(id) },
    });
    return result;
  } finally {
    await prisma.$disconnect();
  }
};

// export const getWords = async (words: string[]) => {
//   try {
//     const result = await prisma.wordbank.findUnique({
//       where: {
//         words: words[0],
//         // word: {
//         //   OR: [
//         //     { condition1: value1 },

//         //   ],
//         // }
//       },
//     });
//     return result;
//   } catch (error) {
//     console.log("Error :", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// };

export const altSearch = async (
  query?: string,
  years?: number[],
  brands?: string[],
  instruments?: string[]
) => {
  console.log("alt", query, years, brands, instruments);
  const andQuery: Prisma.searchtableWhereInput[] = [];
  if ((query?.length || 0) > 0) {
    andQuery.push({
      name: {
        contains: query,
      },
    });
  }
  if (years && years.length > 0) {
    andQuery.push({
      yearsYear: {
        in: years,
      },
    });
  }
  if (brands && brands.length > 0) {
    andQuery.push({
      brands: {
        brand: {
          in: brands,
        },
      },
    });
  }
  if (instruments && instruments.length > 0) {
    andQuery.push({
      type: {
        name: {
          in: instruments,
        },
      },
    });
  }
  const res = await prisma.searchtable
    .findMany({
      select: {
        name: true,
        yearsYear: true,
        typeId: true,
        nftid: true,
        brands: {
          select: {
            brand: true,
          },
        },
        type: {
          select: {
            name: true,
          },
        },
      },
      where: {
        AND: andQuery,
      },
    })
    .catch((err) => {
      console.log("well this failed");
    });
  return res;
};

export const searchDb = async (
  query: string[],
  limit: number,
  cursor: number
) => {
  console.log("searchDb start\nquery: ", query);

  // if no query, return all searchtable entries

  if (!query || (query.length <= 1 && query[0] == ""))
    return await prisma.searchtable.findMany({
      take: 15,
      select: querySelectFields,
    });

  const searchQuery = query.map((word: string) => ({
    name: {
      search: word,
    },
  }));

  // multiple queries using or

  const res = await prisma.searchtable.findMany({
    where: {
      OR: searchQuery,
    },
    take: 15,
    select: querySelectFields,
  });

  // check / filter for duplicates
  // const uniqueRes = res.filter((item, index) => {
  //   return res.findIndex((t) => t.NFTCID === item.NFTCID) === index;
  // }

  return res;
};

export const searchQuery = async (query: string) => {
  // perform a findMany on each model and specify the common fields to return
  // use textSearch in column FullName
  let guitars = await prisma.electricguitar.findMany({
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

export const allBrands = async () => {
  return await prisma.brands.findMany({
    select: {
      brand: true,
    },
    distinct: ["brand"],
  });
};
export const allYears = async () => {
  return await prisma.searchtable.findMany({
    select: {
      yearsYear: true,
    },
    distinct: ["yearsYear"],
  });
};

export const latestInputs = async () => {
  console.log("latestInupts");
  return await prisma.searchtable.findMany({
    take: 10,
    select: {
      name: true,
      yearsYear: true,
      typeId: true,
      nftid: true,
      brands: {
        select: {
          brand: true,
        },
      },
      type: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const getSearchIdByIdAndType = async (id: number, type: number) => {
  const searcht = await prisma.searchtable.findFirst({
    select: {
      id: true,
    },
    where: {
      nftid: id,
      typeId: type,
    },
  });

  console.log({ request: { id, type }, searcht });
  return searcht;
};
