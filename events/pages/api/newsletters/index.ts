import { INewsletter } from '../../../models/newsletter_model';
import { NextApiResponse } from 'next';
import { NextApiHandler, NextApiRequest } from 'next';
import { readFile, writeFile } from '../../../helpers/api-util';
import {v4 as uuidv4 } from 'uuid'

const postFileNewsletter =(req: NextApiRequest, res: NextApiResponse) =>{
	const {email} = req.body
	const newNewsletter: INewsletter = {
		id:uuidv4(),
		email
	}
	let newsletters = readFile<INewsletter[]>('newsletters')
	newsletters = [...newsletters, newNewsletter],
	writeFile('newsletters', newsletters)
	res.status(201).json({data:newNewsletter})
}

const handler: NextApiHandler = (req, res)=>{
 const methods = {
	POST:() => postFileNewsletter(req, res)
 }

 methods[req.method](req, res)

}

export default handler