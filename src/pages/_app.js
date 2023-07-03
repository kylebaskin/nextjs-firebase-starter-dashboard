import '@/styles/globals.css'
import NextNProgress from 'nextjs-progressbar';
import '@/styles/custom-bootstrap.scss';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function App({ Component, pageProps }) {

  const content = (
    <>
      <NextNProgress height={5} color='#329ea8' />
      <Component {...pageProps} />
    </>
  );

  return (
    <>
      <Head>
        <meta name="description" content="Build your online presence the right way." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {content}
      </Layout>
    </>
  );
}
