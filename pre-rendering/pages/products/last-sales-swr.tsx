import React from 'react'
import { getSalesWithSWR } from '../../helpers/swr/sales/sales_queries'

 const LastSales =  () =>{
	const {data:sales, error, isValidating:loading} =  getSalesWithSWR();


	if(!sales){
		return <p>No data yet!</p>
	}

	if(loading){
		return<p>Loading ...</p>
	}
	
	if(error){
		return <p>Erro!</p>
	}

	if(sales){
		return (
			<ul>{sales.map((sale)=><li key={sale.id}>{sale.username} - {sale.volume}</li>)}</ul>
		)
	}
	
	

	


}
export default LastSales;