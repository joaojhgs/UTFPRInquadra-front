import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MainLayout from '../components/layout'
import Providers from '../providers'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Providers>
  )
}
