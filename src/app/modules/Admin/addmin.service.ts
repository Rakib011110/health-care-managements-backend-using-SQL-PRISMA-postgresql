import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchFileds } from "./admin.constant";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { prisma } from "../../../Shared/prisma";

const getAllDBFormDB = async (param: any, options: any) => {
  const { searchTerm, ...filterData } = param;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  // console.log(filterData);
  const andConditions: Prisma.AdminWhereInput[] = [];

  //  [
  //         {
  //           name: {
  //             contains: param.searchTerm,
  //             mode: "insensitive",
  //           },
  //         },
  //         {
  //           email: {
  //             contains: param.searchTerm,
  //             mode: "insensitive",
  //           },
  //         },
  //       ],

  // const adminSearch = ["name", "email"];
  if (param.searchTerm) {
    andConditions.push({
      OR: adminSearchFileds.map((filed) => ({
        [filed]: {
          contains: param.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };
  const result = prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: "desc" },
  });
  // console.dir(andConditions, { dept: "infinity" });
  return result;
};

export const AdminService = {
  getAllDBFormDB,
};
