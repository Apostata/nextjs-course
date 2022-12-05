import { insertIntoDb, readFromDb } from './../../../helpers/api-util';
import { INewsletter, NewsletterEntity } from '../../../models/newsletter_model';
import { NextApiResponse } from 'next';
import { NextApiHandler, NextApiRequest } from 'next';
import { readFile, writeFile } from '../../../helpers/api-util';
import {v4 as uuidv4 } from 'uuid'
import { emailIsValid } from '../../../helpers/validation_utils';

const postFileNewsletter =(req: NextApiRequest, res: NextApiResponse) =>{
	const {email} = req.body

	const isValidEmail =  emailIsValid(email)
	if(isValidEmail){
		const newNewsletter: INewsletter = {
			id:uuidv4(),
			email
		}
		let newsletters = readFile<INewsletter[]>('newsletters')
		newsletters = [...newsletters, newNewsletter],
		writeFile('newsletters', newsletters)
		
		return res.status(201).json({data:newNewsletter})
	} 
	
	return res.status(email?422:400).json({message:`${email? `${email} is not a valid email!`: 'email must be defined!'} `})
	
}

const postDbNewsletter = async (req: NextApiRequest, res: NextApiResponse) =>{
	const {email} = req.body

	const isValidEmail =  emailIsValid(email)
	if(isValidEmail){
		const newNewsletter: NewsletterEntity = {
			email
		}
		const resDb  = await insertIntoDb('newsletter', newNewsletter)
		if(!(resDb instanceof Error)){

			(newNewsletter as any).id = (newNewsletter as any)._id;
			delete (newNewsletter as any)._id
			return res.status(201).json({data:newNewsletter})
		}
		return res.status(500).json({message:resDb.message})
	}

	return res.status(email?422:400).json({message:`${email? `${email} is not a valid email!`: 'email must be defined!'} `})
	
}


const handler: NextApiHandler = (req, res)=>{
 const methods = {
	// POST:() => postFileNewsletter(req, res)
	POST: ()=>postDbNewsletter(req, res)
 }

 methods[req.method](req, res)

}

export default handler