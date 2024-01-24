export type AttributeType = {
  trait_type: string, value: any}
  
export default function attributesParse(attributes: Array<AttributeType>) {
  const parsedAttributes: {[key: string] : string | number} = {};
  for (const attribute of attributes) {
    let key = attribute.trait_type.replace(/\s+/g, '-').toLowerCase();
    if(key == "serialnumber")
      key = "serial"
    const value = attribute.value;
    parsedAttributes[key] = value;
  }
  return parsedAttributes;
}

export function attributesToDB(attributes: Array<AttributeType>) {
  const parsedAttributes: {[key: string] : string | number} = {};
  for (const attribute of attributes) {
    let key = attributeList[attribute.trait_type];
    const value = attribute.value;
    parsedAttributes[key] = value;
  }
  return parsedAttributes;
}

export const attributeList: { [key:string] : string } = {
  "Back&Sides":	"backAndSides",
  "BracePattern":	"bracePattern",
  "BodyMaterial":	"bodyMaterial",
  "Body Material":	"bodyMaterial",
  "Brand":	"brand",
  "Bridge":	"bridge",
  "Case":	"case",
  "Choke":	"choke",
  "Circuit":	"circuit",
  "ContainsBrazilianRosewood":	"containsBrazilianRosewood",
  "Electronics":	"electronics",
  "FingerboardRadius":	"fingerboardRadius",
  "Finish":	"finish",
  "FinishMaterial":	"finishMaterial",
  "Finish Material":	"finishMaterial",
  "Handedness":	"handedness",
  "Instrument":	"instrument",
  "Model":	"model",
  "Modifications / Repairs":	"modificationsRepairs",
  "ModificationsRepairs":	"modificationsRepairs",
  "Neck Depth":	"neckDepth",
  "NeckDepth":	"neckDepth",
  "Neck Fingerboard":	"neckFingerboard",
  "NeckFingerboard":	"neckFingerboard",
  "Neck Profile":	"neckProfile",
  "NeckProfile":	"neckProfile",
  "Neck Thickness":	"neckThickness",
  "NeckThickness":	"neckThickness",
  "Nut Width":	"nutWidth",
  "NutWidth":	"nutWidth",
  "OT":	"ot",
  "Pot. Codes":	"potCodes",
  "PotCodes":	"potCodes",
  "Pot Codes":	"potCodes",
  "PT":	"pt",
  "Pickup Impedance":	"pickupImpedance",
  "PickupImpedance":	"pickupImpedance",
  "Radius":	"radius",
  "Reverb Other":	"reverbOther",
  "ReverbOther":	"reverbOther",
  "Scale Length":	"scaleLength",
  "ScaleLength":	"scaleLength",
  "Serial":	"serialNumber",
  "SerialNumber":	"serialNumber",
  "Speaker":	"speaker",
  "SpeakerCodes":	"speakerCodes",
  "StringSpacingAtSaddle":	"stringSpacingAtSaddle",
  "Top":	"top",
  "Transformer":	"transformer",
  "Tuners":	"tuners",
  "Wattage":	"wattage",
  "Weight":	"weight",
  "Year":	"year",
}