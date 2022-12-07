import { MongoClient, Collection, Document } from 'mongodb';

const {env} = process;

export const connectToDb = async () =>{
	try{
		const client = await MongoClient.connect(`mongodb+srv://${env.DB_USER}:${env.DB_PASS}@teste.udyh4md.mongodb.net/?retryWrites=true&w=majority`)
		return client
	}catch(e){
		return new Error('Failed to connect to the Database!')
	}
}

interface ConnectCollection {
    collection: Collection<Document>;
    close: {
        (): Promise<void>;
    };
}

export const connectToCollection = async (collectionName:string):Promise<Error | ConnectCollection>=>{
	try{
		const client = await connectToDb()
		if(!(client instanceof Error)){
			const db = client.db()
			const collection = db.collection(collectionName)
			const close = async ()=>client.close()
			return {collection, close}
		}
	}catch(e){
		return new Error('Failed to connect to the Database collection')
	}
}

export const readAllFromDb = async (collection:string, params?:any)=>{
	try{
		const con = await connectToCollection(collection)
		if(!(con instanceof Error)){
			const {collection, close} = con
			const res  = await collection.find(params).sort({_id:-1}).toArray()
			await close()
			return res
		}
	}
	catch(e){
		return new Error('Failed to read from db')
	}	
}

export const readOneFromDb = async (collection:string, params?:any, closeConnection=true)=>{
	try{
		const con = await connectToCollection(collection)
		if(!(con instanceof Error)){
			const {collection, close} = con
			const res  = await collection.findOne(params)
			closeConnection && await close()
			return res
		}
	}
	catch(e){
		return new Error('Failed to read from db')
	}	
}

export const writeInDb = async <T>(collection:string, data:T)=>{
	try{const con = await connectToCollection(collection)
	if(!(con instanceof Error)){
		const {collection, close} = con
		const res  = await collection.insertOne(data)
		await close()
		return res
	}}
	catch(e){
		return new Error('Failed to write into db')
	}
}

export const updateInDb = async <T>(collection:string, data:T, params:any)=>{
	try{const con = await connectToCollection(collection)
	if(!(con instanceof Error)){
		const {collection, close} = con
		const res  = await collection.updateOne(params, {$set:data})
		await close()
		return res
	}}
	catch(e){
		return new Error('Failed to update into db')
	}
}