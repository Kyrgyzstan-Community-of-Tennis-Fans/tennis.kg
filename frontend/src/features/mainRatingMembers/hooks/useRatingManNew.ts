import { RatingMemberMutation } from '@/types/ratingMemberTypes';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import React, { useEffect, useState } from 'react';
import { selectRatingMemberCreating } from '@/features/mainRatingMembers/ratingMembersSlice';
import { createRatingMember, fetchRatingMembers } from '@/features/mainRatingMembers/ratingMembersThunks';
import { toast } from 'sonner';
import { GlobalError } from '@/types/userTypes';

const emptyState: RatingMemberMutation = {
  name: '',
  image: null,
  gender: 'male',
  place: '',
  ratingType: '',
};

export const useRatingManNew = () => {
  const dispatch = useAppDispatch();
  const [ratingMemberManMutation, setRatingMemberManMutation] = useState<RatingMemberMutation>(emptyState);
  const isCreating = useAppSelector(selectRatingMemberCreating);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open) {
      setRatingMemberManMutation(emptyState);
    }
  }, [open, setRatingMemberManMutation]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRatingMemberManMutation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeSelect = (value: string, name: string) => {
    setRatingMemberManMutation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setRatingMemberManMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(createRatingMember(ratingMemberManMutation)).unwrap();
      await dispatch(fetchRatingMembers());
      handleClose();
      setRatingMemberManMutation(emptyState);
      toast.success('Участник рейтинга создан успешно');
    } catch (error) {
      handleClose();
      setRatingMemberManMutation(emptyState);
      const backendError = error as GlobalError;
      toast.error(backendError.error || 'Что-то пошло не так при создании!');
    }
  };

  return {
    ratingMemberManMutation,
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
