import express from "express";
import { OrderDAO } from "../../daos/index.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

//Orders routes

router.get('/order',authMiddleware, (_req, res) => {
    OrderDAO.getAll()
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

router.post('/order/create',authMiddleware, (req, res) => {
    OrderDAO.createOrder(req.body)
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

router.post('/order/addProduct', authMiddleware,(req, res) => {
    OrderDAO.addProductsOrder(req.body)
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

router.delete('/order/deleteProduct',authMiddleware, (req, res) => {
    OrderDAO.deleteProductOrder(req.body)
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

router.delete('/order/delete',authMiddleware, (req, res) => {
    OrderDAO.delteOrder(req.body)
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});


export default router;
