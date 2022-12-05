import { connectDBCollection } from './db_connection';
import fs from 'fs';
import  path  from 'path';
import { Collection, Document } from 'mongodb';

interface CollectionResAndClose{
	collection: Collection<Document>, 
	close: () => Promise<void>,
}

export const getPath = (filename:string) =>{
	return path.join(process.cwd(), 'data', `${filename}.json`)
}

export const readFile = <T>(filename:string) =>{
	const res = fs.readFileSync(getPath(filename))
	const data:T = JSON.parse(res.toString())
	return data
}

export const writeFile = <T>(filename:string, payload:T) =>{
	const data = JSON.stringify(payload)
	const res = fs.writeFileSync(getPath(filename), data)
}

export const readFromDb = async (colletion: string, params?:any) =>{
	try{
		const resDb =  await connectDBCollection(colletion)
		if(!(resDb instanceof Error)){
			const {collection, close} = resDb;
			const res = (await collection.find(params).sort({_id:-1}).toArray()).map((item)=>{
				const newResp = {...item, id:item._id}
				delete newResp._id
				return newResp
			})
			close()
			return res
		}
		return resDb;
	} catch(e){
		return new Error(`Could't read ${colletion}`)
	}
}

export const readOneFromDb = async (colletion: string, params?:any) =>{
	try{
		const resDb =  await connectDBCollection(colletion)
		if(!(resDb instanceof Error)){
			const {collection, close} = resDb;
			const res = await collection.findOne(params)
			const newResp = {...res, id:res._id}
			delete newResp._id
			close()
			return newResp
		}
		return resDb;
	} catch(e){
		return new Error(`Could't read ${params.toString()} from ${colletion}`)
	}
}


export const insertIntoDb = async <T>(colletion: string, payload:T) =>{
	try{
		const resDb =  await connectDBCollection(colletion)
		if(!(resDb instanceof Error)){
			const {collection, close} = resDb;
			const res = await collection.insertOne(payload)
			close()
			return res
		}
		return resDb;

	} catch(e){
		return new Error(`Could't insert the payload in Collection ${colletion}`)
	}
}

export const returnNullableOrUndefinedParam = (params:Object)=>{

	const nullableParam = Object.keys(params).filter((key:any)=>{
		if(params[key] === null || params[key] === undefined){
			return key
		}
	})
	return nullableParam.join(',')
}