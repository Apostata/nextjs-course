import { ChangePass } from './../models/change_passwords_model';
import { Signup } from './../models/signup_model';
import { useMutation } from 'react-query';

type ErrorCallback = <T>(error: string | Event, variables: T, context: number) => void | Promise<any>
type SuccessCallback = <T>(data: any, variables: T, context: number) => void | Promise<any>


const postSignUp = async (signup:Signup) =>{
	try{
		const response = await fetch('/api/auth/signup', {
			method:'POST',
			body: JSON.stringify(signup),
			headers:{
				'Content-Type': "application/json"
			}
		})
		const data = await response.json()
		if(response.ok){
			return data;
		}
		throw new Error('Could not Resgister user!')
	} catch(e){
		throw new Error(e)
	}
}

const patchPassword = async (passData:ChangePass) =>{
	try{
		const response = await fetch('/api/users/change-password', {
			method:'PATCH',
			body: JSON.stringify(passData),
			headers:{
				'Content-Type': "application/json"
			}
		})
		const data = await response.json()
		if(response.ok){
			return data;
		}
		throw new Error('Could not update user\'s password!')
	} catch(e){
		throw new Error(e)
	}
}

export const signUpReactQuery = (onError?:ErrorCallback, onSuccess?:SuccessCallback) =>{
	const {mutate:signUp, error, isLoading, isSuccess, data:res} = useMutation(postSignUp, {onError:onError, onSuccess:onSuccess})
	return {signUp, error, isLoading, isSuccess, data:res?.data}
}

export const updatePassReactQuery = (onError?:ErrorCallback, onSuccess?:SuccessCallback) =>{
	const {mutate:changePassword, error, isLoading, isSuccess, data:res} = useMutation(patchPassword, {onError:onError, onSuccess:onSuccess})
	return {changePassword, error, isLoading, isSuccess, data:res?.data}
}
