import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'
import MainLayout from '../components/layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider direction="rtl" locale={{ locale: 'en' }}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ConfigProvider>
  )
}
