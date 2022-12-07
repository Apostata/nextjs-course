import {compare, hash} from 'bcryptjs'

export const hashPassword = async (password:string)  =>{
	const hashPass = await hash(password, 12)
	return hashPass
}

export const verifyPassword = async(password:string, ecryptedPassword:string) =>{
	const isSame = await compare(password, ecryptedPassword)
	return isSame
}