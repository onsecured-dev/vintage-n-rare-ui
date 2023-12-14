import { httpBatchLink } from "@trpc/client";
import { appRouter } from "@/server";

export const serverClient = appRouter.createCaller({
  links: [httpBatchLink({ url: "https://localhost:3000/api/trpc" })],
})