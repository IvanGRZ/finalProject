import express from "express";
import * as fs from 'fs';
import {ContenedorProductos} from "../data/containerProducts.js";
import {containerCart} from "../data/containerCart.js";


const router = express.Router();
const admin = true;
const Products = new ContenedorProductos();
const Cart = new containerCart();

router.get('/products', (_req, res) => {
    Products.getAll()
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

router.get('/products/by/id', (req, res) => {

    Products.getByID(req.body.id)
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

router.post('/products/add', async (req, res) => {
    if(admin){
        Products.save([req.body])
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

router.put('/products/update', (req, res) => {
    if(admin){
        Products.updateProduct(req.body)
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

router.delete('/products/delete', (req, res) => {
    if(admin){
        Products.deleteById(req.body.id)
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


router.get('/cart', (_req, res) => {
    Cart.getAll()
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

router.post('/cart/create', (_req, res) => {
    Cart.createCart()
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

router.post('/cart/add', (req, res) => {
    Cart.addCartproduct(req.body)
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

router.delete('/cart/deleteProduct', (req, res) => {
    Cart.delteProduct(req.body)
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});

router.delete('/cart/delete', (req, res) => {
    Cart.delteCart(req.body)
    .then(result => {
        res.status(200).json({result})
    })
    .catch(error => res.status(500).json(error))
});



export default router;