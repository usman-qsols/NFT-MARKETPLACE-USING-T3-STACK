import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  createNftSchema,
  getNftSchema,
  getUserNftSchema,
  updateNftSchema,
} from "../../../schema/nft";

export const nftRouter = createTRPCRouter({
  createNft: publicProcedure
    .input(createNftSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        console.log("Input : ", input);
        if (
          !input.title &&
          !input.description &&
          !input.ipfsHash &&
          !input.tokenId &&
          !input.ownerAddress &&
          !input.price &&
          !input.active &&
          !input.contractAddress &&
          !input.sellerAddress
        ) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Please Add Your All Field",
          });
        } else {
          const paylaod: any = {
            tokenId: input.tokenId?.toString(),
            title: input.title,
            description: input.description,
            ipfsHash: input.ipfsHash,
            price: input.price,
            ownerAddress: input.ownerAddress,
            contractAddress: input.contractAddress,
            active: input.active,
          };
          console.log(paylaod, "paylaod");
          const user = await ctx.db.nft.create({
            data: paylaod,
          });
          console.log(user, "user");
          return user;
        }
      } catch (error: any) {
        console.log("data error", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error?.message,
        });
      }
    }),

  getNftListed: publicProcedure.query(async ({ ctx }) => {
    try {
      const response = await ctx.db.nft.findMany({
        where: {
          active: true,
        },
      });
      return response;
    } catch (error: any) {
      console.log("data error", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error?.message,
      });
    }
  }),
  getOwnersNfts: publicProcedure
    .input(getUserNftSchema)
    .query(async ({ ctx, input }) => {
      try {
        const response = await ctx.db.nft.findMany({
          where: {
            ownerAddress: input.ownerAddress,
          },
        });
        return response;
      } catch (error: any) {
        console.log("data error", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error?.message,
        });
      }
    }),

  buyNft: publicProcedure
    .input(updateNftSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        console.log(input, "input");
        let option: any = {};
        option.where = {
          id: input.id,
        };
        option.data = {
          ownerAddress: input.ownerAddress,
          active: input.active,
        };
        const updateResponse = await ctx.db?.nft?.update(option);
        console.log(updateResponse, "updateResponse");
        return updateResponse;
      } catch (e) {
        console.log(e, "errorworking");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
