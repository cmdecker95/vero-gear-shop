import { JWT_ACCESS_SECRET } from "$env/static/private";
import { prisma } from "$lib/server/prisma";
import { generateToken } from "$lib/utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function authenticateUser({ cookies }) {
  console.log("🔒 Authenticating user...");

  // Check for user JWT in cookies
  const token = cookies.get("auth");

  if (!token) {
    console.log("🔒 None");
    return null;
  }

  // Validate the user JWT
  const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET);

  if (typeof jwtUser === "string") {
    console.log("🔒 The JWT was invalid");
    return null;
  }

  // Check for user in database
  const user = await prisma.user
    .findUnique({ where: { id: jwtUser.id } })
    .catch((e) => console.log(`🔒 Error retrieving user from database: ${e}`));

  if (!user) {
    console.log("🔒 User not found in database");
    return null;
  }

  // Return user info
  const userInfo = {
    id: user.id,
    name: user.firstname,
    email: user.email,
    role: user.role,
  };

  console.log(`🔒 ${userInfo.name} (${userInfo.role})`);

  return userInfo;
}

export async function createUser(firstname, lastname, email, password) {
  console.log(`🔒 Creating user in database for ${firstname} ${lastname}...`);

  let error;
  let token;

  // Verify user doesn't exist
  const existingUser = await prisma.user
    .findUnique({ where: { email } })
    .catch((e) => {
      error = "Error accessing database";
      console.log(`🔒 ${error}: ${e}`);
    });

  if (existingUser) {
    error = "User already exists for that email";
    console.log(`🔒 ${error}`);
  }

  // Add user to database
  else {
    const user = await prisma.user
      .create({
        data: {
          firstname,
          lastname,
          email,
          password: await bcrypt.hash(password, 10),
          role: "USER",
        },
      })
      .catch((e) => {
        error = "Error creating user in database";
        console.log(`🔒 ${error}: ${e}`);
      });

    // Generate user JWT
    if (user) {
      token = generateToken(user);
      console.log(`🔒 User created for ${firstname} ${lastname}`);
    }
  }

  return { error, token };
}

export async function loginUser(email, password) {
  console.log(`🔒 Logging in ${email}...`);

  let error;
  let token;

  // Verify user exists
  const user = await prisma.user.findUnique({ where: { email } }).catch((e) => {
    error = "Error finding user in database";
    console.log(`🔒 ${error}: ${e}`);
  });

  if (!user) {
    error = "User account not found";
    console.log(`🔒 ${error}`);
  }

  // Verify correct password
  let passwordIsValid;

  if (user) {
    passwordIsValid = await bcrypt
      .compare(password, user.password)
      .catch((e) => {
        error = "Error checking password";
        console.log(`🔒 ${error}: ${e}`);
      });
  }

  if (!passwordIsValid) {
    error = "Incorrect password";
    console.log(`🔒 ${error}`);
  }

  // Generate token if user and password are valid
  if (user && passwordIsValid) {
    token = generateToken(user);
    console.log(`🔒 User found for ${email}`);
  }

  return { error, token };
}
