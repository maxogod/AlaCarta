import express from 'express'
import dotenv from 'dotenv'

const app = express()
dotenv.config()
const PORT = process.env.DEV_PORT || 8000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});