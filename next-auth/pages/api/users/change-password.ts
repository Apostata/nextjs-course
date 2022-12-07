import { hashPassword } from '../../../core/encript';
import { readOneFromDb, updateInDb } from '../../../core/db';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { verifyPassword } from '../../../core/encript';
import { hash } from 'bcryptjs';

const changePassword = async(req:NextApiRequest, res:NextApiResponse) =>{
	const session = await getSession({req:req})
	if(!session){
		return res.status(401).json({message:'You shall not pass!'})
	}

	const {email} = session.user
	const {oldPassword, newPassword} = req.body

	if(!oldPassword || !newPassword){
		return res.status(422).json({message:'current and new passwords must be defined!'})
	}

	const dbUser = await readOneFromDb('users',{email:email})
	if(!(dbUser instanceof Error)){
		const isValidOldPassword = verifyPassword(oldPassword, dbUser.password)

		if(!isValidOldPassword){
			return res.status(403).json({message:'Invalid credentials!'})
		}
		const hashPassword = await hash(newPassword, 12)
		const result = await updateInDb('users', {password:hashPassword}, {email:email})

		if(!(result instanceof Error)){
			return res.status(200).json({message:'Password updated!'})
		}
		return res.status(500).json({message:result})
	}
	return res.status(404).json({message:dbUser})
}

const handler:NextApiHandler = (req, res)=>{
	const methods = {
		PATCH: ()=> changePassword(req, res)
	}

	return methods?.[req.method]()
}

export default handler