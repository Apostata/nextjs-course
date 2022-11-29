import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document{
	render(): JSX.Element {
		return (
			<Html lang="pt-BR">
				<Head />
				<body>
					<div id='overlay'/>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument