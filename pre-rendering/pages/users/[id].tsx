import { GetServerSideProps } from 'next'
import React from 'react'

interface Props{
	id: string
}

const UserDetails = (props:Props) =>{
	const {id} = props;
  return (
	<div>{id}</div>
  )
}

export default UserDetails

export const getServerSideProps : GetServerSideProps = async (context)=>{
	const {params:{id}} = context;

	return {
		props:{
			id: `user-id-${id}`,
		}
	}
}