import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { EventCard } from '@/features/ratings/components/EventCard/EventCard';
import { getMonth } from '@/lib/getMonth';
import type { Rating } from '@/types/ratingTypes';
import React from 'react';

interface Props {
  ratings: Rating[];
}

export const RatingBlock: React.FC<Props> = ({ ratings }) => {
  return (
    <Accordion type='single' collapsible>
      {ratings.map((rating, index) => (
        <AccordionItem key={index} value={`item-${index}`} className={'px-4'}>
          <AccordionTrigger className={'capitalize text-lg'}>
            {getMonth(rating.month)} － {rating.year}
          </AccordionTrigger>
          <AccordionContent>
            {rating.events.length === 0 ? (
              <span className={'block text-center text-muted-foreground'}>
                В {getMonth(rating.month, 'ending')} {rating.year} году нет событий
              </span>
            ) : (
              <div className={'grid gap-2 sm:grid-cols-2 lg:grid-cols-3'}>
                {rating.events.map((event, index) => (
                  <EventCard key={index} event={event} ratings={ratings} />
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
