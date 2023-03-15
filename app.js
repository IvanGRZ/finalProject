import express from "express";
import session from "express-session";
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import md5 from "md5";
import passport from "passport";
import { Strategy as LocalStrategy} from 'passport-local'
import router from './src/routes/index.js'

import { AuthDao } from "./src/daos/index.js";

import loggerMiddleware from "./src/middlewares/loggerMiddleware.js"

dotenv.config();

const app = express();
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'default';


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use(cookieParser(COOKIE_SECRET));

app.use(session({
    secret: COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: false,
        secure: false
    } 
}));

passport.use('login' ,new LocalStrategy(async (username, password, done) => {
    const user = await AuthDao.login(username, md5(password))

    if(!user){
        return done(null, false);
    }
    else{
        return done(null, user)
    }
}));

passport.use('signup', new LocalStrategy({ passReqToCallback: true},
    async (req, username, password, done) => {
    
    const existUser = await AuthDao.signUp(
            username, 
            md5(password), 
            req.body.address, 
            req.body.age, 
            req.body.picture,
            req.body.name, 
            req.body.phone,
        );
    
    console.log(existUser)

    if(typeof existUser == 'boolean'){
        return done(null, false);
    }
    else{
        return done(null, existUser);
    }
        //const userData = await userModel.findOne({Email, Password: md5(Password)});
        /*
        if(userData){
            return done(null, false);
        }
        const stageUser = new userModel({
            Email,
            Password: md5(Password),
            Nombre: req.body.Nombre,
            Direccion: req.body.Direccion,
            Edad: req.body.Edad,
            NumeroTel: req.body.NumeroTel,
            Foto: req.body.Foto,
        });
        const newUser = await stageUser.save();
        done(null, newUser);
        */
    }
));



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await AuthDao.findById(id)
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());


app.use(router);


export default app;