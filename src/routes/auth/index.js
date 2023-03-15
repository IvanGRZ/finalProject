import express from "express";
import httpStatus from 'http-status';
import passport from "passport";

import authMiddleware from '../../middlewares/authMiddleware.js';
import UserDTO from '../../dto/user/index.js';
import JwtService from '../../services/jwt/index.js';

const router = express.Router();
const jwtService = new JwtService();


router.post('/auth/signUp', (req, res, next) => {
    passport.authenticate('signup', {session: false}, (err, user, info) => {
        console.log("Test:",  user);
        if (err) {
            console.log("Error1");
            return next(err);
        }
        if (!user) {
            console.log("Error2");
            return res.status(401).json({ error: 'Uusario ya registrado!'  });
        }
    })(req, res, next);
});

router.post('/auth/signin', (req, res, next) => {
    passport.authenticate('login', {session: false}, (err, user, info) => {
        try{
            if (!user) {
                return res.status(403).json({
                    success: false,
                    message: `${httpStatus[403]}: Bad username or password`,
                });
            }            
            const userDataFormatted = new UserDTO(user).build();
            const accessToken = jwtService.generateJwt(userDataFormatted);

            return res.status(200).json({
                success: true,
                expiresIn: 60 * 60,
                accessToken,
            });

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: `${httpStatus[500]}: Internal error`,
              });           
        }

    })(req, res, next);
});

router.get('/test', authMiddleware, (req, res) => {
    res.status(200).json(req.user); 
});

export default router;
