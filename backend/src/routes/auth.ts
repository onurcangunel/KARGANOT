// KARGANOT MVP Build - by Onur & Copilot
// Auth Routes

import { Router, Request, Response } from 'express';
import { registerSchema, loginSchema, refreshTokenSchema } from '../utils/validate';
import * as authService from '../services/authService';

const router = Router();

/**
 * POST /v1/auth/register
 * Register new user
 */
router.post('/register', async (req: Request, res: Response) => {
  try {
    const input = registerSchema.parse(req.body);
    const result = await authService.registerUser(input);

    res.status(201).json({
      success: true,
      message: 'Kayıt başarılı',
      data: result,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * POST /v1/auth/login
 * Login user
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const input = loginSchema.parse(req.body);
    const result = await authService.loginUser(input);

    res.json({
      success: true,
      message: 'Giriş başarılı',
      data: result,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * POST /v1/auth/refresh
 * Refresh access token
 */
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const input = refreshTokenSchema.parse(req.body);
    const result = await authService.refreshAccessToken(input.refreshToken);

    res.json({
      success: true,
      message: 'Token yenilendi',
      data: result,
    });
  } catch (error) {
    throw error;
  }
});

/**
 * POST /v1/auth/logout
 * Logout user
 */
router.post('/logout', async (req: Request, res: Response) => {
  try {
    const input = refreshTokenSchema.parse(req.body);
    await authService.logoutUser(input.refreshToken);

    res.json({
      success: true,
      message: 'Çıkış başarılı',
    });
  } catch (error) {
    throw error;
  }
});

export default router;
