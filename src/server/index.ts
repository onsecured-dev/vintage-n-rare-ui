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
  allBrands,
  allYears,
  altSearch,
  createAcoustic,
  createAmpFx,
  createBass,
  createGuitar,
  latestInputs,
  searchDb,
  searchQuery,
} from "../util/queries";
import { previewData } from "@/data/placeholder";
import { initdb } from "@/util/initdb";
import nodemailer from "nodemailer";
import { env } from "process";
import { checkPinataSetup, updateFileMetadata, uploadFileToIPFS, uploadJSONToIPFS } from "@/utils/pinata";
import { getFullName, parseAcousticToJSON, parseAmpToJSON, parseBassToJSON, parseElectricGuitarToJSON } from "@/utils/dataParse";
import { AcousticGuitarClientFormValues, AmpEffectClientFormValues, BassClientFormValues, ElectricGuitarClientFormValues } from "@/utils/formTypes";

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
    instrument: z.string().min(3),
    data: z.any(),
    attachment: z.string()
  })).mutation(async (input) => {

    const sentData = input.input.data
    delete sentData.image
    const instrument = input.input.instrument.replace(/-/g, " ").trim();
    const instrumentName = instrument.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    try {
      // Send email
      const info = await transporter.sendMail({
        from: process.env.EM_USR,
        to:process.env.NODE_ENV =="production" ? "info@vintageandrare.io" : input.input.data.email,
        subject: `Request for Certificate - ${instrumentName}`,
        html: buildHtmlFromObject(input.input.data),
        attachments: [{ path: input.input.attachment}]
      });
      console.log("Message sent: %s", info.messageId);
      return { success: true };
    } catch (error) {
      console.error(error);
    }
  }),

  subscribe: publicProcedure.input(z.object({
    email: z.string().email(),
  })).mutation(async (input) => {
      
      try {
        // Send email
        const info = await transporter.sendMail({
          from: process.env.EM_USR,
          to:process.env.EM_USR,
          subject: `New Subscriber`,
          html: `<p>New subcribed email: ${input.input.email}</p>`,
        });
      return { success: true };
    } catch (error) {
        console.error(error);
      }
    }
  ),


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
      await updateFileMetadata(dataHash, fullName + " - " + input.input.object.serial + ".json");
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
      await updateFileMetadata(dataHash, fullName + " - " + input.input.object.serial + ".json");
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
      const acousticParsed = parseAcousticToJSON({
        ...input.input.object,
        bzRosewood: input.input.object.containsBrazilianRosewood
      }, imageHash, fullName);
      const dataHash = await uploadJSONToIPFS(acousticParsed);
      await updateFileMetadata(dataHash, fullName + " - " + input.input.object.serial + ".json");
      return dataHash
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
      const fullName = getFullName(input.input.object);
      console.log("GotAmpFx : ", fullName);
      const imageHash = await uploadFileToIPFS(input.input.image, input.input.object.model);
      console.log("Image Hash : ", imageHash);
      const ampParsed = parseAmpToJSON(input.input.object, imageHash, fullName);
      const dataHash = await uploadJSONToIPFS(ampParsed);
      console.log("data Hash : ", dataHash);
      await updateFileMetadata(dataHash, fullName + " - " + input.input.object.serial + ".json");
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
      // GuitarObject, BassObject, AmpFxObject, AcousticObject
      let data 
      switch (input.nftType) {
        case "guitar":
          data = JSON.parse(input.nftData) as ElectricGuitarClientFormValues;
          let guitarObj: GuitarObject = {
            NFTCID: input.nftmetadataCID,
            NFTId: parseInt(input.nftid),
            bodyMaterial: data.bodyMaterial,
            brand: data.brand,
            case: data.case,
            containsBrazilianRosewood: data.bzRosewood,
            electronics: data.electronics,
            finish: data.finish,
            finishMaterial: data.finishMaterial,
            handedness: data.handedness,
            year: data.year,
            model: data.model,
            modificationsRepairs: data.mods,
            neckFingerboard: data.neckFingerboard,
            neckProfile: data.neckProfile,
            neckThickness: data.neckThickness,
            nutWidth: data.nutWidth,
            pickupImpedance: data.pickupImpedance,
            potCodes: data.potCodes,
            radius: data.radius,
            serialNumber: data.serial,
            scaleLength: data.scaleLength,
            tuners: data.tuners,
            weight: data.weight,
          };
          await createGuitar(guitarObj);
          break;
        case "bass":
          data = JSON.parse(input.nftData) as BassClientFormValues;
          let bassObj: BassObject = {
            NFTCID: input.nftmetadataCID,
            NFTId: parseInt(input.nftid),
            bodyMaterial: data.bodyMaterial,
            brand: data.brand,
            case: data.case,
            electronics: data.electronics,
            fingerboardRadius: data.radius,
            finish: data.finish,
            finishMaterial: data.finishMaterial,
            handedness: data.handedness,
            model: data.model,
            modificationsRepairs: data.mods,
            neckFingerboard: data.neckFingerboard,
            neckProfile: data.neckProfile,
            neckThickness: data.neckThickness,
            potCodes: data.potCodes,
            pickupImpedance: data.pickupImpedance,
            nutWidth: data.nutWidth,
            scaleLength: data.scaleLength,
            serialNumber: data.serial,
            tuners: data.tuners,
            weight: data.weight,
            year: data.year,
          };
          console.log({HANDEDNESS: data.handedness})
          await createBass(bassObj);
          break;
        case "acoustic":
          data = JSON.parse(input.nftData) as AcousticGuitarClientFormValues;
          let acousticObj: AcousticObject = {
            NFTCID: input.nftmetadataCID,
            NFTId: parseInt(input.nftid),
            backAndSides: data.backSides,
            bodyMaterial: data.bodyMaterial,
            bracePattern: data.bracePattern,
            brand: data.brand,
            bridge: data.bridge,
            case: data.case,
            containsBrazilianRosewood: data.bzRosewood,
            electronics: data.electronics,
            fingerboardRadius: data.fingerboardRadius,
            finish: data.finish,
            finishMaterial: data.finishMaterial,
            handedness: data.handedness,
            year: data.year,
            model: data.model,
            modificationsRepairs: data.mods,
            neckDepth: data.neckDepth,
            neckFingerboard: data.neckFingerboard,
            neckProfile: data.neckProfile,
            nutWidth: data.nutWidth,
            scaleLength: data.scaleLength,
            serialNumber: data.serial,
            stringSpacingAtSaddle: data.ssSaddle,
            top: data.top,
            tuners: data.tuners,
          };
          await createAcoustic(acousticObj);
          break;
        case "ampfx":
          data = JSON.parse(input.nftData) as AmpEffectClientFormValues;
          let ampfxObj: AmpFxObject = {
            NFTCID: input.nftmetadataCID,
            NFTId: parseInt(input.nftid),
            brand: data.brand,
            choke: data.choke,
            circuit: data.circuit,
            finish: data.finish,
            instrument: data.instrument,
            year: data.year,
            model: data.model,
            modificationsRepairs: data.mods,
            power: data.power,
            preamp: data.preamp,
            rectifier: data.rectifier,
            reverbOther: data.reverbOther,
            serialNumber: data.serial,
            speaker: data.speaker,
            speakerCodes: data.speakerCodes,
            transformer: data.transformer,
            transformersOT: data.ot,
            transformersPT: data.pt,
            wattage: data.wattage,
          };
          await createAmpFx(ampfxObj);
          break;

        default:
          break;
      }
    }),

  search: publicProcedure
    .input(z.object({ 
      query: z.string().optional(),
      cursorPointer: z.number().optional(),
      years: z.array(z.number()).optional(),
      brands: z.array(z.string()).optional(),
      instruments: z.array(z.string()).optional(),
    }).optional())
    .query(async ({ input }) => {
      //   skip: 40,
  // take: 10,
      console.log("Searching For:\n", input?.query || 'all');
      if (!input) {
        return await latestInputs();
      }

      const res = await altSearch(input.query, input.years, input.brands, input.instruments);
      return res;
    }),
  getSearchInfo: publicProcedure.query( async() => {

    const brands = await allBrands();
    const years = await allYears();
    return {
      brands,
      years
    }
  })
});

export type AppRouter = typeof appRouter;
