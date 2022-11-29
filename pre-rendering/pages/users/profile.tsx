import { GetServerSideProps } from 'next/types'
import React from 'react'

interface Props{
	userName: string
}

 const UserProfile = (props: Props) => {
	const {userName} = props;
  return (
	<div>{userName}</div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context)=>{

	const { params, req, res } = context;

	return {
		props:{
			userName: 'Rene'
		}
	}
}

export default UserProfile;
