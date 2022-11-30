import { GetStaticProps } from 'next'
import React, { PropsWithChildren, useState } from 'react'
import { Feedback } from '../../models/feedback_model'
import { readFeedbacks } from '../api/feedbacks/'

interface Props extends PropsWithChildren{
	feedbacks: Feedback[] | null
}

const FeedbackPage = ({feedbacks}:Props) => {
	const [feedback, setFeedback] = useState<Feedback|null>(null)

	const loadFeedBack = async (id:string)=>{
		const resp = await fetch(`/api/feedbacks/${id}`)
		const data = await resp.json()
		console.log(data.feedback)
		setFeedback(data.feedback)
	  }
  return (
	<>
	{feedbacks &&
		<ul> { feedbacks.map((feedback)=>(
			<li onClick={()=>loadFeedBack(feedback.id)} key={feedback.id} >{feedback.id} - {feedback.email} - {feedback.text}</li>
			)
		)}</ul>
	}
	
		{feedback && <><hr/><div>Detalhes de {feedback.id} - <p>{feedback.email}:{feedback.text}</p></div></> }

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