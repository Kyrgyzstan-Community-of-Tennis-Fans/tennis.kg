import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { selectSelectedRank, setRank } from '@/features/tournaments/tournamentsSlice';

const RankFilter = () => {
  const dispatch = useAppDispatch();
  const selectedRank = useAppSelector(selectSelectedRank);

  const handleRankChange = (rank: string | undefined) => {
    dispatch(setRank(rank));
  };

  const triggerBaseStyles =
    'dark:text-white dark:data-[state=active]:text-[#64B32C] data-[state=active]:text-[#64B32C] data-[state=active]:border-[#64B32C] data-[state=active]:shadow-none rounded-none border-b-2 border-b-transparent bg-transparent leading-7 hover:bg-transparent hover:text-[#64B32C] dark:hover:text-[#64B32C]';

  return (
    <Tabs value={selectedRank} onValueChange={handleRankChange}>
      <TabsList className='flex justify-between bg-transparent border-b-2 rounded-none text-black px-0'>
        {[
          { value: 'all', label: 'Все' },
          { value: 'male', label: 'Мужские' },
          { value: 'female', label: 'Женские' },
          { value: 'mixed', label: 'Микст' },
        ].map(({ value, label }) => (
          <TabsTrigger key={value} value={value} className={triggerBaseStyles}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default RankFilter;
