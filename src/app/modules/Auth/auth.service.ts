import bcrypt from "bcrypt";
import { prisma } from "../../../Shared/prisma";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { generateToken, jwtHelpers } from "../../../helpers/jwtHelpers";
import { UserStatus } from "@prisma/client";
import config from "../../../config";
import { any } from "zod";
import emailSender from "./emailSender";
import ApiError from "../../Error/ApiError";
import { StatusCodes } from "http-status-codes";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  // console.log("Password is correct:", isCorrectPassword);

  if (!isCorrectPassword) {
    throw new Error("password is incorrect!");
  }

  const accessToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.secret,
    config.jwt.expiresIn
  );
  const refreshToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refreshTokenSecret,
    config.jwt.refreshTokenExpiresIn
  );

  // const refreshToken = Jwt.sign(
  //   { email: userData.email, role: userData.role },
  //   "RefreshSECreateKeYS",
  //   {
  //     algorithm: "HS256",
  //     expiresIn: "15m",
  //   }
  // );
  // console.log(accessToken);

  return {
    // userData,
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPassowordChange,
  };
};

//* -------------------------------------
const refreshToken = async (token: string) => {
  let decodedData;
  try {
    // decodedData = jwt.verify(token, "secreatekeysss") as JwtPayload;
    decodedData = jwtHelpers.verifyToken(token, config.jwt.refreshTokenSecret);
    // console.log(decodedData);
  } catch (error) {
    throw new Error("You are not authorized!");
  }

  const decodedUserData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = generateToken(
    {
      email: decodedUserData.email,
      role: decodedUserData.role,
    },

    config.jwt.secret, // "secreatekeysss",
    config.jwt.expiresIn //     "15m"
  );

  return {
    // userData,
    accessToken,
    needPasswordChange: decodedUserData.needPassowordChange,
  };
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  // console.log("Password is correct:", isCorrectPassword);

  if (!isCorrectPassword) {
    throw new Error("password is incorrect!");
  }
  const hashedPassword = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPassowordChange: false,
    },
  });
  return {
    message: "Password Change Success",
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPassToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.resetPasswordTokenSecret,
    config.jwt.resetPasswordTokenExpiresIn
  );

  const resetPassLink =
    config.resetPasswordLink + `?userId=${userData.id}&token=${resetPassToken}`;

  await emailSender(
    userData.email,
    `
        <div>
            <p>Dear User,</p>
            <p>Your password reset link 
                <a href=${resetPassLink}>
                    <button>
                        Reset Password
                    </button>
                </a>
            </p>

        </div>
        `
  );

  console.log("resetPassLink", resetPassLink);
};

const resetPassword = async (
  token: string,
  payload: { id: string; password: string }
) => {
  console.log({ token, payload });

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });

  const isValidToken = jwtHelpers.verifyToken(
    token,
    config.jwt.resetPasswordTokenSecret as Secret
  );

  if (!isValidToken) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Forbidden!");
  }

  // hash password
  const password = await bcrypt.hash(payload.password, 12);

  // update into database
  await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      password,
    },
  });
};
export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
