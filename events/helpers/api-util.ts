import fs from 'fs';
import  path  from 'path';

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