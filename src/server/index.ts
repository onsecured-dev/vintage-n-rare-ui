import { z } from "zod";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getIds: publicProcedure.query(
    async() => {
      return [1,2,3]
    }
  ),

  getGuitars: publicProcedure.input(z.object({
    year: z.number().lte(new Date().getFullYear()),
    brand: z.string().min(5),
  })).query(
    async({input}) => {
      console.log('do stuff with input', input)
    }
  ),


  pushNFTtoDb: publicProcedure.input(z.object({
    nftid: z.string(), // typeof == `0x{hex stuff}
    nftmetadataCID: z.string(), // typeof == `Qm{base58 stuff}`
  })).mutation(async ({input}) => {
    // get data associated with CID (preferable JSON)
    // actually save the data to the database
  }),
})

export type AppRouter = typeof appRouter;