import { z } from "zod";
import { publicProcedure, router, createTRPCRouter } from "./trpc";
import { NFTStorage, File } from "nft.storage";
import { TRPCError } from "@trpc/server";
import { NFTBassObject } from "../util/util";


export const appRouter = router({
  getIds: publicProcedure.query(
    async () => {
      return [1, 2, 3]
    }
  ),

  getGuitars: publicProcedure.input(z.object({
    year: z.number().lte(new Date().getFullYear()),
    brand: z.string().min(5),
  })).query(
    async ({ input }) => {
      console.log('do stuff with input', input)
    }
  ),

  createBass: publicProcedure.input(z.object(
    {
      
      image: z.string().transform((val) => Buffer.from(val.replace(/^data:image\/\w+;base64,/, ""), 'base64')),
      object: NFTBassObject
      
    }

  )).mutation(async (input) => {

    if (!process.env.NFT_STORAGE_KEY)
      return new TRPCError({
        code: "BAD_REQUEST",
        message: "NFT_STORAGE_KEY is not set"
      });

    console.log("GotBASS : ", input);
    const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY })
    // const fileExtension = input.input.image.match(/\.[^/.]+$/)?.[0];

    //   if(!fileExtension)
    //       return new TRPCError({
    //         code: "BAD_REQUEST",
    //         message: "File extension not found"
    //       });
    const cid = await client.store(
      {
        description: `Vintage and Rare Bass Guitar - ${input.input.object.brand} - ${input.input.object.model}`,
        name: "Bass",
        image: new File([input.input.image], `${input.input.image.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '_')}${'.png'}`, { type: 'png' }),
        attributes: [
          {
            trait_type: "Model",
            value: input.input.object.model
          },
          {
            trait_type: "Year",
            value: input.input.object.year
          },
          {
            trait_type: "Brand",
            value: input.input.object.brand
          },
          {
            trait_type: "Serial",
            value: input.input.object.serial
          },
          {
            trait_type: "Handedness",
            value: input.input.object.handedness
          },
          {
            trait_type: "BodyMaterial",
            value: input.input.object.bodyMaterial
          },
          {
            trait_type: "Finish",
            value: input.input.object.finish
          },
          {
            trait_type: "FinishMaterial",
            value: input.input.object.finishMaterial
          },
          {
            trait_type: "Radius",
            value: input.input.object.radius
          },
          {
            trait_type: "Weight",
            value: input.input.object.weight
          },
          {
            trait_type: "Tuners",
            value: input.input.object.tuners
          },
          {
            trait_type: "ScaleLength",
            value: input.input.object.scaleLength
          },
          {
            trait_type: "NutWidth",
            value: input.input.object.nutWidth
          },
          {
            trait_type: "NeckProfile",
            value: input.input.object.neckProfile
          },
          {
            trait_type: "NeckThickness",
            value: input.input.object.neckThickness
          },
          {
            trait_type: "PotCodes",
            value: input.input.object.potCodes
          },
          {
            trait_type: "Electronics",
            value: input.input.object.electronics
          },
          {
            trait_type: "PickupImpedance",
            value: input.input.object.pickupImpedance
          },
          {
            trait_type: "NeckFingerboard",
            value: input.input.object.neckFingerboard
          },
          {
            trait_type: "Case",
            value: input.input.object.case
          },
          {
            trait_type: "mods",
            value: input.input.object.mods
          },
        ]

      }
    )
    //  show cid to check
    console.log(cid);


    // return cid without ipfs substr
    return cid.url.replace("ipfs://", "")

  }),

  // createGuitar: publicProcedure.input(z.object(
  //   {
  //     bodyMaterial: z.string(),              
  //     brand: z.string(),                     
  //     case: z.string(),                      
  //     containsBrazilianRosewood: z.string(), 
  //     electronics: z.string(),               
  //     finish: z.string(),                    
  //     finishMaterial: z.string(),            
  //     handedness: z.string(),     
  //     image: z.string().transform((val) => Buffer.from(val.replace(/^data:image\/\w+;base64,/, ""), 'base64')),           
  //     instrumentType: z.string(),            
  //     madeInYear: z.string(),                
  //     model: z.string(),                     
  //     modificationsRepairs: z.string(),      
  //     neckFingerboard: z.string(),           
  //     neckProfile: z.string(),               
  //     neckThickness: z.string(),             
  //     nutWidth: z.string(),                  
  //     pickupImpedance: z.string(),           
  //     potCodes: z.string(),                  
  //     radius: z.string(),                    
  //     scaleLength: z.string(),               
  //     tuners: z.string(),                    
  //     weight: z.string(),                    
  //   }
  // ))

  getTest: publicProcedure.query(
    async () => {
      return "yay"
    }
  ),

  pushNFTtoDb: publicProcedure.input(z.object({
    nftid: z.string(), // typeof == `0x{hex stuff}
    nftmetadataCID: z.string(), // typeof == `Qm{base58 stuff}`
  })).mutation(async ({ input }) => {
    // get data associated with CID (preferable JSON)
    // actually save the data to the database
  }),
})

export type AppRouter = typeof appRouter;