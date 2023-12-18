import { string, z } from "zod";

export const NFTBassObject = z
  .object({
    bodyMaterial: z.string().optional(),
    brand: z.string(),
    case: z.string().optional(),
    electronics: z.string().optional(),
    finish: z.string().optional(),
    finishMaterial: z.string().optional(),
    handedness: z.string().optional(),
    // image: z.string().transform((val) => Buffer.from(val.replace(/^data:image\/\w+;base64,/, ""), 'base64')),
    // image a base64 string to store as metadata inside nft >>?
    model: z.string(),
    mods: z.string().optional(),
    neckFingerboard: z.string().optional(),
    neckProfile: z.string().optional(),
    neckThickness: z.string().optional(),
    nutWidth: z.string().optional(),
    pickupImpedance: z.string().optional(),
    potCodes: z.string().optional(),
    radius: z.string().optional(),
    scaleLength: z.string().optional(),
    serial: z.string().optional(),
    tuners: z.string().optional(),
    weight: z.string().optional(),
    year: z.number().optional(),
    // are these  ??
    fileType: z.string().regex(/^image\/(jpeg|png|gif|bmp|svg\+xml)$/),
    fileName: z.string().regex(/^[^\\/:\*\?"<>\|]+(\.[^\\/:\*\?"<>\|]+)*$/),
  })
  .required();

export const NFTGuitarObject = z
  .object({
    bodyMaterial: z.string(),
    brand: z.string(),
    case: z.string(),
    containsBrazilianRosewood: z.string(),
    electronics: z.string(),
    finish: z.string(),
    finishMaterial: z.string(),
    handedness: z.string(),
    // image: z.string().transform((val) => Buffer.from(val.replace(/^data:image\/\w+;base64,/, ""), 'base64')),
    instrumentType: z.string(),
    madeInYear: z.string(),
    model: z.string(),
    modificationsRepairs: z.string(),
    neckFingerboard: z.string(),
    neckProfile: z.string(),
    neckThickness: z.string(),
    nutWidth: z.string(),
    pickupImpedance: z.string(),
    potCodes: z.string(),
    radius: z.string(),
    scaleLength: z.string(),
    tuners: z.string(),
    weight: z.string(),
    fileType: z.string().regex(/^image\/(jpeg|png|gif|bmp|svg\+xml)$/),
    fileName: z.string().regex(/^[^\\/:\*\?"<>\|]+(\.[^\\/:\*\?"<>\|]+)*$/),
  })
  .required();

export const NFTAcousticObject = z
  .object({
    // image: z.string().transform((val) => Buffer.from(val.replace(/^data:image\/\w+;base64,/, ""), 'base64')),
    backAndSides: z.string(),
    bracePattern: z.string(),
    brand: z.string(),
    bridge: z.string(),
    case: z.string(),
    containsBrazilianRosewood: z.string(),
    electronics: z.string(),
    fingerboardRadius: z.string(),
    finish: z.string(),
    finishMaterial: z.string(),
    handedness: z.string(),
    madeInYear: z.string(),
    model: z.string(),
    modificationsRepairs: z.string(),
    neckDepth: z.string(),
    neckFingerboard: z.string(),
    neckProfile: z.string(),
    nutWidth: z.string(),
    scaleLength: z.string(),
    serialNumber: z.string(),
    stringSpacingAtSaddle: z.string(),
    top: z.string(),
    tuners: z.string(),
    fileType: z.string().regex(/^image\/(jpeg|png|gif|bmp|svg\+xml)$/),
    fileName: z.string().regex(/^[^\\/:\*\?"<>\|]+(\.[^\\/:\*\?"<>\|]+)*$/),
  })
  .required();

export const NFTAmpFxObject = z
  .object({
    // image: z.string().transform((val) => Buffer.from(val.replace(/^data:image\/\w+;base64,/, ""), 'base64')),
    brand: z.string(),
    choke: z.string(),
    circuit: z.string(),
    finish: z.string(),
    instrument: z.string(),
    madeInYear: z.string(),
    model: z.string(),
    power: z.string(),
    preamp: z.string(),
    rectifier: z.string(),
    reverbOther: z.string(),
    serialNumber: z.string(),
    speaker: z.string(),
    speakerCodes: z.string(),
    transformersOT: z.string(),
    transformersPT: z.string(),
    wattage: z.string(),
    fileType: z.string().regex(/^image\/(jpeg|png|gif|bmp|svg\+xml)$/),
    fileName: z.string().regex(/^[^\\/:\*\?"<>\|]+(\.[^\\/:\*\?"<>\|]+)*$/),
  })
  .required();

export interface GuitarObject {
  NFTCID: string;
  NFTId: string;
  bodyMaterial: string;
  brand: string;
  case: string;
  containsBrazilianRosewood: string;
  electronics: string;
  finish: string;
  finishMaterial: string;
  handedness: string;
  instrumentType: string;
  madeInYear: string;
  model: string;
  modificationsRepairs: string;
  neckFingerboard: string;
  neckProfile: string;
  neckThickness: string;
  nutWidth: string;
  pickupImpedance: string;
  potCodes: string;
  radius: string;
  scaleLength: string;
  tuners: string;
  weight: string;
}
export interface BassObject {
    id: string;
    NFTCID: string;
    NFTId: string;
    bodyMaterial: string;
    brand: string;
    case: string;
    electronics: string;
    fingerboardRadius: string;
    finish: string;
    finishMaterial: string;
    model: string;
    modificationsRepairs: string;
    neckDepth: string;
    neckFingerboard: string;
    neckProfile: string;
    nutWidth: string;
    radius: string;
    scaleLength: string;
    serialNumber: string;
    tuners: string;
    weight: string;
    yearMade: string;
}
export interface AcousticObject {
    id: string;
    NFTCID: string;
    NFTId: string;
    backAndSides: string;
    bracePattern: string;
    brand: string;
    bridge: string;
    case: string;
    containsBrazilianRosewood: string;
    electronics: string;
    fingerboardRadius: string;
    finish: string;
    finishMaterial: string;
    handedness: string;
    madeInYear: string;
    model: string;
    modificationsRepairs: string;
    neckDepth: string;
    neckFingerboard: string;
    neckProfile: string;
    nutWidth: string;
    scaleLength: string;
    serialNumber: string;
    stringSpacingAtSaddle: string;
    top: string;
    tuners: string;
}
export interface AmpFxObject {
    id: string;
    NFTCID: string;
    NFTId: string;
    brand: string;
    choke: string;
    circuit: string;
    finish: string;
    instrument: string;
    madeInYear: string;
    model: string;
    power: string;
    preamp: string;
    rectifier: string;
    reverbOther: string;
    serialNumber: string;
    speaker: string;
    speakerCodes: string;
    transformersOT: string;
    transformersPT: string;
    wattage: string;
}
