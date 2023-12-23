import { TRPCError } from "@trpc/server";

export function checkPinataSetup() {
  if (!process.env.PINATA_JWT)
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "PINATA Auth is not set",
        });
}


export async function uploadFileToIPFS(file: Buffer, fileName: string){
  const blobFile = new Blob([file]);
  const data = new FormData();
  data.append("file", blobFile);
  data.append("pinataMetadata", JSON.stringify({ name: fileName }));
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
    body: data,
  });

  const { IpfsHash } = await res.json();
    
  return IpfsHash;
}


export async function uploadJSONToIPFS(data: Object){
  const resMetadata = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS',{
        method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.PINATA_JWT}`,
            accept: 'application/json', 
            'content-type': 'application/json'
          },
          body: JSON.stringify(data),
      });

  const { IpfsHash } = await resMetadata.json();
  return IpfsHash;
}