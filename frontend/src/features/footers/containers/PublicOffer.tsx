import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/app/hooks';
import { selectItemsData, selectItemsFetching } from '@/features/footers/footersSlice';
import { Loader } from '@/components/Loader/Loader';
import { EditIcon } from 'lucide-react';
import PublicOfferEditForm from '@/features/footers/components/PublicOfferForm/PublicOfferEditForm';
import { PublicOfferCard } from '@/features/footers/components/Cards/PublicOfferCard';

const PublicOffer = () => {
  const publicOfferData = useAppSelector(selectItemsData);
  const publicOfferFetching = useAppSelector(selectItemsFetching);

  return (
    <div className='relative'>
      {publicOfferFetching ? (
        <div className='absolute mt-[100px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <Loader />
        </div>
      ) : (
        <>
          {' '}
          <div className='flex justify-end'>
            <PublicOfferEditForm>
              <Button disabled={publicOfferData.length === 0} className={'w-full xs:w-max'}>
                Изменить публичную оферту <EditIcon />
              </Button>
            </PublicOfferEditForm>
          </div>
          {(!publicOfferFetching && publicOfferData.length === 0) ||
          (publicOfferData.length > 0 && publicOfferData[0].publicOffer === '') ? (
            <small className='flex justify-center items-center flex-col mt-[30px]'>Публичная оферта не найдена.</small>
          ) : (
            <div className={'flex items-center gap-2 mt-3 flex-wrap'}>
              {publicOfferData.length > 0 && <PublicOfferCard publicOfferText={publicOfferData[0]?.publicOffer} />}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PublicOffer;
