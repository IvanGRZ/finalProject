import express from "express";
import * as fs from 'fs';
import { CartDAO } from "../../daos/index.js";

const router = express.Router();

//Cart routes

router.get('/cart', (_req, res) => {
    CartDAO.getAll()
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

router.post('/cart/create', (_req, res) => {
    CartDAO.createCart()
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

router.post('/cart/add', (req, res) => {
    CartDAO.addCartproduct(req.body)
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

router.delete('/cart/deleteProduct', (req, res) => {
    CartDAO.delteProduct(req.body)
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

router.delete('/cart/delete', (req, res) => {
    CartDAO.delteCart(req.body)
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

export default router;
