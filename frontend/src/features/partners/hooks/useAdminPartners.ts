import {useAppDispatch, useAppSelector} from '@/app/hooks';
import {selectPartners, selectPartnersFetching} from '@/features/partners/partnerSlice';
import {useEffect, useState} from 'react';
import {createPartner, fetchPartner} from '@/features/partners/partnerThunks';
import {Partner} from '@/types/partnerTypes';

export const useAdminPartners = () => {
  const dispatch = useAppDispatch();
  const partners = useAppSelector(selectPartners);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const loading = useAppSelector(selectPartnersFetching);

  useEffect(() => {
    dispatch(fetchPartner());
  }, [dispatch]);

  const handleSubmit = async (partner: Partner) => {
    try {
      await dispatch(createPartner(partner));
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Failed to create partner:', error);
    }
  };

  return { partners, isDialogOpen, loading, handleSubmit, setIsDialogOpen };
};