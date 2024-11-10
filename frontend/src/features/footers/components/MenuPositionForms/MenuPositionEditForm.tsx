import React, { FormEvent, useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectItemsData, selectItemUpdating, selectMenuPositionLink } from '@/features/footers/footersSlice';
import { LinkDataMutation } from '@/types/footerTypes';
import { getFooterItems, getOneMenuPosition, updateMenuPosition } from '@/features/footers/footersThunks';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/Loader/Loader';

interface Props {
  id: string;
}

const MenuPositionEditForm: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const menuPositionData = useAppSelector(selectItemsData);
  const oneMenuPositionData = useAppSelector(selectMenuPositionLink);
  const menuPositionUpdating = useAppSelector(selectItemUpdating);
  const [menuPosition, setMenuPosition] = useState<LinkDataMutation>({
    name: '',
    value: '',
  });
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const blockedMenu = menuPositionData?.[0]?.menuPosition?.map((item) => item.name.toLowerCase()) ?? [];
  const isBlocked = blockedMenu.includes(menuPosition.name.toLowerCase());

  useEffect(() => {
    if (open) {
      dispatch(getOneMenuPosition(id));
    }
  }, [dispatch, id, open]);

  useEffect(() => {
    if (open && oneMenuPositionData) {
      const menu = oneMenuPositionData.menuPosition[0];
      setMenuPosition((prevState) => ({
        ...prevState,
        name: menu.name,
        value: menu.value,
      }));
    }
  }, [open, oneMenuPositionData]);

  useEffect(() => {
    if (!open) {
      setMenuPosition({
        name: '',
        value: '',
      });
    }
  }, [open]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMenuPosition((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      if (menuPosition.name.trim().length !== 0 && menuPosition.value.trim().length !== 0 && !isBlocked) {
        closeRef.current?.click();
        await dispatch(updateMenuPosition({ id, data: menuPosition })).unwrap();
        await dispatch(getFooterItems()).unwrap();
        setMenuPosition({
          name: '',
          value: '',
        });
        toast.success('Пункт в меню успешно обновлен.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при обновление пункта в меню.');
    }
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
          <DialogTitle>Редактировать пункт в меню</DialogTitle>
          <DialogDescription>Заполните форму перед обновлением.</DialogDescription>
          <form onSubmit={handleSubmit}>
            <div className={'flex flex-col justify-between gap-2 mb-3'}>
              {isBlocked && (
                <small className={'text-red-600 leading-none'}>
                  Пункт в меню положения "{menuPosition.name}" уже существует.
                </small>
              )}
              <Label htmlFor={'menu-position-name'}>Название пункта в меню</Label>
              <Input
                name='name'
                value={menuPosition.name}
                onChange={inputChangeHandler}
                placeholder={'Введите название пункта'}
                id={'menu-position-name'}
              />
              <Label htmlFor={'menu-position-link'}>Ссылка на страницу</Label>
              <Input
                name='value'
                value={menuPosition.value}
                onChange={inputChangeHandler}
                placeholder={'Введите адрес ссылки на страницу'}
                id={'menu-position-link'}
              />
            </div>
            <div className={'flex flex-col gap-1'}>
              <Button
                disabled={menuPosition.name.trim().length === 0 || menuPosition.value.trim().length === 0 || isBlocked}
                size={'sm'}
              >
                Сохранить {menuPositionUpdating && <Loader size={'sm'} theme={'light'} />}
              </Button>
              <DialogClose ref={closeRef} asChild>
                <Button type={'button'} variant={'outline'}>
                  Отменить
                </Button>
              </DialogClose>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MenuPositionEditForm;
