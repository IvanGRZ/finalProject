import express from "express";
import httpStatus from 'http-status';
import dotenv from 'dotenv'

import authMiddleware from '../../middlewares/authMiddleware.js';
import TwilioService from '../../services/twilio/index.js';

const router = express.Router();
const twilioService = new TwilioService();
dotenv.config();

router.post('/messages/sms', authMiddleware, async (req, res) => {
    try {
        const {phone} = req.body

        const client = await twilioService.client();
        const message = await client.messages.create({
            body:'¡Hola! Te confirmamos que tu pedido ha sido recibido y se encuentra en proceso',
            messagingServiceSid: process.env.MESSAGING_SERVICE_SID,
            to: phone
        })

        if(message){
            return res.status(200).json({
                success: true,
                data: message,
            });  
        }   

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `${httpStatus[500]}: Internal error`,
        });             
    }
});


router.post('/messages/whatsapp', authMiddleware, async (req, res) => {
    try {
        const {userName, name, body} = req.body

        const client = await twilioService.client();
        const message = await client.messages.create({
            body: `Nuevo pedido de ${name} <${userName}>  ${body}`,
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+5213317355007',
        })

        if(message){
            return res.status(200).json({
                success: true,
                data: message,
            });  
        }   

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `${httpStatus[500]}: Internal error`,
        });             
    }
});



export default router;
