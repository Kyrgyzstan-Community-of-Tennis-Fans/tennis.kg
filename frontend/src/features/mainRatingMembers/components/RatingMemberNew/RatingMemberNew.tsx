import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectRatingMemberCreating } from '@/features/mainRatingMembers/ratingMembersSlice';
import { createRatingMember, fetchRatingMembers } from '@/features/mainRatingMembers/ratingMembersThunks';
import { toast } from 'sonner';
import { GlobalError } from '@/types/userTypes';
import { RatingMember, RatingMemberMutation } from '@/types/ratingMemberTypes';
import RatingMemberForm from '@/features/mainRatingMembers/components/RatingMemberForm/RatingMemberForm';
import { getGenderTitles } from '@/features/mainRatingMembers/utils/ratingMembersHelpers';

interface Props {
  forWhichGender: 'male' | 'female';
  ratingMembers: RatingMember[];
}

const RatingMemberNew: React.FC<Props> = ({ forWhichGender, ratingMembers }) => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectRatingMemberCreating);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const { buttonTitle, dialogTitle } = getGenderTitles(forWhichGender);

  const onFormSubmit = async (state: RatingMemberMutation) => {
    try {
      await dispatch(createRatingMember(state)).unwrap();
      await dispatch(fetchRatingMembers());
      handleClose();
      toast.success('Участник рейтинга создан успешно');
    } catch (error) {
      handleClose();
      const backendError = error as GlobalError;
      toast.error(backendError.error || 'Что-то пошло не так при создании!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='w-full xs:w-max'>
          Добавить в {buttonTitle} рейтинг <SquaresPlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Добавить участника {dialogTitle} рейтинга</DialogTitle>
        </DialogHeader>
        <RatingMemberForm
          forWhichGender={forWhichGender}
          isLoading={isCreating}
          onClose={handleClose}
          onSubmit={onFormSubmit}
          ratingMembers={ratingMembers}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RatingMemberNew;
