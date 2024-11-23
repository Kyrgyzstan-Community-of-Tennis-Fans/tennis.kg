import React from 'react';
import { Layout } from '@/components/Layout';
import { BlockCarousel } from '@/features/carousel/BlockCarousel';
import Partners from '@/features/partners/Partners';
import MainPageRating from '@/features/mainRatingMembers/MainPageRating';
import { NewsMain } from '@/features/news/containers/NewsMain/NewsMain';
import GradientCircle from '@/components/GradientCircle/GradientCircle';
import { GradientCirclesTypes } from '@/types/general';

const gradientCircles: GradientCirclesTypes[] = [
  { width: '283px', height: '283px', top: '-90px', right: '-90px', visible: 'block' },
  { width: '660px', height: '675px', top: '213px', left: '80px', visible: 'block' },
  { width: '660px', height: '675px', top: '545px', right: '123px', visible: 'hidden' },
  { width: '660px', height: '675px', top: '1030px', left: '-60px', visible: 'hidden' },
  { width: '660px', height: '675px', top: '1346px', right: '-195px', visible: 'block' },
  { width: '516px', height: '528px', top: '2000px', left: '147px', visible: 'hidden' },
  { width: '630px', height: '654px', bottom: '1800px', right: '-100px', visible: 'hidden' },
  { width: '630px', height: '654px', bottom: '1500px', left: '-20px', visible: 'block' },
  { width: '516px', height: '528px', bottom: '628px', right: '170px', visible: 'block' },
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
