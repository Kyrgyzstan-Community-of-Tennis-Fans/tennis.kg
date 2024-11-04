import { Layout } from '@/components/Layout';
import { BlockCarousel } from '@/features/carousel/BlockCarousel';
import News from '@/features/news/containers/News/News';
import Partners from '@/features/partners/Partners';
import React from 'react';

export const Home: React.FC = () => {
  return (
    <>
      <Layout className={'mb-32'}>
        <BlockCarousel />
      </Layout>

      <section className={'mb-32'}>
        <Partners />
      </section>

      <Layout>
        <News />
      </Layout>
    </>
  );
};
