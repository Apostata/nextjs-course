import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { readFile } from "../../../../helpers/api-util"
import { IComment } from "../../../../models/coment_model"

const getFileCommentsFromEventId = (req: NextApiRequest, res: NextApiResponse) =>{
	const {eventId} = req.query
	const comments = readFile<IComment[]>('comments').filter(item=>item.eventId === eventId)
	res.status(200).json({data:comments})
}

const handler: NextApiHandler = (req, res)=>{
	const methods = {
	   GET:() => getFileCommentsFromEventId(req, res),
	}
   
	methods[req.method](req, res)
   
   }
   
   export default handler