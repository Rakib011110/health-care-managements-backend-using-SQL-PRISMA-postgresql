import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllDBFormDB = async (param: any) => {
  console.log({ param });
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

  const adminSearch = ["name", "email"];
  if (param.searchTerm) {
    andConditions.push({
      OR: adminSearch.map((filed) => ({
        [filed]: {
          contains: param.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };

  const result = prisma.admin.findMany({
    where: whereConditions,
  });
  console.dir(andConditions, { dept: "infinity" });

  return result;
};

export const AdminService = {
  getAllDBFormDB,
};
