
export default function loggerMiddleware(req, _res, next) {
    //logger4.info(`[${req.method}] ${req.originalUrl}`)
    next();
}