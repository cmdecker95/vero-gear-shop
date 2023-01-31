import { JWT_ACCESS_SECRET } from "$env/static/private";
import { prisma } from "$lib/server/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.firstname,
      email: user.email,
      role: user.role,
    },
    JWT_ACCESS_SECRET,
    {
      expiresIn: 60 * 60 * 24 * 7, // 1 week
    }
  );
};

export const authenticateUser = async ({ cookies }) => {
  // Check for JWT in cookies
  const token = cookies.get("auth");
  if (!token) return null;

  // Validate JWT
  const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET);
  if (typeof jwtUser === "string") return null;

  // Check for user in database
  const user = await prisma.user.findUnique({ where: { id: jwtUser.id } });
  if (!user) return null;

  // Return user to hook
  return {
    id: user.id,
    name: user.firstname,
    email: user.email,
    role: user.role,
  };
};

export const createUser = async (firstname, lastname, email, password) => {
  // Verify user doesn't exist
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) return { error: "User already exists" };

  // Add user to database
  try {
    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: await bcrypt.hash(password, 10),
        role: "USER",
      },
    });

    return { token: generateToken(user) };
  } catch (error) {
    return { error: `Something went wrong: ${error}` };
  }
};

export const loginUser = async (email, password) => {
  // Verify user exists
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: "Account not found" };

  // Verify correct password
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) return { error: "Incorrect password" };

  return { token: generateToken(user) };
};
