import express from "express";
import httpStatus from 'http-status';

import authMiddleware from '../../middlewares/authMiddleware.js';
import NodemailerService from '../../services/nodemailer/index.js';

const router = express.Router();
const nodemailerService = new NodemailerService();


router.post('/mail/purchaseEmail', authMiddleware, async (req, res) => {
    
    const {username, name, body} = req.body
    const subject = `Nuevo pedido de ${name} <${username}>.`
    const transport = await nodemailerService.transporter();
    const mailOptions = nodemailerService.mailOptions(body, subject);
    
    try {
        const send = await transport.sendMail(mailOptions);
        if(send){
            return res.status(200).json({
                success: true,
                data: send,
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

router.post('/mail/newRegister', async (req, res) => {
    
    const {username, body} = req.body
    const subject = `Nuevo registro de ${username}.`
    const transport = await nodemailerService.transporter();
    const mailOptions = nodemailerService.mailOptions(body, subject);
    
    try {
        const send = await transport.sendMail(mailOptions);
        if(send){
            return res.status(200).json({
                success: true,
                data: send,
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
