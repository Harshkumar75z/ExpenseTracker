import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        status: false,
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode || !decode.userId) {
      return res.status(401).json({
        message: "Invalid or malformed token",
        status: false,
      });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired",
        status: false,
      });
    }

    return res.status(401).json({
      message: "Invalid token",
      status: false,
    });
  }
};










// const isAuthenticated = async (req,res,next) => {
//     try {
//         const token = req.cookies?.token;
//         if(!token){
//             return res.status(401).json({
//                 message : "User not Authenticated",
//                 status : false
//             })
//         }
//         const decode = jwt.verify(token, process.env.JWT_SECRET)
//         if(!decode){
//             return res.status(401).json({
//                 message : "invalid token",
//                 status : false
//             })
//         };
//         req.id = decode.userId;
//         console.log("auth", req.id);
//         next();
//     } catch (error) {
//         console.log(error);
//     }
// }

export default isAuthenticated;