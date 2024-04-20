import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.get("Authorization")?.split(" ")[1];
  let decodedToken;
  if (!token) {
    res.send({
      message: "No Token is Set",
      status: "Error",
    });
  }
  try {
    decodedToken = jwt.verify(token, "mySuperSecret");
  } catch (error) {
    console.log(error);
  }
  if (decodedToken) {
    req.userId = decodedToken.userId;
    console.log(req.userId);
    next();
  } else {
    res.send({
      message: "Invalid Token",
      status: "Error",
    });
  }
};

export default auth;
