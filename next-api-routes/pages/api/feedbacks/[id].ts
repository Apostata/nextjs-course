import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import { NextApiHandler } from 'next';
import { readFeedbacks } from '../feedbacks';

const feedbackGetSingle = (req: NextApiRequest, res: NextApiResponse)=>{
	const {id} = req.query
	const feedbacks = readFeedbacks()
	const feedback = feedbacks.find((item:any)=>item.id === id)
	res.status(200).json({feedback})
}

 const handler: NextApiHandler = (req, res)=>{
	const methods= {
		GET: ()=> feedbackGetSingle(req, res)
	};
	methods[req.method](req, res)
}

export default handler