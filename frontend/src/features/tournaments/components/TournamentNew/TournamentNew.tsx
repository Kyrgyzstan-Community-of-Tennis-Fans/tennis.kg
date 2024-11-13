import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { toast } from 'sonner';
import { GlobalError } from '@/types/userTypes';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import { TournamentMutation } from '@/types/tournamentTypes';
import { createTournament, fetchTournaments } from '@/features/tournaments/tournamentsThunks';
import TournamentForm from '@/features/tournaments/components/TournamentForm/TournamentForm';
import { selectTournamentCreating } from '@/features/tournaments/tournamentsSlice';

const TournamentNew = () => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectTournamentCreating);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const onFormSubmit = async (state: TournamentMutation) => {
    try {
      await dispatch(createTournament(state)).unwrap();
      await dispatch(fetchTournaments());
      handleClose();
      toast.success('Турнир создан успешно');
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
          Создать турнир <SquaresPlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Создать новый турнир</DialogTitle>
        </DialogHeader>
        <TournamentForm isLoading={isCreating} onClose={handleClose} open={open} onSubmit={onFormSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default TournamentNew;
