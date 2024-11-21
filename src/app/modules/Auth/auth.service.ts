import bcrypt from "bcrypt";
import { prisma } from "../../../Shared/prisma";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  console.log("Password is correct:", isCorrectPassword);

  // Return the user data (can be sanitized before returning)
  return userData;
};

export const AuthServices = {
  loginUser,
};
