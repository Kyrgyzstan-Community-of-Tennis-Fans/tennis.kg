import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectRatingMemberCreating } from '@/features/mainRatingMembers/ratingMembersSlice';
import { createRatingMember, fetchRatingMembers } from '@/features/mainRatingMembers/ratingMembersThunks';
import { toast } from 'sonner';
import { GlobalError } from '@/types/user';
import { RatingMemberMutation } from '@/types/ratingMember';
import RatingMemberForm from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingMemberForm/RatingMemberForm';

interface Props {
  forWhichGender: 'male' | 'female';
}

const RatingMemberNew: React.FC<Props> = ({ forWhichGender }) => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectRatingMemberCreating);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const genderButtonTitle = forWhichGender === 'male' ? 'мужской' : 'женский';
  const genderDialogTitle = forWhichGender === 'male' ? 'мужского' : 'женского';

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
        <Button size='sm'>
          Добавить в {genderButtonTitle} рейтинг <SquaresPlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Добавить участника {genderDialogTitle} рейтинга</DialogTitle>
        </DialogHeader>
        <RatingMemberForm
          forWhichGender={forWhichGender}
          isLoading={isCreating}
          onClose={handleClose}
          open={open}
          onSubmit={onFormSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RatingMemberNew;
