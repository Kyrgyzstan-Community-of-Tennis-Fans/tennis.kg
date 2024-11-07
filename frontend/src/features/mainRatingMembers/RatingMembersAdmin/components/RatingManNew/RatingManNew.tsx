import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import { useRatingManNew } from '@/features/mainRatingMembers/hooks/useRatingManNew';
import { useAdminRatingMembers } from '@/features/mainRatingMembers/hooks/useAdminRatingMembers';

const RatingManNew = () => {
  const {
    ratingMemberManMutation,
    isCreating,
    open,
    setOpen,
    handleClose,
    handleChange,
    handleChangeSelect,
    fileInputChangeHandler,
    onFormSubmit,
  } = useRatingManNew();

  const { placesTop3, placesTop8 } = useAdminRatingMembers();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm'>
          Добавить в мужской рейтинг <SquaresPlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Добавить участника мужского рейтинга</DialogTitle>
        </DialogHeader>
        <form onSubmit={onFormSubmit}>
          <div className='flex flex-col gap-3 pt-3 pb-5'>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='name'>Имя</Label>
              <Input required id='name' name='name' value={ratingMemberManMutation.name} onChange={handleChange} />
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='ratingType'>Топ</Label>
              <Select
                name='ratingType'
                value={ratingMemberManMutation.ratingType}
                onValueChange={(value) => handleChangeSelect(value, 'ratingType')}
              >
                <SelectTrigger id='place'>
                  <SelectValue placeholder='Укажите в какой топ' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='mensTop8'>Топ-8</SelectItem>
                    <SelectItem value='mensTop3'>Топ-3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {(ratingMemberManMutation.ratingType === 'mensTop8' ||
              ratingMemberManMutation.ratingType === 'mensTop3') && (
              <div className='flex flex-col gap-1'>
                <Label htmlFor='place'>Место</Label>
                <Select
                  required
                  name='place'
                  value={ratingMemberManMutation.place}
                  onValueChange={(value) => handleChangeSelect(value, 'place')}
                >
                  <SelectTrigger id='place'>
                    <SelectValue placeholder='Укажите место' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {ratingMemberManMutation.ratingType === 'mensTop8'
                        ? placesTop8.map((place) => (
                            <SelectItem key={place} value={place}>
                              {place}
                            </SelectItem>
                          ))
                        : placesTop3.map((place) => (
                            <SelectItem key={place} value={place}>
                              {place}
                            </SelectItem>
                          ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className='flex flex-col gap-1'>
              <Label htmlFor='image'>Фото</Label>
              <Input required id='image' name='image' type='file' onChange={fileInputChangeHandler} />
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <Button
              type='submit'
              disabled={
                isCreating ||
                ratingMemberManMutation.ratingType === '' ||
                ratingMemberManMutation.place === '' ||
                ratingMemberManMutation.image === null
              }
            >
              Сохранить
            </Button>
            <DialogClose asChild>
              <Button type='button' variant='secondary' onClick={handleClose}>
                Отмена
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RatingManNew;
