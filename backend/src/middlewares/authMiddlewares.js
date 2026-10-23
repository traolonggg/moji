import jwt from "jsonwebtoken";
import User from "../models/User.js";

//Authorization- Xac minh user la ai
export const protectedRoute = async (req, res, next) => {
  try {
    //Lay token tu header
    const authHeader = req.headers(["authorization"]);
    const token = authHeader && authHeader.split(" ")[1]; //Bearer<token>
    if (!token) {
      return res.status(401).json({ message: "Khong tim thay access token" });
    }
    //Xac nhan token hop le
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedUser) => {
      console.error(err);

      return res
        .status(403)
        .json({ message: "ACCESS TOKEN het han hoac khong dung" });
    });
    //tim user
    const user = await User.findById(decodedUser.userId).select("-hashedPassword");
    if (!user) {
      return res.status(404).json({ messag: "Nguoi dung khong ton tai" });
    }
    return (req.user = user);
    next();
  } catch (error) {
    console.log("Loi khi xac minh JWT trong middleware", error);
    return res.status(500).json({ message: "Loi he thong" });
  }
};
