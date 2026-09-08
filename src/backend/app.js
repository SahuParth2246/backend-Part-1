// app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// BUG WAS: logged had (req,res) with no next() and was sending response
// that means every single request got "logged in" as response
// nothing after it ever ran
// FIX: middleware must have (req,res,next) and call next() to pass control forward
const logged = function(req, res, next) {
    console.log("request came in:", req.method, req.url);
    next();
}

app.use(logged);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

//routes import
import userRoutes from "./routes/user.routes.js";

//routes declaration
app.use("/api/v1/users", userRoutes);

// Error middleware must be registered after routes. Errors passed with `next(err)`
// from asyncHandler, Multer, or a controller arrive here as one JSON response.
app.use((err, req, res, next) => {
    // If a controller already sent a response, let Express finish handling the error.
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal server error",
        errors: err.errors || [],
        data: null,
    });
});


// BUG WAS: cookieValidator(res.cookies) → res is the response object, not request
// cookies come FROM the request → req.cookies
// also cookieValidator should follow (req,res,next) shape
// removed for now — not needed until auth is built
// will be added back as auth.middleware.js in the proper flow

export default app;
