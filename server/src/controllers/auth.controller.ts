import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma'
import { registerSchema, loginSchema } from '../schemas/auth.schema'

const JWT_SECRET = process.env.JWT_SECRET!

export async function register(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const parsed = registerSchema.safeParse(req.body)
		if (!parsed.success) {
			return res.status(400).json({ error: parsed.error.flatten() })
		}

		const { email, password, name } = parsed.data

		const existing = await prisma.user.findUnique({ where: { email } })
		if (existing) {
			return res.status(409).json({ error: 'Email already registered' })
		}

		const passwordHash = await bcrypt.hash(password, 10)
		const user = await prisma.user.create({
			data: { email, passwordHash, name },
		})

		const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

		res.status(201).json({
			token,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				avatarUrl: user.avatarUrl,
			},
		})
	} catch (err) {
		next(err)
	}
}

export async function login(req: Request, res: Response, next: NextFunction) {
	try {
		const parsed = loginSchema.safeParse(req.body)
		if (!parsed.success) {
			return res.status(400).json({ error: parsed.error.flatten() })
		}

		const { email, password } = parsed.data

		const user = await prisma.user.findUnique({ where: { email } })
		if (!user) {
			return res.status(401).json({ error: 'Invalid credentials' })
		}

		const valid = await bcrypt.compare(password, user.passwordHash)
		if (!valid) {
			return res.status(401).json({ error: 'Invalid credentials' })
		}

		const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

		res.json({
			token,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				avatarUrl: user.avatarUrl,
			},
		})
	} catch (err) {
		next(err)
	}
}

export async function getMe(
	req: Request & { userId?: string },
	res: Response,
	next: NextFunction,
) {
	try {
		const user = await prisma.user.findUnique({
			where: { id: req.userId },
			select: {
				id: true,
				email: true,
				name: true,
				avatarUrl: true,
				createdAt: true,
			},
		})

		if (!user) {
			return res.status(404).json({ error: 'User not found' })
		}

		res.json({ user })
	} catch (err) {
		next(err)
	}
}
