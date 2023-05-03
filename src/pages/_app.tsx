import { globalStyles } from '@/styles/global';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import logoShop from '../assets/Logo.svg';
import { Container, Header } from '@/styles/pages/app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoShop} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
