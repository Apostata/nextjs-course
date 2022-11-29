
export interface IProductEntity{
	title: string;
	description: string
}

export interface Product extends IProductEntity {
	id:string
}