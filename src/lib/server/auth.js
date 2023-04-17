import { env } from "$env/dynamic/private";
import { prisma } from "$lib/server/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* Generate a token (JWT) for the user */
export function generateToken(user, expiresIn = 60 * 60 * 24 * 7) {
  const userInfo = {
    id: user.id,
    name: user.firstname,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(userInfo, env.JWT_ACCESS_SECRET, {
    expiresIn, // 1 week by default
  });
}

/* Make sure a JWT has not been tampered with */
export function validateToken(token) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET);
}

/* Grant permissions based on user JWT */
export async function authenticateUser({ cookies }) {
  // Check for user JWT in cookies
  const token = cookies.get("auth");

  // If no JWT found, user has no permissions
  if (!token) {
    console.log("🔒 None");
    return null;
  }

  // Otherwise, validate the user JWT
  const jwtUser = validateToken(token);

  if (typeof jwtUser === "string") {
    console.log("🔒 The JWT was invalid");
    return null;
  }

  // For valid user JWTs, check for user in database
  const user = await prisma.user
    .findUnique({ where: { id: jwtUser.id } })
    .catch((e) => console.log(`🔒 Error retrieving user from database: ${e}`));

  if (!user) {
    console.log("🔒 User not found in database");
    return null;
  }

  // Return info for user found
  const userInfo = {
    id: user.id,
    name: user.firstname,
    email: user.email,
    role: user.role,
  };

  console.log(`🔒 ${userInfo.name} (${userInfo.role})`);

  return userInfo;
}

/* Create a new user from the Register form */
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

/* Login a user and return JWT if email/pass valid */
export async function loginUser(email, password) {
  console.log(`🔒 Logging in ${email}...`);

  let error;
  let token;

  // Verify user exists in database
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
