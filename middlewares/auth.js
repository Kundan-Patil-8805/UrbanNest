
// const jwt = require("jsonwebtoken");

// const User = require("../model/user.js");

// const verifyJwt = asyncHandler(async (req, res, next) => {
//   try {
//     // Use authorization header for mobile apps and cookies for web apps
//     const token =
//       req.cookies.accessToken || req.headers["authorization"]?.replace("Bearer ", "");

//     if (!token) {
//       throw new ApiError(401, "Unauthorized request");
//     }

//     // Verify the token
//     let decodedToken;
//     try {
//       decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     } catch (error) {
//       if (error.name === "TokenExpiredError") {
//         throw new ApiError(401, "Access token has expired");
//       }
//       throw new ApiError(401, "Invalid access token");
//     }

//     // Find user associated with the token
//     const user = await User.findById(decodedToken._id).select("-password -refreshToken");

//     if (!user) {
//       throw new ApiError(404, "Invalid access token");
//     }

//     // Attach user to the request object
//     req.user = user;
//     next();
//   } catch (error) {
//     // Handle errors and send proper response
//     throw new ApiError(401, error?.message || "Invalid access token");
//   }
// });

// module.exports = { verifyJwt };
