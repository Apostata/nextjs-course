import useSWR from "swr"
import { SalesfromFirebase } from "../../../models/sales_models"
import { fetchSales } from "../../../services/sales_service"

export const getSalesWithSWR = ()=>{
	const {data, error, isValidating} =useSWR('https://next-course-dd8a9-default-rtdb.firebaseio.com/sales.json', async ()=>{
		const res = await fetchSales()
		return SalesfromFirebase(await res.json())
	})
	return {data, error, isValidating}
}
