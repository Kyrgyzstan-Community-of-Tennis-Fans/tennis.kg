import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectRatingMemberUpdating } from '@/features/mainRatingMembers/ratingMembersSlice';
import { RatingMember, RatingMemberMutation } from '@/types/ratingMember';
import { fetchRatingMembers, updateRatingMember } from '@/features/mainRatingMembers/ratingMembersThunks';
import { toast } from 'sonner';
import { GlobalError } from '@/types/user';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import RatingMemberForm from '@/features/mainRatingMembers/components/RatingMemberForm/RatingMemberForm';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { getGenderTitles } from '@/features/mainRatingMembers/utils/ratingMembersHelpers';

interface Props {
  forWhichGender: 'male' | 'female';
  id: string;
  existingMember: RatingMember;
  ratingMembers: RatingMember[];
}

const RatingMemberEdit: React.FC<Props> = ({ forWhichGender, id, existingMember, ratingMembers }) => {
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector(selectRatingMemberUpdating);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const { dialogTitle } = getGenderTitles(forWhichGender);

  const onFormSubmit = async (state: RatingMemberMutation) => {
    try {
      await dispatch(updateRatingMember({ id, ratingMemberMutation: state })).unwrap();
      await dispatch(fetchRatingMembers());
      handleClose();
      toast.success('Участник рейтинга обновлен успешно');
    } catch (error) {
      handleClose();
      const backendError = error as GlobalError;
      toast.error(backendError.error || 'Что-то пошло не так при обновлении!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm'>
          <PencilSquareIcon />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Редактировать участника {dialogTitle} рейтинга</DialogTitle>
        </DialogHeader>
        <RatingMemberForm
          forWhichGender={forWhichGender}
          isLoading={isEditing}
          onClose={handleClose}
          onSubmit={onFormSubmit}
          existingMember={existingMember}
          ratingMembers={ratingMembers}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RatingMemberEdit;
