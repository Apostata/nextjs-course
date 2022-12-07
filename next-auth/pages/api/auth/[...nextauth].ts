import { readOneFromDb } from './../../../core/db';
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialProvider from "next-auth/providers/credentials";
import { verifyPassword } from '../../../core/encript';
const {env} = process

export const authOptions: NextAuthOptions = {
	secret: env.SECRET,
	session:{
		strategy:'jwt'
	},
	providers: [ CredentialProvider({
		name:'Credentials',
		credentials:{
			email:{ label:'email', type:'email'},
			password:{label:'password', type:'password'},
		},
		async authorize(credentials, req) {
			const user = await readOneFromDb('users',{email:credentials.email})
			if(!(user instanceof Error)){
				const isValidPass = await verifyPassword(credentials.password, user.password)
				if(isValidPass){
					const {_id, ...newUser} = user
					return {id:_id.toString(), ...newUser}
				}
				throw new Error("invalid credentials!");
				
			}
			throw user;
		},
	})]
}

export default NextAuth(authOptions);