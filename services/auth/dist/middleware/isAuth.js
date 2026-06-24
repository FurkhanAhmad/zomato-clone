import jwt from "jsonwebtoken";
const JWT_SECRET = "kkekeke493939ekkrkr";
export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Please Login - No auth header" });
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Please Login - Token missing" });
            return;
        }
        // ✅ Use the constant and verify
        const decodeValue = jwt.verify(token, JWT_SECRET);
        if (!decodeValue || !decodeValue.user) {
            res.status(401).json({ message: "Invalid token payload" });
            return;
        }
        req.user = decodeValue.user;
        next();
    }
    catch (err) {
        console.error("JWT verify error:", err);
        // ✅ Access error types via default import
        if (err instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: "Token expired, please login again" });
        }
        else if (err instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: "Invalid token signature or malformed token" });
        }
        else {
            res.status(500).json({ message: "Please Login - jwt error" });
        }
    }
};
