import { ObjectId } from "mongodb"
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { readFile, readFromDb } from "../../../../helpers/api-util"
import { IComment } from "../../../../models/coment_model"

const getFileComment = (req: NextApiRequest, res: NextApiResponse) =>{
	const {eventId} = req.query
	const comment = readFile<IComment[]>('comments').filter(item=>item.eventId === eventId)
	return res.status(200).json({data:comment})
}

const getDbCommentsByEventId =async (req: NextApiRequest, res: NextApiResponse) =>{
	const {eventId} = req.query
	const resDb = await readFromDb('comments', {eventId:eventId})
	if(!(resDb instanceof Error)){
		return res.status(200).json({data:resDb})
	}
	return res.status(500).json({message:resDb.message})
}	

const handler: NextApiHandler = (req, res)=>{
	const methods = {
	   GET:() => getDbCommentsByEventId(req, res),
	}
   
	methods[req.method](req, res)
   
   }
   
   export default handler