import express from "express";

import productsRoutes from './products/index.js'
import cartRoutes from './cart/index.js'
import authRoutes from './auth/index.js'
import mailRoutes from './mail/index.js'
import textMessagesRoutes from './textMessages/index.js'
import orderRoutes from './orders/index.js'

const router = express.Router();

router.use('/api', productsRoutes);
router.use('/api', cartRoutes);
router.use('/api', authRoutes);
router.use('/api', mailRoutes)
router.use('/api', textMessagesRoutes)
router.use('/api', orderRoutes)

export default router;