import { useAppDispatch, useAppSelector } from '@/app/hooks';
import React, { useState } from 'react';
import { RatingMemberMutation } from '@/types/ratingMemberTypes';
import { selectRatingMemberCreating } from '@/features/mainRatingMembers/ratingMembersSlice';
import { createRatingMember, fetchRatingMembers } from '@/features/mainRatingMembers/ratingMembersThunks';
import { toast } from 'sonner';
import { GlobalError } from '@/types/userTypes';

const emptyState: RatingMemberMutation = {
  name: '',
  image: null,
  gender: 'female',
  place: '',
  ratingType: 'womensTop3',
};

export const useRatingWomanNew = () => {
  const dispatch = useAppDispatch();
  const [ratingMemberWomanMutation, setRatingMemberWomanMutation] = useState<RatingMemberMutation>(emptyState);
  const isCreating = useAppSelector(selectRatingMemberCreating);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRatingMemberWomanMutation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeSelect = (value: string, name: string) => {
    setRatingMemberWomanMutation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setRatingMemberWomanMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(createRatingMember(ratingMemberWomanMutation)).unwrap();
      await dispatch(fetchRatingMembers());
      handleClose();
      setRatingMemberWomanMutation(emptyState);
      toast.success('Участник рейтинга создан успешно');
    } catch (error) {
      handleClose();
      setRatingMemberWomanMutation(emptyState);
      const backendError = error as GlobalError;
      toast.error(backendError.error || 'Что-то пошло не так при создании!');
    }
  };

  return {
    ratingMemberWomanMutation,
    isCreating,
    open,
    setOpen,
    handleClose,
    handleChange,
    handleChangeSelect,
    fileInputChangeHandler,
    onFormSubmit,
  };
};
