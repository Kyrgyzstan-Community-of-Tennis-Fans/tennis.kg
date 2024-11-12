import React from 'react';
import { Layout } from '@/components/Layout';
import CalendarPage from '@/features/tournaments/CalendarPage';

const Calendar: React.FC = () => {
  return (
    <Layout>
      <CalendarPage />
    </Layout>
  );
};

export default Calendar;
