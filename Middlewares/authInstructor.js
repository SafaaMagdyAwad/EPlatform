import jwt from "jsonwebtoken";

const authInstructor = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoded);

    if (decoded.role !== "instructor") {
      return res.status(403).json({ message: "instructor access only" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authInstructor;
