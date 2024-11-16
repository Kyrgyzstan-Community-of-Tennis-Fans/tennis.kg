import React, { useEffect, useState } from 'react';
import { Tournament, TournamentMutation } from '@/types/tournamentTypes';
import { useFormHandlers } from '@/features/tournaments/hooks/useFormHandlers';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Confirm } from '@/components/Confirm/Confirm';

interface Props {
  onSubmit: (tournament: TournamentMutation) => void;
  existingTournament?: Tournament;
  isLoading?: boolean;
  onClose?: () => void;
  open: boolean;
}

const emptyState: TournamentMutation = {
  name: '',
  participants: '',
  eventDate: '',
  category: '',
  rank: '',
  regulationsDoc: null,
  resultsLink: '',
  registrationLink: '',
};

const TournamentForm: React.FC<Props> = ({ onSubmit, existingTournament, isLoading, onClose, open }) => {
  const initialState = existingTournament
    ? { ...existingTournament, participants: existingTournament.participants.toString() }
    : emptyState;

  const [state, setState] = useState<TournamentMutation>(initialState);
  const { handleChange, handleChangeSelect, fileInputChangeHandler, handleDateChange } = useFormHandlers(setState);

  useEffect(() => {
    if (open) {
      setState((prevState) => ({
        ...prevState,
      }));
    }
  }, [open]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      ...state,
    });

    setState(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-3 pt-3 pb-5'>
        <div className='flex flex-col gap-1'>
          <Label htmlFor='name'>Название турнира</Label>
          <Input
            required
            id='name'
            name='name'
            placeholder='Введите название турнира'
            value={state.name}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label htmlFor='participants'>Количество участников</Label>
          <Input
            required
            id='participants'
            name='participants'
            type='number'
            placeholder='Введите кол-во участиников'
            value={state.participants}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label htmlFor='eventDate'>Дата проведения</Label>
          <Input
            required
            id='eventDate'
            name='eventDate'
            value={state.eventDate}
            placeholder='Формат: дд.мм.гг (например, 18.11.24)'
            onChange={handleDateChange}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label htmlFor='category'>Категория турнира</Label>
          <Input
            required
            id='category'
            name='category'
            placeholder='Введите категорию турнира'
            value={state.category}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label htmlFor='rank'>Разряд</Label>
          <Select required name='rank' value={state.rank} onValueChange={(value) => handleChangeSelect(value, 'rank')}>
            <SelectTrigger id='rank'>
              <SelectValue placeholder='Укажите разряд' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem key='male' value='male'>
                  Мужской
                </SelectItem>
                <SelectItem key='female' value='female'>
                  Женский
                </SelectItem>
                <SelectItem key='mixed' value='mixed'>
                  Микст
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='flex flex-col gap-1'>
          <Label htmlFor='regulationsDoc'>Регламент турнира</Label>
          <Input id='regulationsDoc' name='regulationsDoc' type='file' onChange={fileInputChangeHandler} />
          {state.regulationsDoc && (
            <div className='mt-1'>
              <Confirm onOk={() => setState({ ...state, regulationsDoc: null })} onOkText='Очистить'>
                <Button size='sm' variant='destructive'>
                  Очистить файл
                </Button>
              </Confirm>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-1'>
          <Label htmlFor='resultsLink'>Результаты турнира</Label>
          <Input
            id='resultsLink'
            name='resultsLink'
            type='url'
            placeholder='Добавьте ссылку на результаты'
            value={state.resultsLink}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label htmlFor='registrationLink'>Ссылка для регистрации</Label>
          <Input
            required
            id='registrationLink'
            name='registrationLink'
            type='url'
            placeholder='Добавьте ссылку на регистрацию'
            value={state.registrationLink}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <Button
          type='submit'
          disabled={
            isLoading ||
            state.name === '' ||
            state.rank === '' ||
            state.participants === '' ||
            state.eventDate === '' ||
            state.eventDate.length < 8 ||
            state.category === '' ||
            state.registrationLink === ''
          }
        >
          Сохранить
        </Button>
        <DialogClose asChild>
          <Button type='button' variant='secondary' onClick={onClose}>
            Отмена
          </Button>
        </DialogClose>
      </div>
    </form>
  );
};

export default TournamentForm;
