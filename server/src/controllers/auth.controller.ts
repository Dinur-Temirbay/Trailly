import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const JWT_SECRET = process.env.JWT_SECRET!

export async function register(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
	} catch (err) {}
}

export async function login(req: Request, res: Response, next: NextFunction) {
	try {
	} catch (err) {}
}

export async function getMe(req: Request, res: Response, next: NextFunction) {
	try {
	} catch (err) {}
}
