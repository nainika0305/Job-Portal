import jwt from "jsonwebtoken";

// next sends to the next route when everything is ok 
const isAuthenticated = async (req, res, next) => {
    try {
        // request for cookie, token 
        const token = req.cookies.token;
        // unauthorized user 
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }

        // decode the token if exists 
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        };

        // Everything works, go to next 
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;