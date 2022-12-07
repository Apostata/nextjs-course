import { NextApiRequest, NextApiResponse } from 'next';
import { writeInDb, readOneFromDb } from './../../../core/db';
import { NextApiHandler } from 'next';
import { Signup } from '../../../models/signup_model';
import { emailIsValid } from '../../../core/validatations';
import { hash } from 'bcryptjs';

interface UserCreated extends Signup{
	_id:string
}

const singUpUser = async(req: NextApiRequest, res: NextApiResponse)=>{
	const {email, password} = req.body;
	
	if(!email || !password){
		return res.status(400).json({messagem:`email and password must be provided!`})
	}

	if(!emailIsValid(email)){
		return res.status(422).json({messagem:`${email} is not a valid email!`})
	}

	const allreadInDb = await readOneFromDb('users',{email:email})

	if(allreadInDb){
		return res.status(409).json({message: 'user is already registered!'})
	}
	const hashPass =  await hash(password, 12)
	const newData:Signup = {email, password:hashPass}
	const result = await writeInDb<Signup>('users',newData )

	if(!(result instanceof Error)){
		const {_id, password, ...responseData} = newData as UserCreated
		return res.status(201).json({...responseData, id:_id});
	} 

	return res.status(500).json({message:result})
		
	
}

const handler:NextApiHandler = (req, res)=>{
	const methods ={
		POST:()=> singUpUser(req, res)
	}
	return methods?.[req.method](req, res)
}

export default handler