import Marquee from 'react-fast-marquee';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectPartners, selectPartnersFetching } from '@/features/partners/partnerSlice';
import { useEffect } from 'react';
import { fetchPartner } from '@/features/partners/partnerThunks';
import { API_URl } from '@/consts';
import { Skeleton } from '@/components/ui/skeleton';

export const Partners = () => {
  const dispatch = useAppDispatch();
  const partners = useAppSelector(selectPartners);
  const partnersFetching = useAppSelector(selectPartnersFetching);

  useEffect(() => {
    dispatch(fetchPartner());
  }, [dispatch]);

  return (
    <div className='mt-16 pb-10'>
      <h1 className='text-2xl sm:text-3xl md:text-5xl text-center font-semibold mb-10'>Наши партнеры</h1>
      {partners.length === 0 ? 'На данный момент партнёров нет, но мы активно работаем над расширением сотрудничества. Следите за обновлениями!': null}
      <Marquee direction={'left'} speed={15} delay={0} autoFill={true} pauseOnHover={true}>
        {partnersFetching
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className='w-partner h-24 rounded-2xl flex items-center justify-center me-6 shadow-partner bg-gray-200 mb-4'
              >
                <Skeleton className='h-full w-3/4' />
              </div>
            ))
          : partners.map((partner) => (
              <a
                key={partner._id}
                href={partner.url}
                target='_blank'
                rel='noopener noreferrer'
                className='w-partner py-1.5 h-24 rounded-2xl flex items-center justify-center me-6 shadow-partner bg-white mb-4'
              >
                <img
                  src={`${API_URl}/${partner.image}`}
                  alt={`Logo of ${partner.name}`}
                  className='h-full object-contain w-3/4'
                />
              </a>
            ))}
      </Marquee>
    </div>
  );
};

