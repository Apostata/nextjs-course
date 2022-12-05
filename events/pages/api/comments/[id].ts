import { ObjectId } from 'mongodb';
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { readFile, readOneFromDb } from "../../../helpers/api-util"
import { IComment } from "../../../models/coment_model"

const getFileComment = (req: NextApiRequest, res: NextApiResponse) =>{
	const {id} = req.query
	const comment = readFile<IComment[]>('comments').find(item=>item.id === id)
	res.status(200).json({data:comment})
}

const getDbCommentsById =async (req: NextApiRequest, res: NextApiResponse) =>{
	const {id} = req.query
	const resDb = await readOneFromDb('comments', {_id: new ObjectId(id as string)})
	if(!(resDb instanceof Error)){
		const data = await readOneFromDb('comments', {_id: new ObjectId(id as string)})
		return res.status(200).json({data:data})
	}
	return res.status(500).json({message:resDb})
}	

const handler: NextApiHandler = (req, res)=>{
	const methods = {
	   GET:() => getDbCommentsById(req, res),
	}
   
	methods[req.method](req, res)
   
   }
   
   export default handler