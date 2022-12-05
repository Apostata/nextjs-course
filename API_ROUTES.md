# API ROUTES (Backend Nextjs)
criar Rest apis dentro do nextjs

criar uma pasta `api`(nome exato) dentro da pasta `pages`

todos arquivos na pasta `api` não serão componentes React:

## Criando primeiro endpoint no next:
vamos criar o arquivo `/next-api-routes/pages/api/feedback.ts` 
```ts
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"

const handler :NextApiHandler = (req:NextApiRequest, res:NextApiResponse)=>{
	res.status(200).json({
		message:'This works'
	})
}

export default handler;

```

## Criando outros metodos alem do GET

```ts
import  fs  from 'fs';
import  path  from 'path';
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"

const filePath = ()=>{
	return path.join(process.cwd(), 'data', 'feedback.json')
}

export const readFeedbacks = ()=>{ // usada no front e no back
	const currentFileData = fs.readFileSync(filePath())
	const data = JSON.parse(currentFileData.toString())
	return data;
}

const writeFeedback = (data, newFeedBack) =>{
	data.push(newFeedBack)
	fs.writeFileSync(filePath(), JSON.stringify(data))
}


const feedbackGet = (req: NextApiRequest, res: NextApiResponse)=>{ 
	const data = readFeedbacks()
	return res.status(200).json(data)
}

const feedbackPost = (req: NextApiRequest, res: NextApiResponse)=>{

	const {email, text} = req.body;
		const newFeedBack = {
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



```

## Using API routes to pre-rendering pages
Como o back e o front estão no mesmo sevidor, podemos chamar diretamente a função que lê o arquivo ou base de dados:
no caso abaixo a função `readFeedbacks()` também é usada na em na api route do feedback

```tsx
import { GetStaticProps } from 'next'
import React, { PropsWithChildren } from 'react'
import { Feedback } from '../../models/feedback_model'
import { readFeedbacks } from '../api/feedback'

interface Props extends PropsWithChildren{
	feedbacks: Feedback[] | null
}

const FeedbackPage = ({feedbacks}:Props) => {
  return (
	<>
	{feedbacks &&
		<ul> { feedbacks.map((feedback)=>(
			<li key={feedback.id} >{feedback.id} - {feedback.email} - {feedback.text}</li>
			)
		)}</ul>
	}
	</>
  )
}

export const getStaticProps:GetStaticProps = async (context)=>{
	const feedbacks =  readFeedbacks()
	return{
		props: {
			feedbacks
		}
	}
}

export default FeedbackPage
```

## Dynamic API routes
Seguindo o padrão de rotas definidos pelo framework, podemos usar ma mesma lógica visto que as rotas ficam na pasta `/pages/api/`
```ts
...
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
```