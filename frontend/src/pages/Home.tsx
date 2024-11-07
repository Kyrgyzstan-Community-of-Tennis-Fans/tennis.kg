import { Layout } from '@/components/Layout';
import { BlockCarousel } from '@/features/carousel/BlockCarousel';
import Partners from '@/features/partners/Partners';
import React from 'react';
import MainPageRating from '@/features/mainRatingMembers/MainPageRating';

export const Home: React.FC = () => {
  return (
    <>
      <Layout className={'mb-32'}>
        <BlockCarousel />
      </Layout>

      <section className={'mb-8 lg:mb-28'}>
        <Partners />
      </section>

      <Layout>
        <section className='mb-24'>
          <MainPageRating />
        </section>
      </Layout>
    </>
  );
};
