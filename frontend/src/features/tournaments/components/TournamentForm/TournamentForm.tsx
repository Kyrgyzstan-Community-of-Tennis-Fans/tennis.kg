import React, { useEffect, useState } from 'react';
import { Tournament, TournamentMutation } from '@/types/tournamentTypes';
import { useFormHandlers } from '@/features/tournaments/hooks/useFormHandlers';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Confirm } from '@/components/Confirm/Confirm';
import { CURRENT_YEAR_FULL, NEXT_YEAR } from '@/consts';
import FileInput from '@/components/FileInput/FilleInput';
import { useAdminTournaments } from '@/features/tournaments/hooks/useAdminTournaments';
import ErrorMessage from '@/features/tournaments/components/ErrorMessage/ErrorMessage';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  onSubmit: (tournament: TournamentMutation) => void;
  existingTournament?: Tournament;
  isLoading?: boolean;
  onClose?: () => void;
  open: boolean;
  tournamentsLastYearExist?: boolean;
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
  tournamentYear: '',
};

const TournamentForm: React.FC<Props> = ({
  onSubmit,
  existingTournament,
  isLoading,
  onClose,
  open,
  tournamentsLastYearExist,
}) => {
  const initialState = existingTournament
    ? {
        ...existingTournament,
        participants: existingTournament.participants.toString(),
        tournamentYear: existingTournament.tournamentYear.toString(),
      }
    : emptyState;
  const [state, setState] = useState<TournamentMutation>(initialState);
  const { handleChange, handleChangeSelect, fileInputChangeHandler, handleDateChange } = useFormHandlers(
    state,
    setState,
  );
  const { handleDeleteByYear } = useAdminTournaments();
  const showWarning = state.tournamentYear === NEXT_YEAR.toString() && tournamentsLastYearExist;

  useEffect(() => {
    if (open) {
      setState((prevState) => ({
        ...prevState,
      }));
    }
  }, [open]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (state.tournamentYear === NEXT_YEAR.toString() && tournamentsLastYearExist) {
      await handleDeleteByYear(CURRENT_YEAR_FULL.toString());
    }

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
          <Label htmlFor='tournamentYear'>Год проведения турнира</Label>
          <Select
            required
            name='tournamentYear'
            value={state.tournamentYear}
            onValueChange={(value) => handleChangeSelect(value, 'tournamentYear')}
          >
            <SelectTrigger id='tournamentYear'>
              <SelectValue placeholder='Укажите год проведения' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem key={CURRENT_YEAR_FULL} value={CURRENT_YEAR_FULL.toString()}>
                  {CURRENT_YEAR_FULL} (текущий)
                </SelectItem>
                <SelectItem key={NEXT_YEAR} value={NEXT_YEAR.toString()}>
                  {NEXT_YEAR} (следующий)
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='flex flex-col gap-1'>
          <Label htmlFor='eventDate'>Дата проведения</Label>
          <Input
            required
            id='eventDate'
            name='eventDate'
            value={state.eventDate}
            placeholder='Формат: дд.мм.гг (например, 18.11.24)'
            disabled={!state.tournamentYear}
            onChange={handleDateChange}
          />
          {!state.tournamentYear && <ErrorMessage>Сначала выберите год проведения турнира</ErrorMessage>}
          {state.tournamentYear && (
            <ErrorMessage type='info'>
              Вы можете указать дату только для выбранного года: {state.tournamentYear}
            </ErrorMessage>
          )}
          {state.tournamentYear && state.eventDate.length < 8 && (
            <ErrorMessage>Введите дату полностью (дд.мм.гг)</ErrorMessage>
          )}
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

        <div className='flex flex-col'>
          <Label htmlFor='regulationsDoc'>Регламент турнира</Label>
          <FileInput name='regulationsDoc' onChange={fileInputChangeHandler} />
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
            placeholder='Добавьте ссылку для регистрации'
            value={state.registrationLink}
            onChange={handleChange}
          />
        </div>
      </div>

      {showWarning && (
        <div className='flex items-start gap-3 p-2 mb-2 border-l-4 border-yellow-500 bg-yellow-50 rounded-md text-yellow-800'>
          <ExclamationCircleIcon className='w-5 h-5 mt-1 shrink-0' />
          <small>
            <strong>Предупреждение:</strong> При создании турнира на следующий год, если есть турниры за прошлый год,
            они будут автоматически удалены. Это действие необратимо.
          </small>
        </div>
      )}

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
