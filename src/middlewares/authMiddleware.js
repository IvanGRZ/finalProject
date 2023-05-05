import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const authMiddleware = (req, res, next) => {

    const JWT_SECRET = process.env.JWT_SECRET_KEY;

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            success: false,
            message: `${httpStatus[401]}`
        });
    }
    const token = authHeader;
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err){
            console.log(err)
            return res.status(403).json({
                success: false,
                message: `${httpStatus[403]}: ${err.message}`
            });
        }
        req.user = decoded.data
        next();
    });

}

export default authMiddleware;