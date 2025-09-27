import jwt from "jsonwebtoken"

// Funtion to gen token
export const generateToken = (userId) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET);
    return token;
}