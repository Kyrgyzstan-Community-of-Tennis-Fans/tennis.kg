import React from 'react';
import { Layout } from '@/components/Layout';
import { BlockCarousel } from '@/features/carousel/BlockCarousel';
import Partners from '@/features/partners/Partners';
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
