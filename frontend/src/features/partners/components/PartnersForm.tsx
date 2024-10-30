import React, { ChangeEvent, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { mutationPartner, Partner } from '@/types/partnerTypes';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!state.name) {
      setDescriptionError('Название обязательно');
      return;
    }
    if (!state.image) {
      setImageError('URL логотипа обязателен');
      return;
    }
    setImageError(null);
    setDescriptionError(null);
    onSubmit({
      ...state,
      _id: '',
    });
    onClose();
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, files } = event.target;
    const value = files && files[0] ? files[0] : null;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
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
          </div>

          <div className='form-group'>
            <Label htmlFor='url'>Url Адрес Партнера</Label>
            <Input required id='url' name='url' value={state.url} onChange={inputChangeHandler} />
            {descriptionError && <p className='text-red-600 text-sm'>{descriptionError}</p>}
          </div>

          <div className='form-group'>
            <Label htmlFor='image'>Добавить логотип Компании</Label>
            <Input type={'file'} required id='image' name='image' onChange={handleImageChange} />
            {imageError && <p className='text-red-600 text-sm'>{imageError}</p>}
          </div>
          <Button type='submit' className='bg-green-600 mt-4'>
            Добавить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PartnersForm;
