import { GetStaticProps } from 'next'
import React from 'react'
import { getSalesWithReactQuery } from '../../helpers/react-queries/sales-queries'
import { getSales } from '../../services/sales_service'
import { Sale, SaleToJson } from '../../models/sales_models'

interface Props{
	sales: Sale[]
	error: string | null
}

 const LastSales =  (props:Props) =>{

	const {data: frontSales, error:frontError, isLoading:loading} =  getSalesWithReactQuery(true)
	const sales = frontSales ? frontSales :  props.sales
	const error = frontError ? props.sales : props.error

	if(error){
		return <p>Erro!</p>
	}
	
	if(sales){
		return (
			<ul>{sales.map((sale)=><li key={sale.id}>{sale.username} - {sale.volume}</li>)}</ul>
		)
	}
	
	
	if(loading && sales?.length <1){
		return<p>Loading ...</p>
	}

	if(!loading && sales?.length <1){
		return <p>No data yet!</p>
	}
	
}
export default LastSales;

export const getStaticProps: GetStaticProps = async(context)=>{
	const res = await getSales()
	const isSales = (res as Sale[]).every((item)=> item instanceof Sale)
	const isError = res instanceof Error
	
	return {
		props:{
			sales: isSales? (res as Sale[]).map((sale)=>SaleToJson(sale)) : ([] as Sale[]),
			error: isError? (res as Error).message : null
		}, 
		// revalidate: 10
	}
}