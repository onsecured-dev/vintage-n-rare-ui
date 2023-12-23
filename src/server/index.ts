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
import { getFullName, parseBassToJSON } from "@/utils/dataParse";

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
        to: input.input.email,
        subject: "Request for Certificate",
        text: JSON.stringify(input.input.data),
        html: "<b>Request for Certificate</b><br></br><p>" + JSON.stringify(sentData, null, 4) + "</p>",
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
      if (!process.env.NFT_STORAGE_API_KEY)
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "NFT_STORAGE_API_KEY is not set",
        });

      console.log("Got E Guit : ", input);
      const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY });
      const fileExtension = input.input.object.fileName.match(/\.[^/.]+$/)?.[0];

      if (!fileExtension)
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "File extension not found",
        });
      const cid = await client.store({
        description: `Vintage and Rare Electric Guitar - ${input.input.object.brand} - ${input.input.object.model}`,
        name: `${input.input.object.madeInYear} - ${input.input.object.brand} - ${input.input.object.model}`,
        image: new File(
          [input.input.image],
          `${input.input.object.model
            .toLowerCase()
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "_")}${fileExtension}`,
          { type: input.input.object.fileType }
        ),
        attributes: [
          {
            trait_type: "BodyMaterial",
            value: input.input.object.bodyMaterial,
          },
          { trait_type: "Brand", value: input.input.object.brand },
          { trait_type: "Case", value: input.input.object.case },
          {
            trait_type: "ContainsBrazilianRosewood",
            value: input.input.object.containsBrazilianRosewood,
          },
          { trait_type: "Electronics", value: input.input.object.electronics },
          { trait_type: "Finish", value: input.input.object.finish },
          {
            trait_type: "FinishMaterial",
            value: input.input.object.finishMaterial,
          },
          { trait_type: "Handedness", value: input.input.object.handedness },

          {
            trait_type: "InstrumentType",
            value: input.input.object.instrumentType,
          },
          { trait_type: "MadeInYear", value: input.input.object.madeInYear },
          { trait_type: "Model", value: input.input.object.model },
          {
            trait_type: "ModificationsRepairs",
            value: input.input.object.modificationsRepairs,
          },
          {
            trait_type: "NeckFingerboard",
            value: input.input.object.neckFingerboard,
          },
          { trait_type: "NeckProfile", value: input.input.object.neckProfile },
          {
            trait_type: "NeckThickness",
            value: input.input.object.neckThickness,
          },
          { trait_type: "NutWidth", value: input.input.object.nutWidth },
          {
            trait_type: "PickupImpedance",
            value: input.input.object.pickupImpedance,
          },
          { trait_type: "PotCodes", value: input.input.object.potCodes },
          { trait_type: "Radius", value: input.input.object.radius },
          { trait_type: "ScaleLength", value: input.input.object.scaleLength },
          { trait_type: "Tuners", value: input.input.object.tuners },
          { trait_type: "Weight", value: input.input.object.weight },
        ],
      });
      //  show cid to check
      console.log(cid);

      // return cid without ipfs substr
      return cid.url.replace("ipfs://", "");
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
      if (!process.env.NFT_STORAGE_API_KEY)
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "NFT_STORAGE_API_KEY is not set",
        });

      console.log("GotAcoustic : ", input);
      const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY });
      const fileExtension = input.input.object.fileName.match(/\.[^/.]+$/)?.[0];

      if (!fileExtension)
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "File extension not found",
        });
      const cid = await client.store({
        description: `Vintage and Rare Acoustic Guitar - ${input.input.object.brand} - ${input.input.object.model}`,
        name: `${input.input.object.madeInYear} - ${input.input.object.brand} - ${input.input.object.model}`,
        image: new File(
          [input.input.image],
          `${input.input.object.model
            .toLowerCase()
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "_")}${fileExtension}`,
          { type: input.input.object.fileType }
        ),
        attributes: [
          {
            trait_type: "BackAndSides",
            value: input.input.object.backAndSides,
          },
          {
            trait_type: "BracePattern",
            value: input.input.object.bracePattern,
          },
          { trait_type: "Brand", value: input.input.object.brand },
          { trait_type: "Bridge", value: input.input.object.bridge },
          { trait_type: "Case", value: input.input.object.case },
          {
            trait_type: "ContainsBrazilianRosewood",
            value: input.input.object.containsBrazilianRosewood,
          },
          { trait_type: "Electronics", value: input.input.object.electronics },
          {
            trait_type: "FingerboardRadius",
            value: input.input.object.fingerboardRadius,
          },
          { trait_type: "Finish", value: input.input.object.finish },
          {
            trait_type: "FinishMaterial",
            value: input.input.object.finishMaterial,
          },
          { trait_type: "Handedness", value: input.input.object.handedness },
          { trait_type: "MadeInYear", value: input.input.object.madeInYear },
          { trait_type: "Model", value: input.input.object.model },
          {
            trait_type: "ModificationsRepairs",
            value: input.input.object.modificationsRepairs,
          },
          { trait_type: "NeckDepth", value: input.input.object.neckDepth },
          {
            trait_type: "NeckFingerboard",
            value: input.input.object.neckFingerboard,
          },
          { trait_type: "NeckProfile", value: input.input.object.neckProfile },
          { trait_type: "NutWidth", value: input.input.object.nutWidth },
          { trait_type: "ScaleLength", value: input.input.object.scaleLength },
          {
            trait_type: "SerialNumber",
            value: input.input.object.serialNumber,
          },
          {
            trait_type: "StringSpacingAtSaddle",
            value: input.input.object.stringSpacingAtSaddle,
          },
          { trait_type: "Top", value: input.input.object.top },
          { trait_type: "Tuners", value: input.input.object.tuners },
        ],
      });
      //  show cid to check
      console.log(cid);

      // return cid without ipfs substr
      return cid.url.replace("ipfs://", "");
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
      if (!process.env.NFT_STORAGE_API_KEY)
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "NFT_STORAGE_API_KEY is not set",
        });

      console.log("GotAmpFx : ", input);
      const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY });
      const fileExtension = input.input.object.fileName.match(/\.[^/.]+$/)?.[0];

      if (!fileExtension)
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "File extension not found",
        });
      const cid = await client.store({
        description: `Vintage and Rare Amp Fx - ${input.input.object.brand} - ${input.input.object.model}`,
        name: `${input.input.object.madeInYear} - ${input.input.object.brand} - ${input.input.object.model}`,
        image: new File(
          [input.input.image],
          `${input.input.object.model
            .toLowerCase()
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "_")}${fileExtension}`,
          { type: input.input.object.fileType }
        ),
        attributes: [
          { trait_type: "brand", value: input.input.object.brand },
          { trait_type: "choke", value: input.input.object.choke },
          { trait_type: "circuit", value: input.input.object.circuit },
          { trait_type: "finish", value: input.input.object.finish },
          { trait_type: "instrument", value: input.input.object.instrument },
          { trait_type: "madeInYear", value: input.input.object.madeInYear },
          { trait_type: "model", value: input.input.object.model },
          { trait_type: "power", value: input.input.object.power },
          { trait_type: "preamp", value: input.input.object.preamp },
          { trait_type: "rectifier", value: input.input.object.rectifier },
          { trait_type: "reverbOther", value: input.input.object.reverbOther },
          {
            trait_type: "serialNumber",
            value: input.input.object.serialNumber,
          },
          { trait_type: "speaker", value: input.input.object.speaker },
          {
            trait_type: "speakerCodes",
            value: input.input.object.speakerCodes,
          },
          {
            trait_type: "transformersOT",
            value: input.input.object.transformersOT,
          },
          {
            trait_type: "transformersPT",
            value: input.input.object.transformersPT,
          },
          { trait_type: "wattage", value: input.input.object.wattage },
        ],
      });
      //  show cid to check
      console.log(cid);

      // return cid without ipfs substr
      // get CID
      const CID = cid.url.replace("ipfs://", "");
      /// add to DB - pending Table
      // db.create('pending', id: CID, data: JSON.stringify(input.object))
      return CID;
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

  // search: publicProcedure.mutation(async (opts) => {
  //   await opts.ctx.signGuestBook();

  //   return {
  //     message: 'goodbye!',
  //   };
  // }),
});

export type AppRouter = typeof appRouter;
