import { Html, Head, Main, NextScript } from 'next/document'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

export default function Document() {
    return (
    <Html lang="en">
        <Head>
            <script src="https://kit.fontawesome.com/0ae7611302.js"
            crossorigin="anonymous"
            ></script>
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
    )
}