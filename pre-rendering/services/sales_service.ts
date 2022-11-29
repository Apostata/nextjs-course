import { SalesfromFirebase } from './../models/sales_models';
import useSWR from "swr";
import { Sale } from "../models/sales_models";
import { useQuery } from 'react-query';

export const fetchSales = ()=>{
	return fetch('https://next-course-dd8a9-default-rtdb.firebaseio.com/sales.json');
}

export const getSales = async ()=>{
	try{
	const response = await fetch('https://next-course-dd8a9-default-rtdb.firebaseio.com/sales.json');
	const res = await response.json()
	const sales : Sale[] = Object.keys(res).map((key)=>(
		new Sale({
			id:key, 
			username: res[key].username, 
			volume: res[key].volume,
		})
	))
	return sales;
	} catch(e){
		return new Error("Error on get sales");
	}
}