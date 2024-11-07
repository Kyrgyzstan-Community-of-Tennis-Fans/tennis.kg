import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { mutationPartner, Partner } from '@/types/partnerTypes';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/Loader/Loader';
import { useAppSelector } from '@/app/hooks';
import { selectPartners, selectPartnersCreating } from '@/features/partners/partnerSlice';
import { toast } from 'sonner';
import FileInput from '@/components/FileInput/FilleInput';

interface PartnersFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (partner: Partner) => void;
}

const PartnersForm: React.FC<PartnersFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [state, setState] = useState<mutationPartner>({
    name: '',
    url: '',
    image: '',
  });
  const partners = useAppSelector(selectPartners);
  const loading = useAppSelector(selectPartnersCreating);
  const [nameError, setNameError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const isFormValid = state.name && state.image;
  const closeRef = useRef<HTMLButtonElement>(null);
  const blockedWords = partners.map((p) => p.name.toLowerCase());
  const isBlocked = blockedWords.includes(state.name.toLowerCase());

  useEffect(() => {
    if (isOpen) {
      setState({
        name: '',
        url: '',
        image: '',
      });
      setNameError(null);
      setImageError(null);
    }
  }, [isOpen, setState]);

  const submitFormHandler = (event: React.FormEvent) => {
    try {
      event.preventDefault();
      closeRef.current?.click();
      if (!state.name) {
        setNameError('Название обязательно');
        return;
      }
      if (!state.image) {
        setImageError('URL логотипа обязателен');
        return;
      }
      setImageError(null);
      setNameError(null);
      onSubmit({
        ...state,
        _id: '',
      });
      toast.success('Партнер успешно создан');
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при создании Партнера.');
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить нового партнера</DialogTitle>
          <DialogDescription>Пожалуйста, заполните форму для добавления нового партнера.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submitFormHandler} className='flex flex-col gap-4'>
          <div className='form-group'>
            <Label htmlFor='name'>Название Компании Партнера</Label>
            <Input required id='name' name='name' value={state.name} onChange={inputChangeHandler} />
            {isBlocked && <small className={'text-red-600 leading-none'}>Партнер {state.name} уже существует.</small>}
            {nameError && <small className='text-red-600 leading-none'>{nameError}</small>}
          </div>

          <div className='form-group'>
            <Label htmlFor='url'>Url Адрес Партнера</Label>
            <Input required id='url' name='url' value={state.url} onChange={inputChangeHandler} />
          </div>

          <div className='form-group'>
            <Label htmlFor='image'>Добавить логотип Компании</Label>
            <FileInput  name='image' onChange={handleImageChange} />
            {imageError && <small className='text-red-600 text-sm'>{imageError}</small>}
          </div>
          <Button disabled={loading || !isFormValid} type='submit' className=' mt-4'>
            Добавить {loading && <Loader size={'sm'} theme={'light'} />}
          </Button>
          <DialogClose ref={closeRef} asChild>
            <Button disabled={loading} type={'button'} variant={'outline'}>
              Отменить
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PartnersForm;
