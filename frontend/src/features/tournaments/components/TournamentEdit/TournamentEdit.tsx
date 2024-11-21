import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { toast } from 'sonner';
import { GlobalError } from '@/types/userTypes';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { selectTournamentUpdating } from '@/features/tournaments/tournamentsSlice';
import { Tournament, TournamentMutation } from '@/types/tournament';
import { fetchTournaments, updateTournament } from '@/features/tournaments/tournamentsThunks';
import TournamentForm from '@/features/tournaments/components/TournamentForm/TournamentForm';

interface Props {
  id: string;
  existingTournament: Tournament;
  tournamentsLastYearExist?: boolean;
}

const TournamentEdit: React.FC<Props> = ({ id, existingTournament, tournamentsLastYearExist }) => {
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector(selectTournamentUpdating);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const onFormSubmit = async (state: TournamentMutation) => {
    try {
      await dispatch(updateTournament({ id, tournamentMutation: state })).unwrap();
      await dispatch(fetchTournaments());
      handleClose();
      toast.success('Турнир обновлен успешно');
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
      <DialogContent aria-describedby={undefined} className='max-h-[90dvh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Редактировать турнир</DialogTitle>
        </DialogHeader>
        <TournamentForm
          isLoading={isEditing}
          onClose={handleClose}
          onSubmit={onFormSubmit}
          existingTournament={existingTournament}
          tournamentsLastYearExist={tournamentsLastYearExist}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TournamentEdit;
