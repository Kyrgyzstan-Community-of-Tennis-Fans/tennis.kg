import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const WarningMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className='flex items-start gap-3 p-2 mb-2 border-l-4 border-yellow-500 bg-yellow-50 rounded-md text-yellow-800'>
    <ExclamationCircleIcon className='w-5 h-5 mt-1 shrink-0' />
    <small>
      <strong>Предупреждение:</strong> {message}
    </small>
  </div>
);

export default WarningMessage;
