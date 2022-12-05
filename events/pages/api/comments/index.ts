import { insertIntoDb, returnNullableOrUndefinedParam, writeFile, readFromDb } from './../../../helpers/api-util';
import { IComment, CommentEntity } from './../../../models/coment_model';
import { NextApiResponse } from 'next';
import { NextApiHandler, NextApiRequest } from 'next';
import { readFile } from '../../../helpers/api-util';
import {v4 as uuidv4 } from 'uuid'
import { emailIsValid } from '../../../helpers/validation_utils';

const getFileComments = (req: NextApiRequest, res: NextApiResponse) =>{
	const comments = readFile<IComment[]>('comments')
	return res.status(200).json({data:comments})
}

const postFileComment =(req: NextApiRequest, res: NextApiResponse) =>{
	const {email, name, text, eventId} = req.body
	const isSomeParamNullOrUndefined = returnNullableOrUndefinedParam({email:email, name:name, text:text, eventId:eventId,})
	if(!isSomeParamNullOrUndefined){
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
		return res.status(201).json({data:newComment})
	}
	return res.status(400).json({message:`Param${isSomeParamNullOrUndefined.length>1?'s':''} ${isSomeParamNullOrUndefined} must be defined`})
}

const postDbComment = async (req: NextApiRequest, res: NextApiResponse) =>{
	const {email, name, text, eventId} = req.body
	const isSomeParamNullOrUndefined = returnNullableOrUndefinedParam({email:email, name:name, text:text, eventId:eventId,})
	if(!isSomeParamNullOrUndefined){
		const newComment: CommentEntity = {
			email,
			name,
			text,
			eventId
		}
		const resDb = await insertIntoDb('comments', newComment);
		if(!(resDb instanceof Error)){
			(newComment as any).id = (newComment as any)._id;
			delete (newComment as any)._id
			return res.status(201).json({data:newComment})
		}
		return res.status(500).json({message:resDb.message})

	}
	
}

const getDbComments =async (req: NextApiRequest, res: NextApiResponse) =>{
	const resDb = await readFromDb('comments')
	if(!(resDb instanceof Error)){
		return res.status(200).json({data:resDb})
	}
	else{
		return res.status(500).json({message:resDb.message})
	}
}	

const handler: NextApiHandler = (req, res)=>{
 const methods = {
	GET:() => getDbComments(req, res),
	// POST:() => postFileComment(req, res)
	POST:()=>postDbComment(req, res)
 }

 methods[req.method](req, res)

}

export default handler