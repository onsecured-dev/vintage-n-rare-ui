import { string, z } from "zod";

const HandednessSchema = z.enum(["left", "right"]);

export const NFTBassObject = z
  .object({
    bodyMaterial: z.string().optional(),
    brand: z.string(),
    case: z.string().optional(),
    electronics: z.string().optional(),
    finish: z.string().optional(),
    finishMaterial: z.string().optional(),
    handedness: HandednessSchema,
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
    bzRosewood: z.boolean(),
    electronics: z.string(),
    finish: z.string(),
    finishMaterial: z.string(),
    handedness: HandednessSchema,
    // image: z.string().transform((val) => Buffer.from(val.replace(/^data:image\/\w+;base64,/, ""), 'base64')),
    year: z.number(),
    model: z.string(),
    mods: z.string(),
    neckFingerboard: z.string(),
    neckProfile: z.string(),
    neckThickness: z.string(),
    nutWidth: z.string(),
    pickupImpedance: z.string(),
    potCodes: z.string(),
    radius: z.string(),
    serial: z.string(),
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
    bodyMaterial: z.string(),
    backSides: z.string(),
    bracePattern: z.string(),
    brand: z.string(),
    bridge: z.string(),
    case: z.string(),
    containsBrazilianRosewood: z.boolean(),
    electronics: z.string(),
    fingerboardRadius: z.string(),
    finish: z.string(),
    finishMaterial: z.string(),
    handedness: HandednessSchema,
    year: z.number(),
    model: z.string(),
    mods: z.string(),
    neckDepth: z.string(),
    neckFingerboard: z.string(),
    neckProfile: z.string(),
    nutWidth: z.string(),
    scaleLength: z.string(),
    serial: z.string(),
    ssSaddle: z.string(),
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
    year: z.number(),
    model: z.string(),
    power: z.string(),
    preamp: z.string(),
    rectifier: z.string(),
    reverbOther: z.string(),
    serial: z.string(),
    mods: z.string(),
    speaker: z.string(),
    speakerCodes: z.string(),
    ot: z.string(),
    pt: z.string(),
    transformer: z.string(),
    wattage: z.string(),
    fileType: z.string().regex(/^image\/(jpeg|png|gif|bmp|svg\+xml)$/),
    fileName: z.string().regex(/^[^\\/:\*\?"<>\|]+(\.[^\\/:\*\?"<>\|]+)*$/),
  })
  .required();

export interface GuitarObject {
  NFTCID: string;
  NFTId: number;
  bodyMaterial: string;
  brand: string;
  case: string;
  containsBrazilianRosewood: boolean;
  electronics: string;
  finish: string;
  finishMaterial: string;
  handedness: string;
  year: number;
  model: string;
  modificationsRepairs: string;
  neckFingerboard: string;
  neckProfile: string;
  neckThickness: string;
  nutWidth: string;
  pickupImpedance: string;
  potCodes: string;
  radius: string;
  serialNumber: string;
  scaleLength: string;
  tuners: string;
  weight: string;
}
export interface BassObject {
  NFTCID: string;
  NFTId: number;
  bodyMaterial: string;
  brand: string;
  case: string;
  electronics: string;
  fingerboardRadius: string;
  finish: string;
  finishMaterial: string;
  handedness: string;
  model: string;
  modificationsRepairs: string;
  neckFingerboard: string;
  neckProfile: string;
  neckThickness: string;
  nutWidth: string;
  potCodes: string;
  pickupImpedance: string;
  scaleLength: string;
  serialNumber: string;
  tuners: string;
  weight: string;
  year: number;
}
export interface AcousticObject {
  NFTCID: string;
  NFTId: number;
  backAndSides: string;
  bodyMaterial: string;
  bracePattern: string;
  brand: string;
  bridge: string;
  case: string;
  containsBrazilianRosewood: boolean;
  electronics: string;
  fingerboardRadius: string;
  finish: string;
  finishMaterial: string;
  handedness: string;
  year: number;
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
  NFTCID: string;
  NFTId: number;
  brand: string;
  choke: string;
  circuit: string;
  finish: string;
  instrument: string;
  year: number;
  model: string;
  modificationsRepairs: string;
  power: string;
  preamp: string;
  rectifier: string;
  reverbOther: string;
  serialNumber: string;
  speaker: string;
  speakerCodes: string;
  transformer: string;
  transformersOT: string;
  transformersPT: string;
  wattage: string;
}

