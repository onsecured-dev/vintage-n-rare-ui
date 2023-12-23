import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { NFTStorage, File } from "nft.storage";
import { TRPCError } from "@trpc/server";
import {
  AcousticObject,
  AmpFxObject,
  BassObject,
  GuitarObject,
  NFTAcousticObject,
  NFTAmpFxObject,
  NFTBassObject,
  NFTGuitarObject,
  buildHtmlFromObject,
  buildTextFromObject,
} from "../util/util";
import {
  createAcoustic,
  createAmpFx,
  createBass,
  createGuitar,
  searchDb,
  searchQuery,
} from "../util/queries";
import { previewData } from "@/data/placeholder";
import { initdb } from "@/util/initdb";
import nodemailer from "nodemailer";
import { env } from "process";
import { checkPinataSetup, uploadFileToIPFS, uploadJSONToIPFS } from "@/utils/pinata";
import { getFullName, parseAcousticToJSON, parseAmpToJSON, parseBassToJSON, parseElectricGuitarToJSON } from "@/utils/dataParse";

const transporter = nodemailer.createTransport({
  service: "one",
  host: process.env.EM_SMTP,
  // host: "mailout.one.com",
  port: 587,
  auth: {
    user: process.env.EM_USR,
    pass: process.env.EM_PW,
  },
});



