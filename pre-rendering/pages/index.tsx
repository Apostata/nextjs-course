import Link from "next/link";
import { GetServerSideProps, GetStaticProps } from "next/types";
import React from "react";
import { Product } from "../models/product_model";
import { getProductsFromJsonFile } from "../services/product_service";


interface Props{
  products: Product[]
}

const HomePage : React.FC = (props: Props)=>{
  const {products} = props;

  return (
    <ul>
      {products.map((product)=>(
        <li key={product.id}><Link href={`/products/${product.id}`}>{product.title}</Link></li>
        )
      )}
      <li><Link href='/products/last-sales/'>Last Sales</Link></li>
      <li><Link href='/user-profile/'>User profile</Link></li>
    </ul>
  );
}

// server-side 
export  const getStaticProps: GetStaticProps  = async (context) =>{
  const data = await getProductsFromJsonFile()

  if(!data){
    return{
      redirect: {
        destination: '/no-data',
        permanent: false //obrigatório com type script, seja true ou false
      }
    }
  }

  if(data.products?.length < 1){
    return { notFound: true}
  }

  return {
    props: {
      products:data.products
    },
    revalidate: 10, // only for production
  };
};

export default HomePage;
