import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,// backend se kaun kaun bat kar skta hai
    credentials: true//
}));// these all are middlewares and like we are running these functions
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

// ✅ Routes after
app.get('/api/jokes', (req, res) => {
    const jokes = [
        { id: 1, joke: "Why do programmers prefer dark mode? Because light attracts bugs." },
        { id: 2, joke: "Why did the developer go broke? Because he used up all his cache." },
        { id: 3, joke: "A SQL query walks into a bar, walks up to two tables and asks... can I join you?" },
        { id: 4, joke: "Why do Java developers wear glasses? Because they don't C#." },
        { id: 5, joke: "How many programmers does it take to change a light bulb? None, that's a hardware problem." }
    ];
    res.json(jokes);  // ✅ res.json() is cleaner than res.send() for arrays/objects
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

export default app;