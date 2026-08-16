import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth'
import helmet from 'helmet'

dotenv.config()

const app = express()
app.use(helmet())

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())

app.use('/api/auth', authRouter)

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`)
})
