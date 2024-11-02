import {useAppDispatch, useAppSelector} from '@/app/hooks';
import {selectPartners, selectPartnersFetching} from '@/features/partners/partnerSlice';
import {useEffect} from 'react';
import {fetchPartner} from '@/features/partners/partnerThunks';

export const usePartners = () => {
  const dispatch = useAppDispatch();
  const partners = useAppSelector(selectPartners);
  const partnersFetching = useAppSelector(selectPartnersFetching);

  useEffect(() => {
    dispatch(fetchPartner());
  }, [dispatch]);
  
  return { partners, partnersFetching };
};