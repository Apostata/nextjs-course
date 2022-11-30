import  fs  from 'fs';
import  path  from 'path';
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { Feedback } from '../../../models/feedback_model';

const filePath = ()=>{
	return path.join(process.cwd(), 'data', 'feedback.json')
}

export const readFeedbacks = () : Feedback[]=>{
	const currentFileData = fs.readFileSync(filePath())
	const data :Feedback[] = JSON.parse(currentFileData.toString())
	return data;
}

const writeFeedback = (data:Feedback[], newFeedBack: Feedback) =>{
	data.push(newFeedBack)
	fs.writeFileSync(filePath(), JSON.stringify(data))
}


const feedbackGet = (req: NextApiRequest, res: NextApiResponse)=>{
	const data = readFeedbacks()
	return res.status(200).json(data)
}

const feedbackPost = (req: NextApiRequest, res: NextApiResponse)=>{

	const {email, text} = req.body;
		const newFeedBack: Feedback = {
			id: new Date().toISOString(),
			email,
			text
		}

		// store into file or database
		const data = readFeedbacks()
		writeFeedback(data, newFeedBack)

		return res.status(201).json({message:'Success!', feedback: newFeedBack})
}

const handler :NextApiHandler = (req, res)=>{
	const methods ={
		GET: ()=>feedbackGet(req, res),
		POST: ()=>feedbackPost(req, res)
	}
	// 	console.log(req.method)
	methods?.[`${req.method}`](req, res)
}

export default handler;


