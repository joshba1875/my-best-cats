import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from 'components/layout';
import {NextIntlClientProvider} from 'next-intl';
import {useRouter} from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
       timeZone="Europe/London"
    >
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </NextIntlClientProvider>
    
  );
}
