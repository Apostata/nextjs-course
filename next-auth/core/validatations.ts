
export const required = (value:string) =>{
	return value?.trim() !== ''
}
export const emailIsValid = (email:string)=>{
	return required(email)? email?.match(/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/)?true:false: false
}