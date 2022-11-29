import { useQuery } from "react-query"
import { SalesfromFirebase } from "../../models/sales_models"
import { fetchSales } from "../../services/sales_service"

export const getSalesWithReactQuery =  (enabled:boolean)=>{
	const {data, error, isLoading } = useQuery('getSales', async()=> {
		const res = await fetchSales()
		return await res.json()
	}, {
		refetchOnWindowFocus: false,
		enabled,
		select:((data)=>{
			return SalesfromFirebase(data)
		})
	})
	return {data, error, isLoading}
}