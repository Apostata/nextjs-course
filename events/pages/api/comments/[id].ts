import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { readFile } from "../../../helpers/api-util"
import { IComment } from "../../../models/coment_model"

const getFileComment = (req: NextApiRequest, res: NextApiResponse) =>{
	const {id} = req.query
	const comment = readFile<IComment[]>('comments').find(item=>item.id === id)
	res.status(200).json({data:comment})
}

const handler: NextApiHandler = (req, res)=>{
	const methods = {
	   GET:() => getFileComment(req, res),
	}
   
	methods[req.method](req, res)
   
   }
   
   export default handler