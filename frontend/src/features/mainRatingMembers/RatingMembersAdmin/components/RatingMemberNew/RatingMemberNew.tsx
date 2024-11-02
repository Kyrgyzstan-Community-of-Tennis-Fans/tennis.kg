import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RatingMemberMutation } from '@/types/ratingMemberTypes';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GlobalError } from '@/types/userTypes';
import { selectRatingMemberCreating } from '@/features/mainRatingMembers/ratingMembersSlice';
import { createRatingMember, fetchRatingMembers } from '@/features/mainRatingMembers/ratingMembersThunks';
import RatingMemberForm from '@/features/mainRatingMembers/RatingMembersAdmin/components/RatingMembesForm/RatingMemberForm';

const RatingMemberNew = () => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectRatingMemberCreating);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const onFormSubmit = async (ratingMemberMutation: RatingMemberMutation) => {
    try {
      await dispatch(createRatingMember(ratingMemberMutation)).unwrap();
      await dispatch(fetchRatingMembers());
      handleClose();
      toast.success('Участник рейтинга создан успешно');
    } catch (error) {
      console.error(error);
      handleClose();
      const backendError = error as GlobalError;
      toast.error(backendError.error || 'Что-то пошло не так при создании!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm'>Добавить</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Добавить участника рейтинга</DialogTitle>
        </DialogHeader>
        <RatingMemberForm isLoading={isCreating} onSubmit={onFormSubmit} onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default RatingMemberNew;
