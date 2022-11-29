export interface SalesEntity{
	username: string,
	volume: number
}

export class Sale implements SalesEntity {
	id: string
	username: string
	volume: number
	constructor({id, username, volume}){
		this.id = id,
		this.username = username,
		this.volume = volume
	}
}


export const SalesfromFirebase = (firebaseJson: any) =>{
	const sales = firebaseJson && Object.keys(firebaseJson).map((key)=>(
		new Sale({
			id:key, 
			username: firebaseJson[key].username, 
			volume: firebaseJson[key].volume,
		})
	))
	return sales;
}

export const SaleToJson = (sale: Sale) =>{
	return ({
		id: sale.id,
		username: sale.username,
		volume: sale.volume
	})
}