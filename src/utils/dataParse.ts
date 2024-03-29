import { AcousticGuitarFormValues, AmpEffectFormValues, BassFormValues, ElectricGuitarFormValues, GenericFields } from './formTypes';

export function getTypeIdByName(name: string){
  switch(name){
    case 'electric-guitar':
      return 1;
    case 'acoustic-guitar':
      return 2;
    case 'electric-bass':
      return 3;
    case 'amp':
      return 4;
    default:
      return 0;
  }
}

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

export function parseAmpToJSON(amp: AmpEffectFormValues, imageHash: string, fullName: string){
  return({
    description: `Vintage and Rare Amp Fx - ${fullName} - ${amp.serial}`,
    name: fullName,
    image: `ipfs://${imageHash}`,
    attributes: [
      { trait_type: "Brand", value: amp.brand },
      { trait_type: "Choke", value: amp.choke },
      { trait_type: "Circuit", value: amp.circuit },
      { trait_type: "Finish", value: amp.finish },
      { trait_type: "Instrument", value: amp.instrument },
      { trait_type: "Year", value: amp.year },
      { trait_type: "Model", value: amp.model },
      { trait_type: "Power", value: amp.power },
      { trait_type: "Preamp", value: amp.preamp },
      { trait_type: "Rectifier", value: amp.rectifier },
      { trait_type: "Reverb Other", value: amp.reverbOther },
      {
        trait_type: "Serial",
        value: amp.serial,
      },
      { trait_type: "Speaker", value: amp.speaker },
      {
        trait_type: "SpeakerCodes",
        value: amp.speakerCodes,
      },
      { trait_type: "Transformer", value: amp.transformer },
      {
        trait_type: "OT",
        value: amp.ot,
      },
      {
        trait_type: "PT",
        value: amp.pt,
      },
      { trait_type: "Wattage", value: amp.wattage },
      { trait_type: "Modifications/Repairs", value: amp.mods },
    ],
  })
}

export function parseAcousticToJSON(acoustic: AcousticGuitarFormValues, imageHash: string, fullName: string){
  return({
    description: `Vintage and Rare Acoustic Guitar - ${fullName} - ${acoustic.serial}`,
        name: fullName,
        image: `ipfs://${imageHash}`,
        attributes: [
          {
            trait_type: "Back&Sides",
            value: acoustic.backSides,
          },
          {
            trait_type: "BracePattern",
            value: acoustic.bracePattern,
          },
          { trait_type: "Brand", value: acoustic.brand },
          { trait_type: "Body Material", value: acoustic.bodyMaterial },
          { trait_type: "Bridge", value: acoustic.bridge },
          { trait_type: "Case", value: acoustic.case },
          {
            trait_type: "ContainsBrazilianRosewood",
            value: acoustic.bzRosewood,
          },
          { trait_type: "Electronics", value: acoustic.electronics },
          {
            trait_type: "FingerboardRadius",
            value: acoustic.fingerboardRadius,
          },
          { trait_type: "Finish", value: acoustic.finish },
          {
            trait_type: "FinishMaterial",
            value: acoustic.finishMaterial,
          },
          { trait_type: "Handedness", value: acoustic.handedness },
          { trait_type: "Year", value: acoustic.year },
          { trait_type: "Model", value: acoustic.model },
          {
            trait_type: "Modifications / Repairs",
            value: acoustic.mods,
          },
          { trait_type: "Neck Depth", value: acoustic.neckDepth },
          {
            trait_type: "Neck Fingerboard",
            value: acoustic.neckFingerboard,
          },
          { trait_type: "Neck Profile", value: acoustic.neckProfile },
          { trait_type: "Nut Width", value: acoustic.nutWidth },
          { trait_type: "Scale Length", value: acoustic.scaleLength },
          {
            trait_type: "SerialNumber",
            value: acoustic.serial,
          },
          {
            trait_type: "StringSpacingAtSaddle",
            value: acoustic.ssSaddle,
          },
          { trait_type: "Top", value: acoustic.top },
          { trait_type: "Tuners", value: acoustic.tuners },
        ],
  })
}

export function parseElectricGuitarToJSON(electric: ElectricGuitarFormValues, imageHash: string, fullName: string){
  return({
    description: `Vintage and Rare Electric Guitar - ${fullName} - ${electric.serial}`,
    name: fullName,
    image: `ipfs://${imageHash}`,
    attributes: [
      {
        trait_type: "BodyMaterial",
        value: electric.bodyMaterial,
      },
      { trait_type: "Brand", value: electric.brand },
      { trait_type: "Serial", value: electric.serial },
      { trait_type: "Neck Fingerboard", value: electric.neckFingerboard },
      { trait_type: "Case", value: electric.case },
      {
        trait_type: "ContainsBrazilianRosewood",
        value: electric.bzRosewood,
      },
      { trait_type: "Electronics", value: electric.electronics },
      { trait_type: "Finish", value: electric.finish },
      {
        trait_type: "FinishMaterial",
        value: electric.finishMaterial,
      },
      { trait_type: "Handedness", value: electric.handedness },

      { trait_type: "Year", value: electric.year },
      { trait_type: "Model", value: electric.model },
      {
        trait_type: "ModificationsRepairs",
        value: electric.mods,
      },
      { trait_type: "NeckProfile", value: electric.neckProfile },
      {
        trait_type: "NeckThickness",
        value: electric.neckThickness,
      },
      { trait_type: "NutWidth", value: electric.nutWidth },
      {
        trait_type: "PickupImpedance",
        value: electric.pickupImpedance,
      },
      { trait_type: "PotCodes", value: electric.potCodes },
      { trait_type: "Radius", value: electric.radius },
      { trait_type: "ScaleLength", value: electric.scaleLength },
      { trait_type: "Tuners", value: electric.tuners },
      { trait_type: "Weight", value: electric.weight },
    ],
  })
}