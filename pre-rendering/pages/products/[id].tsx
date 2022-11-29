import { GetStaticPaths, GetStaticProps } from 'next'
import React, { Fragment } from 'react'
import { Product } from '../../models/product_model'
import { getProductFromByIdFromJsonFile, getProductsFromJsonFile } from '../../services/product_service'

interface Props{
	product: Product
}

const ProductDetail = (props:Props) =>{
	const {product} = props

	if(!product){
		return <p>loading ...</p>
	  }
	
  return (
	<Fragment>
		<h1>{product.title}</h1>
		<p>{product.description}</p>
	</Fragment>
  )
}

export const getStaticProps: GetStaticProps = async (context)=>{
	const {params}= context;
	const id = params.id;
	const product =  await getProductFromByIdFromJsonFile(id as string)

	if(!product){
		return {notFound: true}
	}
	
	return {
		props:{
			product
		}
	}
}

export const getStaticPaths: GetStaticPaths = async ()=>{
	const {products} =  await getProductsFromJsonFile()
	const params = products.map((product)=>({
		params:{
			id:product.id
		}
	}));

	return { 
		paths:params,
		fallback: 'blocking',
	}
}

export default ProductDetail
