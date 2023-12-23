type BaseMetadataFields = {
  year: number;
  brand: string;
  model: string;
  serial: string;
  mods: string;
}
type DefaultClientFields = { 
  image: FileList | null;
  instrument: string;
}

export type GenericFields = BaseMetadataFields & { [key: string]: any };


type UserFields = {
  name: string;
  email: string;
  phone: string;
}

export type BassFormValues = BaseMetadataFields & {
  handedness: "left" | "right";
  bodyMaterial: string;
  finish: string;
  finishMaterial: string;
  radius: string;
  weight: string;
  tuners: string;
  scaleLength: string;
  nutWidth: string;
  neckProfile: string;
  neckThickness: string;
  potCodes: string;
  electronics: string;
  pickupImpedance: string;
  neckFingerboard: string;
  case: string;
};

export type BassClientFormValues = BassFormValues & DefaultClientFields & UserFields;

export type AcousticGuitarFormValues = BaseMetadataFields & {
  handedness: "left" | "right";
  bodyMaterial: string;
  finish: string;
  finishMaterial: string;
  top: string;
  backSides: string;
  tuners: string;
  bridge: string;
  electronics: string;
  bracePattern: string;
  ssSaddle: string;
  neckFingerboard: string;
  neckProfile: string;
  neckDepth: string;
  fingerboardRadius: string;
  scaleLength: string;
  nutWidth: string;
  case: string;
  bzRosewood: boolean;
};

export type AcousticGuitarClientFormValues = AcousticGuitarFormValues & DefaultClientFields & UserFields;

export type ElectricGuitarFormValues = BaseMetadataFields & {
  finish: string;
  handedness: "left" | "right";
  bodyMaterial: string;
  finishMaterial: string;
  radius: string;
  weight: string;
  tuners: string;
  scaleLength: string;
  nutWidth: string;
  neckProfile: string;
  neckThickness: string;
  electronics: string;
  potCodes: string;
  pickupImpedance: string;
  bzRosewood: boolean;
  case: string;
};

export type AmpEffectFormValues = BaseMetadataFields & {
  preamp: string;
  power: string;
  rectifier: string;
  circuit: string;
  transformer: string;
  speaker: string;
  speakerCodes: string;
  pt: string;
  ot: string;
  choke: string;
  reverbOther: string;
  finish: string;
  wattage: number;
};