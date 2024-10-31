import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import {
  selectPartner,
  selectPartners,
  selectPartnersFetching,
  selectPartnersUpdating,
} from '@/features/partners/partnerSlice';
import { fetchOnePartner, fetchPartner, updatePartner } from '@/features/partners/partnerThunks';

interface Props {
  id: string;
}

export const PartnerEdit: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const partners = useAppSelector(selectPartners);
  const partner = useAppSelector(selectPartner);
  const partnerUpdating = useAppSelector(selectPartnersUpdating);
  const partnerFetching = useAppSelector(selectPartnersFetching);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const [partnerData, setPartnerData] = useState({
    name: '',
    url: '',
    image: '',
  });

  const blockedNames = partners.filter((p) => p._id !== id).map((p) => p.name.toLowerCase());
  const isNameBlocked = blockedNames.includes(partnerData.name.toLowerCase());

  useEffect(() => {
    if (open) {
      dispatch(fetchOnePartner(id)).catch((error) => console.error('Failed to fetch partner:', error));
    }
  }, [dispatch, id, open]);

  useEffect(() => {
    if (open && partner) {
      setPartnerData({
        name: partner.name,
        url: partner.url || '',
        image: partner.image || '',
      });
    }
  }, [partner, open]);

  useEffect(() => {
    if (!open) {
      setPartnerData({ name: '', url: '', image: '' });
    }
  }, [open]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPartnerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(updatePartner({ id, partnerData })).unwrap();
      await dispatch(fetchPartner());
      closeRef.current?.click();
      toast.success('Партнер успешно отредактирован.');
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при редактировании партнера.');
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, files } = event.target;
    const value = files && files[0] ? files[0] : null;
    setPartnerData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'}>
          <PencilSquareIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать партнера</DialogTitle>
          <DialogDescription>Заполните форму перед изменением.</DialogDescription>

          {partnerFetching ? (
            <div className={'space-y-2'}>
              <Skeleton className={'w-full h-6'} />
              <Skeleton className={'w-full h-6'} />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className='mb-2 text-left'>
                <div className='flex items-center justify-between gap-2 mb-1'>
                  <Label htmlFor='name'>Название</Label>
                  {isNameBlocked && (
                    <small className='text-red-600 leading-none'>
                      Партнер с именем {partnerData.name} уже существует.
                    </small>
                  )}
                </div>
                <Input
                  id='name'
                  name='name'
                  placeholder='Введите название партнера'
                  onChange={handleChange}
                  value={partnerData.name}
                />
              </div>

              <div className='mb-2 text-left'>
                <Label htmlFor='url'>URL Адрес Партнера</Label>
                <Input
                  id='url'
                  name='url'
                  placeholder='Введите URL адрес'
                  onChange={handleChange}
                  value={partnerData.url}
                />
              </div>

              <div className='mb-2 text-left'>
                <Label htmlFor='image'>Логотип Компании</Label>
                <Input type={'file'} id='image' name='image' placeholder='URL логотипа' onChange={handleImageChange} />
              </div>

              <div className='flex flex-col gap-1'>
                <Button disabled={partnerUpdating || isNameBlocked} size='sm'>
                  Сохранить {partnerUpdating && <Loader size='sm' theme='light' />}
                </Button>
                <DialogClose ref={closeRef} asChild>
                  <Button disabled={partnerUpdating} type='button' variant='outline'>
                    Отменить
                  </Button>
                </DialogClose>
              </div>
            </form>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
