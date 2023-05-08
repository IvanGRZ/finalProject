import express from "express";
import * as fs from 'fs';
import { CartDAO } from "../../daos/index.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

//Cart routes

router.get('/cart', authMiddleware, (_req, res) => {
    CartDAO.getAll()
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

router.post('/cart/create',authMiddleware, (_req, res) => {
    CartDAO.createCart()
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

router.post('/cart/add',authMiddleware, (req, res) => {
    CartDAO.addCartproduct(req.body)
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

router.delete('/cart/deleteProduct',authMiddleware, (req, res) => {
    CartDAO.delteProduct(req.body)
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

router.delete('/cart/delete', authMiddleware, (req, res) => {
    CartDAO.delteCart(req.body)
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

export default router;
