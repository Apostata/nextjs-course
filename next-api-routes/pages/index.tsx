import { FC, FormEvent, useRef, useState } from "react";
import FeedbackPage from "./feedback";

const HomePage: FC = () => {
  const emailRef = useRef<HTMLInputElement>();
  const feedbackRef = useRef<HTMLTextAreaElement>()
  const [feedbacks, setFeedbacks] = useState(null)

  const onSubmit = async (event:FormEvent)=>{
    event.preventDefault();
    const email = emailRef.current.value
    const feedback = feedbackRef.current.value

    const resp = await fetch('/api/feedbacks',{
      method: 'POST',
      body:JSON.stringify({email, text:feedback}),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    emailRef.current.value = ''
    feedbackRef.current.value = ''
  }

  const loadFeedBack = async ()=>{
    const resp = await fetch('/api/feedbacks')
    const data = await resp.json()
    setFeedbacks(data)
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Your Email</label>
          <input ref={emailRef} type='email' id='email' />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea ref={feedbackRef} id='feedback' rows={5}></textarea>
        </div>
        <button>Send feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedBack}>Load feedback</button>
      <FeedbackPage feedbacks={feedbacks}/>
    </div>
  );
}

export default HomePage;
