// KARGANOT MVP Build - by Onur & Copilot
// Authentication Service

import bcrypt from 'bcryptjs';
import prisma from '../prisma';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  getRefreshTokenExpiration,
} from '../utils/jwt';
import { RegisterInput, LoginInput } from '../utils/validate';
import { createError } from '../middlewares/errorHandler';

/**
 * Register new user
 */
export async function registerUser(input: RegisterInput) {
  // Check if email exists
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existingUser) {
    throw createError('Bu e-posta adresi zaten kullanımda', 400);
  }

  // Hash password
  const passwordHash = await bcrypt.hash(input.password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      email: input.email,
      passwordHash,
      name: input.name,
      universityId: input.universityId,
      facultyId: input.facultyId,
      departmentId: input.departmentId,
    },
    select: {
      id: true,
      email: true,
      name: true,
      plan: true,
      role: true,
      createdAt: true,
    },
  });

  // Generate tokens
  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  // Store refresh token
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: getRefreshTokenExpiration(),
    },
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
}

/**
 * Login user
 */
export async function loginUser(input: LoginInput) {
  // Find user
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user) {
    throw createError('E-posta veya şifre hatalı', 401);
  }

  // Verify password
  const isValid = await bcrypt.compare(input.password, user.passwordHash);

  if (!isValid) {
    throw createError('E-posta veya şifre hatalı', 401);
  }

  // Generate tokens
  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  // Store refresh token
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: getRefreshTokenExpiration(),
    },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      plan: user.plan,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(refreshToken: string) {
  // Verify token
  const payload = verifyRefreshToken(refreshToken);

  // Check if token exists in DB
  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
  });

  if (!storedToken || storedToken.expiresAt < new Date()) {
    throw createError('Geçersiz veya süresi dolmuş refresh token', 401);
  }

  // Generate new access token
  const accessToken = generateAccessToken({
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
  });

  return { accessToken };
}

/**
 * Logout user (invalidate refresh token)
 */
export async function logoutUser(refreshToken: string) {
  await prisma.refreshToken.delete({
    where: { token: refreshToken },
  });
}
