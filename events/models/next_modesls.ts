import { GetStaticProps } from "next/types";
import { ParsedUrlQuery } from "querystring";

export interface Params extends ParsedUrlQuery {
	[key:string]: string
}

export interface IGetStaticProps extends GetStaticProps{
	params: Params
  }