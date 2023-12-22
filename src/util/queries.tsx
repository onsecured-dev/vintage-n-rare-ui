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
        fullName: `${guitar.year} ${guitar.brand} ${guitar.model} `,
        ...guitar,
      },
    });

    // findOrCreate year
    let yearId = await prisma.years.findUnique({

    })

    // findOrCreate brand
    
    // guitar type

    // save in searchtable
    const res = await prisma.searchTable.create({
      data: {
        name: `${guitar.year} ${guitar.brand} ${guitar.model} `,
        yearsYear: guitar.year,
        brandsId: yearId,
        typeId: 1,
      }
    })

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

export const getPagEGuitar = async (pageNumber: number = 1, resultsPerPage: number = 20) => {
  try {
    const result = await prisma.electricGuitar.findMany({
      skip: (pageNumber - 1) * resultsPerPage,
      take: resultsPerPage,
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
        fullName: `${bass.year} ${bass.brand} ${bass.model} `,
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
        fullName: `${acoustic.year} ${acoustic.brand} ${acoustic.model} `,
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
        fullName: `${ampFx.year} ${ampFx.brand} ${ampFx.model} `,
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

export const getWords =async (words:string[]) => {

  try {
    const result = await prisma.Wordbank.findUnique({
      where: {
        words: words[0]
        // word: {
        //   OR: [
        //     { condition1: value1 },
            
        //   ],
        // }
      }
    });
    return result;
  } catch (error) {
    console.log('Error :', error)
  } finally {
    await prisma.$disconnect();
  }
  
}

export const searchQuery = async (query: string) => {

  // perform a findMany on each model and specify the common fields to return
  // use textSearch in column FullName
  let guitars = await prisma.electricGuitar.findMany({
    select: {
      brand:true,
      model: true,
      year: true,
      NFTId: true,
    },
    where: {
      fullName: {
        search: query,
      }
    }
  })

  console.log('Guitars: ', guitars)

  let bass = await prisma.bass.findMany({
    select: {
      brand:true,
      model: true,
      year: true,
      NFTId: true,
    },
    where: {
      fullName: {
        search: query,
      }
    }
  })

  console.log('bass: ', bass)

  let acoustic = await prisma.acousticguitar.findMany({
    select: {
      brand:true,
      model: true,
      year: true,
      NFTId: true,
    },
    where: {
      fullName: {
        search: query,
      }
    }
  })

  console.log('acoustic: ', acoustic)
  

  let ampFx = await prisma.ampfx.findMany({
    select: {
      brand:true,
      model: true,
      year: true,
      NFTId: true,
    },
    where: {
      fullName: {
        search: query,
      }
    }
  })
  console.log('ampFx: ', ampFx)
  console.log('Combined: \n', {
    ...guitars,
    ...bass,
    ...acoustic,
    ...ampFx,
  })

  // return combined
  return {
    ...guitars,
    ...bass,
    ...acoustic,
    ...ampFx,
  }
}