export const appRouter = router({
  getIds: publicProcedure.query(async () => {
    return [1, 2, 3];
  }),

  sendMail: publicProcedure.input(z.object({
    email: z.string().email(),
    name: z.string(),
    phone: z.string().optional(),
    data: z.any(),
    attachment: z.string()
  })).mutation(async (input) => {

    const sentData = input.input.data
    delete sentData.image

    try {
      // Send email
      const info = await transporter.sendMail({
        from: process.env.EM_USR,
        to:"info@vintageandrare.io",
        subject: "Request for Certificate",
        // text: JSON.stringify(input.input.data),
        html: buildHtmlFromObject(input.input.data),
        attachments: [{ path: input.input.attachment}]
      });
      console.log("Message sent: %s", info.messageId);
      return { success: true };
    } catch (error) {
      console.error(error);
    }
  }),

  initDb: publicProcedure.query(async () => {
    await initdb();
    return 200;
  }),

  getGuitars: publicProcedure
    .input(
      z.object({
        year: z.number().lte(new Date().getFullYear()),
        brand: z.string().min(5),
      })
    )
    .query(async ({ input }) => {
      console.log("do stuff with input", input);
    }),

  createBass: publicProcedure
    .input(
      z.object({
        image: z
          .string()
          .transform((val) =>
            Buffer.from(val.replace(/^data:image\/\w+;base64,/, ""), "base64")
          ),
        object: NFTBassObject,
      })
    )
    .mutation(async (input) => {
      checkPinataSetup();

      console.log("GotBASS : ", input);
      
      const fullName = getFullName(input.input.object);
      const imageHash = await uploadFileToIPFS(input.input.image, fullName);
      
      const bassParsed = parseBassToJSON(input.input.object, imageHash, fullName);
      const dataHash = await uploadJSONToIPFS(bassParsed);
      return dataHash;
    }),

  createGuitar: publicProcedure
    .input(
      z.object({
        image: z
          .string()
          .transform((val) =>
            Buffer.from(val.replace(/^data:image\/\w+;base64,/, ""), "base64")
          ),
        object: NFTGuitarObject,
      })
    )
    .mutation(async (input) => {
      checkPinataSetup();

      console.log("Got E Guit : ", input);

      const fullName = getFullName(input.input.object);
      const imageHash = await uploadFileToIPFS(input.input.image, fullName);
      const guitarParsed = parseElectricGuitarToJSON(input.input.object, imageHash, fullName);
      const dataHash = await uploadJSONToIPFS(guitarParsed);
      return dataHash;

    }),

  createAcoustic: publicProcedure
    .input(
      z.object({
        image: z
          .string()
          .transform((val) =>
            Buffer.from(val.replace(/^data:image\/\w+;base64,/, ""), "base64")
          ),
        object: NFTAcousticObject,
      })
    )
    .mutation(async (input) => {
      checkPinataSetup();
      console.log("GotAcoustic : ", input);
      const fullName = getFullName(input.input.object);
      const imageHash = await uploadFileToIPFS(input.input.image, fullName);
      const acousticParsed = parseAcousticToJSON(input.input.object, imageHash, fullName);
      const dataHash = await uploadJSONToIPFS(acousticParsed);
    }),

  createAmpFx: publicProcedure
    .input(
      z.object({
        image: z
          .string()
          .transform((val) =>
            Buffer.from(val.replace(/^data:image\/\w+;base64,/, ""), "base64")
          ),
        object: NFTAmpFxObject,
      })
    )
    .mutation(async (input) => {
      checkPinataSetup();
      console.log("GotAmpFx : ", input);
      const fullName = getFullName(input.input.object);
      const imageHash = await uploadFileToIPFS(input.input.image, input.input.object.model);
      const ampParsed = parseAmpToJSON(input.input.object, imageHash, fullName);
      const dataHash = await uploadJSONToIPFS(ampParsed);

      return dataHash;
    }),

  getTest: publicProcedure.query(async () => {
    return "Success Server Test";
  }),

  pushNFTtoDb: publicProcedure
    .input(
      z.object({
        nftid: z.string(), // typeof == `0x{hex stuff}
        nftmetadataCID: z.string(), // typeof == `Qm{base58 stuff}`
        nftType: z.string(),
        nftData: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // get data associated with CID (preferable JSON)
      // const data = JSON.parse( db.get('pending',cid) )
      // actually save the data to the database
      // "{alskdfja;d}"
      console.log("pushNFTtoDb input:\n", input);
      const nftObject: any = {};
      // turn input.nft to nftObject
      // GuitarObject, BassObject, AmpFxObject, AcousticObject
      let data = JSON.parse(input.nftData);
      switch (input.nftType) {
        case "guitar":
          let guitarObj: GuitarObject = {
            NFTCID: input.nftmetadataCID,
            NFTId: input.nftid,
            bodyMaterial: data.bodyMaterial,
            brand: data.brand,
            case: data.case,
            containsBrazilianRosewood: data.containsBrazilianRosewood,
            electronics: data.electronics,
            finish: data.finish,
            finishMaterial: data.finishMaterial,
            handedness: data.handedness,
            instrumentType: data.instrumentType,
            year: data.year,
            model: data.model,
            modificationsRepairs: data.modificationsRepairs,
            neckFingerboard: data.neckFingerboard,
            neckProfile: data.neckProfile,
            neckThickness: data.neckThickness,
            nutWidth: data.nutWidth,
            pickupImpedance: data.pickupImpedance,
            potCodes: data.potCodes,
            radius: data.radius,
            scaleLength: data.scaleLength,
            tuners: data.tuners,
            weight: data.weight,
          };
          await createGuitar(guitarObj);
          break;
        case "bass":
          let bassObj: BassObject = {
            id: data.id,
            NFTCID: input.nftmetadataCID,
            NFTId: input.nftid,
            bodyMaterial: data.bodyMaterial,
            brand: data.brand,
            case: data.case,
            electronics: data.electronics,
            fingerboardRadius: data.fingerboardRadius,
            finish: data.finish,
            finishMaterial: data.finishMaterial,
            model: data.model,
            modificationsRepairs: data.modificationsRepairs,
            neckDepth: data.neckDepth,
            neckFingerboard: data.neckFingerboard,
            neckProfile: data.neckProfile,
            nutWidth: data.nutWidth,
            radius: data.radius,
            scaleLength: data.scaleLength,
            serialNumber: data.serialNumber,
            tuners: data.tuners,
            weight: data.weight,
            year: data.year,
          };
          await createBass(bassObj);
          break;
        case "acoustic":
          let acousticObj: AcousticObject = {
            id: data.id,
            NFTCID: input.nftmetadataCID,
            NFTId: input.nftid,
            backAndSides: data.backAndSides,
            bracePattern: data.bracePattern,
            brand: data.brand,
            bridge: data.bridge,
            case: data.case,
            containsBrazilianRosewood: data.containsBrazilianRosewood,
            electronics: data.electronics,
            fingerboardRadius: data.fingerboardRadius,
            finish: data.finish,
            finishMaterial: data.finishMaterial,
            handedness: data.handedness,
            year: data.year,
            model: data.model,
            modificationsRepairs: data.modificationsRepairs,
            neckDepth: data.neckDepth,
            neckFingerboard: data.neckFingerboard,
            neckProfile: data.neckProfile,
            nutWidth: data.nutWidth,
            scaleLength: data.scaleLength,
            serialNumber: data.serialNumber,
            stringSpacingAtSaddle: data.stringSpacingAtSaddle,
            top: data.top,
            tuners: data.tuners,
          };
          await createAcoustic(nftObject);
          break;
        case "ampfx":
          let ampfxObj: AmpFxObject = {
            id: data.id,
            NFTCID: input.nftmetadataCID,
            NFTId: input.nftid,
            brand: data.brand,
            choke: data.choke,
            circuit: data.circuit,
            finish: data.finish,
            instrument: data.instrument,
            year: data.year,
            model: data.model,
            power: data.power,
            preamp: data.preamp,
            rectifier: data.rectifier,
            reverbOther: data.reverbOther,
            serialNumber: data.serialNumber,
            speaker: data.speaker,
            speakerCodes: data.speakerCodes,
            transformersOT: data.transformersOT,
            transformersPT: data.transformersPT,
            wattage: data.wattage,
          };
          await createAmpFx(nftObject);
          break;

        default:
          break;
      }
    }),

  search: publicProcedure
    .input(z.object({ query: z.string() }).optional())
    .mutation(async ({ input }) => {
      if (!input) {
        return previewData;
      }
      console.log("Searching For:\n", input.query);
      // trim input spaces and separate into multiple words
      const words = input.query.split(/\s+/);
      console.log(words);
      const res = await searchDb(words);
      console.log("db response: \n", res);
      // check wordbank table
      // IntrumentPayloadDTO
      return res;
      // return await searchQuery(input)
    }),


});

export type AppRouter = typeof appRouter;
