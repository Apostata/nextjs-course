import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface INotification{
	title:string,
	message:string,
	status: 'pending' | 'success' | 'error'
}

interface INotificationContextValue{
	notification: null | INotification,
	showNotification: (notification: INotification)=> void
	hideNotification: () => void
}

const NotificationContext = createContext<INotificationContextValue>({
	notification: null,
	showNotification:()=>{},
	hideNotification:()=>{}
})

export const NotificationContextProvider:FC<PropsWithChildren> = ({children})=>{
	const [notification, setNotification] = useState<INotification>(null)

	const showNotification = useCallback((notification:INotification)=>{
		if(notification){
			setNotification(notification)
		}
	},[setNotification])

	const hideNotification = useCallback(()=>{
		setNotification(null)
	},[setNotification])

	useEffect(()=>{
		if(notification?.status !== 'pending'){
			const timer = setTimeout(()=>{
				setNotification(null)
			}, 3000)

			return ()=> clearTimeout(timer)}
	},[notification, setNotification])
	

	const value = useMemo(()=>({
		notification,
		showNotification,
		hideNotification
	}),[ notification, showNotification, hideNotification])

	return (<NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>)
}

export const useNotificationContext = ()=>{
	const context = useContext(NotificationContext);
	if(!context){
		throw new Error('Notifications context should be used inside a NotificationContext provider!')
	}
	return context;
}


