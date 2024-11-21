import { Admin, Prisma, PrismaClient, UserStatus } from "@prisma/client";
import { adminSearchFileds } from "./admin.constant";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IAdminFilterRequest } from "./admin.interface";
import { IPaginationOptions } from "../../interfaces/pagination";
export const prisma = new PrismaClient();

const getAllDBFormDB = async (
  param: IAdminFilterRequest,
  options: IPaginationOptions
) => {
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
  andConditions.push({
    isDeleted: false,
  });
  const whereConditons: Prisma.AdminWhereInput = { AND: andConditions };

  const result = await prisma.admin.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.admin.count({
    where: whereConditons,
  });
  // console.dir(andConditions, { dept: "infinity" });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdFromDb = async (id: string): Promise<Admin | null> => {
  try {
    const result = await prisma.admin.findUnique({
      where: {
        id,
        isDeleted: false,
      },
    });

    return result;
  } catch (error) {
    throw new Error("Database query failed");
  }
};

const updateIntoDb = async (id: string, data: Partial<Admin>) => {
  await prisma.admin.findFirstOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.admin.updateMany({
    where: {
      id,
      isDeleted: false,
    },
    data,
  });
  return result;
};

const deleteIntoDb = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeleteData = await transactionClient.admin.delete({
      where: {
        id,
      },
    });

    const userDeleteData = await transactionClient.user.delete({
      where: {
        email: adminDeleteData.email,
      },
    });

    return adminDeleteData;
  });

  return result;
};
const softDeleteIntoDb = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeleteData = await transactionClient.admin.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    await transactionClient.user.update({
      where: {
        email: adminDeleteData.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return adminDeleteData;
  });

  return result;
};

export const AdminService = {
  getAllDBFormDB,
  getByIdFromDb,
  updateIntoDb,
  deleteIntoDb,
  softDeleteIntoDb,
};
