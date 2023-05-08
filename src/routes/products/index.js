import express from "express";
import * as fs from 'fs';
import { ProductDAO } from "../../daos/index.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();
const admin = true;

//Products routes

router.get('/products',authMiddleware, async (_req, res) => {
    ProductDAO.getAll()
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

router.get('/products/by/id',authMiddleware, (req, res) => {

    ProductDAO.getByID(req.body.id)
    .then(result => {
        if (result == null){
            res.status(404).json({ error : 'producto no encontrado' })
        }
        else{
            res.status(200).json({result})
        }
    })
    .catch(error => res.status(500).json(error))
});

router.post('/products/add',authMiddleware, async (req, res) => {
    if(admin){
        ProductDAO.save([req.body])
        .then(result => {
            res.status(200).json({result})
        })
        .catch(error => res.status(500).json(error))
    }
    else{
        res.status(405).json({ 
            success: false,
            error : -1, 
            descripcion: 'ruta api/products/add no autorizada'
        });
    }
});

router.put('/products/update',authMiddleware, (req, res) => {
    if(admin){
        ProductDAO.updateProduct(req.body)
        .then(result => {
            res.status(200).json({result})
        })
        .catch(error => res.status(500).json(error))
    }
    else{
        res.status(405).json({ 
            success: false,
            error : -1, 
            descripcion: 'ruta api/products/update no autorizada'
        });
    }
});

router.delete('/products/delete', authMiddleware, (req, res) => {
    if(admin){
        ProductDAO.deleteById(req.body.id)
        .then(result => {
            res.status(200).json({result})
        })
        .catch(error => res.status(500).json(error))
    }
    else{
        res.status(405).json({ 
            success: false,
            error : -1, 
            descripcion: 'ruta api/products/update no autorizada'
        });
    }
});

export default router;
