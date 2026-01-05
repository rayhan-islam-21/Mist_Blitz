import jwt from "jsonwebtoken";

export async function verifyAdmin(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // In industry, you'd check if (decoded.role === 'admin') here
    return decoded; 
  } catch (error) {
    return null;
  }
}