import dotenv from 'dotenv'
import app from './app.js'
import connect from './database/db.databse.js'

const run = async () => {
    try {
        await connect()
        app.listen(process.env.PORT || 3000, () => {
            console.log("Server running on port " + process.env.PORT)
        })
    } catch(e) {
        console.error(e)
    }
}
app.get('/api/jokes', (req, res) => {
    const jokes = [
        { id: 1, joke: "Why do programmers prefer dark mode? Because light attracts bugs." },
        { id: 2, joke: "Why did the developer go broke? Because he used up all his cache." },
        { id: 3, joke: "A SQL query walks into a bar, walks up to two tables and asks... can I join you?" },
        { id: 4, joke: "Why do Java developers wear glasses? Because they don't C#." },
        { id: 5, joke: "How many programmers does it take to change a light bulb? None, that's a hardware problem." }
    ]
    res.status(200).json(jokes)
})
run()