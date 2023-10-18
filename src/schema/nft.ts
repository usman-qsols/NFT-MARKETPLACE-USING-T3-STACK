import z from "zod";

// title,
// price,
//           description,
//           ipfsHash,
//           ownerAddress,
//           contractAddress,
//           sellerAddress,
//           tokenId,
//           active,

export const createNftSchema = z.object({
  title: z.string(),
  price: z.string(),
  description: z.string(),
  ipfsHash: z.string(),
  ownerAddress: z.string(),
  contractAddress: z.string(),
  sellerAddress: z.string(),
  tokenId: z.string(),
  active: z.boolean(),
});

export type CreateNftInput = z.TypeOf<typeof createNftSchema>;

export const updateNftSchema = z.object({
  price: z.string().optional(),
  ownerAddress: z.string().optional(),
  active: z.boolean().optional(),
  id: z.string().optional(),
});
// export const purchaseXoltNFTSchema = z.object({
//   nft_id: z.string(),
//   store_id: z.string(),
//   nft_owner: z.string().optional(),
//   buyer_address: z.string().optional(),
//   price: z.string(),
//   status: z.boolean().optional(),
//   tokenId: z.string(),
// });

export const getNftSchema = z.object({});

export const getUserNftSchema = z.object({
  ownerAddress: z.string(),
});
