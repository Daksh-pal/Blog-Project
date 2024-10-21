import jwt from "jsonwebtoken";

const authenticateUser = async( req, res, next ) => {
    try {
        const authHeader = req?.headers?.authorization;
        if(!authHeader) return res.sendStatus(401);

        const token = authHeader.split(" ")[1];
        if(!token) res.sendStatus(401);

        jwt.verify(token , process.env.JWT_KEY, (err , user) => {
            if(err){
                return res.status(401).json({error : "Error in authentication middleware"})
            }
            req.userId = user.id;
            next();
        })
    } catch (error) {
        console.log("error >>> ", e);
    }
}

export default authenticateUser