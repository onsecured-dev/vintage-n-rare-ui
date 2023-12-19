import type { InstrumentType } from "@/components/explore/PreviewCard";

export const previewData = [
  {
    id: 1,
    type: "electric-guitar",
    name: "Fender Jazzmaster",
    brand: "Fender",
    model: "Jazzmaster",
    year: 1959,
    serial: "35700",
    img: "fender_1",
  },
  {
    img: "fender_2",
    id: 2,
    type: "electric-guitar",
    name: "Fender Jazzmaster",
    brand: "Fender",
    model: "Jazzmaster",
    year: 1964,
    serial: "L55192",
  },
  {
    img: "fender_3",
    id: 3,
    type: "electric-guitar",
    name: "Fender Telecaster",
    brand: "Fender",
    model: "Telecaster",
    year: 1957,
    serial: "025435",
  },
  {
    img: "amp_1",
    id: 1,
    type: "amps-effects",
    name: "Fender Deluxe Amp",
    brand: "Fender",
    model: "Deluxe Amp",
    year: 1963,
    serial: "AX-123456",
  },
  {
    img: "amp_2",
    id: 2,
    type: "amps-effects",
    name: "Fender Vibrolux 5F11",
    brand: "Fender",
    model: "Vibrolux 5F11",
    year: 1959,
    serial: "f02364",
  },
  {
    img: "effect_1",
    id: 3,
    type: "amps-effects",
    name: "Pete Cornish Tes Delay",
    brand: "Pete Cornish",
    model: "T.E.S. Delay",
    year: 2000,
    serial: "PC/12088",
  },
  {
    img: "effect_2",
    id: 4,
    type: "amps-effects",
    name: "Tycobrahe Octavia",
    brand: "Tycobrahe",
    model: "Octavia",
    year: 1970,
    serial: "3383",
  },
] as Array<{
  id: number;
  type: InstrumentType;
  name: string;
  brand: string;
  model: string;
  year: number;
  serial: string;
  img: string;
}>;