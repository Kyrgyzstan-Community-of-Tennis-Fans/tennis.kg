import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RatingMember, RatingMemberMutation } from '@/types/ratingMemberTypes';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { EditIcon } from 'lucide-react';
import { GlobalError } from '@/types/userTypes';
import { fetchRatingMembers, updateRatingMember } from '@/features/mainRatingMembers/ratingMembersThunks';
import { selectRatingMemberUpdating } from '@/features/mainRatingMembers/ratingMembersSlice';
import RatingMemberForm from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingMembesForm/RatingMemberForm';

export interface Props {
  id: string;
  existingMember: RatingMember;
}

const RatingMemberEdit: React.FC<Props> = ({ id, existingMember }) => {
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector(selectRatingMemberUpdating);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const onFormSubmit = async (ratingMemberMutation: RatingMemberMutation) => {
    try {
      await dispatch(updateRatingMember({ id, ratingMemberMutation: ratingMemberMutation })).unwrap();
      await dispatch(fetchRatingMembers());
      handleClose();
      toast.success('Участник рейтинга обновлен успешно');
    } catch (error) {
      console.error(error);
      handleClose();
      const backendError = error as GlobalError;
      toast.error(backendError.error || 'Что-то пошло не так при обновлении!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm'>
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Редактировать участника рейтинга</DialogTitle>
        </DialogHeader>
        <RatingMemberForm
          isLoading={isEditing}
          onSubmit={onFormSubmit}
          onClose={handleClose}
          existingMember={existingMember}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RatingMemberEdit;
