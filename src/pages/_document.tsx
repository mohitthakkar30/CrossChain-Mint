import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='bg-gradient-to-tr from-indigo-200 via-red-200 to-yellow-100'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
