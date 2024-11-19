import React from 'react';
import { Layout } from '@/components/Layout';
import { BlockCarousel } from '@/features/carousel/BlockCarousel';
import Partners from '@/features/partners/Partners';
import MainPageRating from '@/features/mainRatingMembers/MainPageRating';
import { NewsMain } from '@/features/news/containers/NewsMain/NewsMain';
import GradientCircle from '@/components/GradientCircle/GradientCircle';

const gradientCircles = [
  { width: '660px', height: '675px', top: '231px', left: '-150px' },
  { width: '283px', height: '283px', top: '-90px', right: '-90px' },
  { width: '660px', height: '675px', top: '580px', right: '-250px' },
  { width: '660px', height: '675px', top: '1110px', left: '-200px' },
  { width: '660px', height: '675px', top: '1360px', right: '-195px' },
  { width: '516px', height: '528px', top: '2000px', left: '-20px' },
  { width: '630px', height: '654px', bottom: '1700px', left: '-100px' },
  { width: '516px', height: '528px', bottom: '600px', right: '-20px' },
];

export const Home: React.FC = () => {
  return (
    <>
      {gradientCircles.map((circle, id) => (
        <GradientCircle key={id} {...circle} />
      ))}

      <Layout className='mb-32'>
        <BlockCarousel />
      </Layout>

      <section className='mb-8 lg:mb-28'>
        <Partners />
      </section>

      <Layout>
        <section className='mb-24'>
          <MainPageRating />
        </section>
        <section>
          <NewsMain />
        </section>
      </Layout>
    </>
  );
};
