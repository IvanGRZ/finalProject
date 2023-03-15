import express from "express";
import passport from "passport";

import productsRoutes from './products/index.js'
import cartRoutes from './cart/index.js'
import authRoutes from './auth/index.js'

const router = express.Router();

router.use('/api', productsRoutes)
router.use('/api', cartRoutes);
router.use('/api', authRoutes)


export default router;