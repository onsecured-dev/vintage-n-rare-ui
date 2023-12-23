import { BassFormValues, GenericFields } from './formTypes';

export function getFullName( data: GenericFields ){
  return `${data.year} ${data.brand} ${data.model}`;
}

export function parseBassToJSON(bass: BassFormValues, imageHash: string, fullName: string) {
  const parsedData = {
    description: `Vintage and Rare Bass Guitar - ${fullName} - ${bass.serial}`,
    name: fullName,
    image: `ipfs://${imageHash}`,
      attributes: [
        {
          trait_type: "Year",
          value: bass.year,
        },
        {
          trait_type: "Brand",
          value: bass.brand,
        },
        {
          trait_type: "Model",
          value: bass.model,
        },
        {
          trait_type: "Serial",
          value: bass.serial,
        },
        {
          trait_type: "Handedness",
          value: bass.handedness,
        },
        {
          trait_type: "Body Material",
          value: bass.bodyMaterial,
        },
        {
          trait_type: "Finish",
          value: bass.finish,
        },
        {
          trait_type: "Finish Material",
          value: bass.finishMaterial,
        },
        {
          trait_type: "Radius",
          value: bass.radius,
        },
        {
          trait_type: "Weight",
          value: bass.weight,
        },
        {
          trait_type: "Tuners",
          value: bass.tuners,
        },
        {
          trait_type: "Scale Length",
          value: bass.scaleLength,
        },
        {
          trait_type: "Nut Width",
          value: bass.nutWidth,
        },
        {
          trait_type: "Neck Profile",
          value: bass.neckProfile,
        },
        {
          trait_type: "Neck Thickness",
          value: bass.neckThickness,
        },
        {
          trait_type: "Pot. Codes",
          value: bass.potCodes,
        },
        {
          trait_type: "Electronics",
          value: bass.electronics,
        },
        {
          trait_type: "Pickup Impedance",
          value: bass.pickupImpedance,
        },
        {
          trait_type: "Neck Fingerboard",
          value: bass.neckFingerboard,
        },
        {
          trait_type: "Case",
          value: bass.case,
        },
        {
          trait_type: "Modifications / Repairs",
          value: bass.mods,
        },
      ],

  }
  return parsedData;
}