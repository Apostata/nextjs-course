import { MongoClient } from "mongodb";

const {env} = process

export const connectToDb = ()=>{
	// `mongodb+srv://${env.DB_USER}:${env.DB_PASS}@teste.udyh4md.mongodb.net/?retryWrites=true&w=majority`
	const client = MongoClient.connect(`mongodb+srv://${env.DB_USER}:${env.DB_PASS}@teste.udyh4md.mongodb.net/?retryWrites=true&w=majority`)
	return client;
}

export const connectDBCollection = async (colletion: string)  =>{
	let dbClient:MongoClient;

	try{
		dbClient = await connectToDb()
		const db = dbClient.db()
		const collection = db.collection(colletion)
		return {collection, close:()=>dbClient.close()}
	} catch(e){
		return new Error(`Could't could't connect to database`)
	}

	
}