export enum InstrumentCategory {
  Guitar = "electric-guitar",
  Bass = "electric-bass",
  Acoustic = "acoustic-guitar",
  AmpsEffects = "amps",
}

export interface IntrumentPayload {
  id: number;
  type: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  serial: string;
  img: string;
}

export const categoryDetails = {
  Guitar: [
    "Body Material",
    "Brand",
    "Case",
    "Contains Brazilian Rosewood",
    "Electronics",
    "Finish",
    "Finish Material",
    "Handedness",
    "Instrument Type",
    "Year",
    "Model",
    "Modifications Repairs",
    "Neck Fingerboard",
    "Neck Profile",
    "Neck Thickness",
    "Nut Width",
    "Pickup Impedance",
    "Pot Codes",
    "Radius",
    "Scale Length",
    "Tuners",
    "Weight",
  ],
  Bass: [
    "Year",
    "Brand",
    "Model",
    "Serial Number",
    "Handedness",
    "Body Material",
    "Finish",
    "Finish Material",
    "Radius",
    "Weight",
    "Tuners",
    "Scale Length",
    "Nut Width",
    "Neck Profile",
    "Neck Thickness",
    "Pot. Codes",
    "Electronics",
    "Pickup Impedance",
    "Neck Fingerboard",
    "Case",
    "Modifications / Repairs",
  ],
  Acoustic: [
    "Back And Sides",
    "Brace Pattern",
    "Brand",
    "Body Material",
    "Bridge",
    "Case",
    "Contains Brazilian Rosewood",
    "Electronics",
    "Fingerboard Radius",
    "Finish",
    "Finish Material",
    "Handedness",
    "Year",
    "Model",
    "Modifications Repairs",
    "Neck Depth",
    "Neck Fingerboard",
    "Neck Profile",
    "Nut Width",
    "Scale Length",
    "Serial Number",
    "String Spacing At Saddle",
    "Top",
    "Tuners",
  ],
  AmpsEffects: [
    "Brand",
    "Choke",
    "Circuit",
    "Finish",
    "Instrument",
    "Year",
    "Model",
    "Power",
    "Preamp",
    "Rectifier",
    "Reverb Other",
    "Serial Number",
    "Speaker",
    "Speaker Codes",
    "Transformer",
    "Transformers OT",
    "Transformers PT",
    "Wattage",
    "Modifications / Repairs",
  ],
};

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const buildHtmlFromObject = (obj: any) => {
  // For certificate emails

  let html =
    "<h1>Vintage and Rare Instruments</h1><h3>Request for Certificate</h3><ul>";

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      switch (key) {
        case "name":
          html += `</ul><hr><h4>Personal details</h4><ul><li><strong>${capitalizeFirstLetter(
            key
          )}:</strong> ${value}</li>`;

          break;

        // case "instrument":
        //   // manually build instrument field
        //   html += `<li><strong>${capitalizeFirstLetter(key)}:</strong> ${obj['year'] + ' - ' + obj['brand'] + ' - ' + obj['model']}</li>`;

        default:
          html += `<li><strong>${capitalizeFirstLetter(
            key
          )}:</strong> ${value}</li>`;
          break;
      }
    }
  }

  html += "</ul>";
  return html;
};

export const buildTextFromObject = (obj: any) => {
  console.log("building text");
  let text = `Hello,\n\nThese are the order details:\n\n`;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      text += `${key}: ${value}\n`;
    }
  }

  return text;
};

// export const mailConfig = (to: string, data:any) => {

// }

export const querySelectFields = {
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
};
