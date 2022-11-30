import { writeFile } from './../../../helpers/api-util';
import { IComment } from './../../../models/coment_model';
import { NextApiResponse } from 'next';
import { NextApiHandler, NextApiRequest } from 'next';
import { readFile } from '../../../helpers/api-util';
import {v4 as uuidv4 } from 'uuid'

const getFileComments = (req: NextApiRequest, res: NextApiResponse) =>{
	const comments = readFile<IComment[]>('comments')
	res.status(200).json({data:comments})
}

const postFileComment =(req: NextApiRequest, res: NextApiResponse) =>{
	const {email, name, text, eventId} = req.body
	const newComment: IComment = {
		id:uuidv4(),
		email,
		name,
		text,
		eventId
	}
	const comments = readFile<IComment[]>('comments')
	comments.push(newComment)
	writeFile('comments', comments)
	res.status(201).json({data:newComment})
}

const handler: NextApiHandler = (req, res)=>{
 const methods = {
	GET:() => getFileComments(req, res),
	POST:() => postFileComment(req, res)
 }

 methods[req.method](req, res)

}

export default handler