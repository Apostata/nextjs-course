import path from "path";
import fs from 'fs/promises'
import { Product } from "../models/product_model";

type Data = {products:Product[]}

const readJsonFile = async ()=>{
	const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
	const jsonData = await fs.readFile(filePath)
	const data : Data = JSON.parse(jsonData.toString());
	return data;
}

export const getProductsFromJsonFile = async () =>{
	return await readJsonFile()
}

export const getProductFromByIdFromJsonFile = async (id :string)=>{
	const data  = await readJsonFile()
	const product = data.products.find((product)=>product.id === id)
	return product;
}