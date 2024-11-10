import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/app/hooks';
import { selectItemsData, selectItemsFetching } from '@/features/footers/footersSlice';
import { Loader } from '@/components/Loader/Loader';
import { EditIcon } from 'lucide-react';
import MainPartnerEditForm from '@/features/footers/components/MainPartnerForm/MainPartnerEditForm';
import { MainPartnerCard } from '@/features/footers/components/Cards/MainPartnerCard';

const MainPartner = () => {
  const mainPartnerData = useAppSelector(selectItemsData);
  const mainPartnerFetching = useAppSelector(selectItemsFetching);

  if (mainPartnerFetching) return <Loader fixed />;

  return (
    <>
      <div className='flex justify-end'>
        <MainPartnerEditForm>
          <Button className={'w-full xs:w-max'}>
            Изменить главного партнера <EditIcon />
          </Button>
        </MainPartnerEditForm>
      </div>

      {(!mainPartnerFetching && mainPartnerData.length === 0) ||
      (mainPartnerData.length > 0 && mainPartnerData[0].mainPartnerImage === '') ? (
        <small className='flex justify-center items-center flex-col mt-[30px]'>
          Изображение главного партнера не найдено.
        </small>
      ) : (
        <div className={'flex items-center gap-2 mt-3 flex-wrap'}>
          {mainPartnerData.length > 0 && <MainPartnerCard image={mainPartnerData[0].mainPartnerImage} />}
        </div>
      )}
    </>
  );
};

export default MainPartner;
