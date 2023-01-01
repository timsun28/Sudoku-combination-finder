import Head from "next/head";
import "./index.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Sudoku Killer Combination Finder</title>
                <meta name="description" content="A tool to help solve a Killer Sudoku by finding combinations" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
