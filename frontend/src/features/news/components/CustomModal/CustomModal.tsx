import React from 'react';

interface PropsWithChildren {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const CustomModal: React.FC<PropsWithChildren> = ({ open = false, onClose, children }) => {
  return open ? (
    <div
      className='fixed inset-0 z-40 flex w-full items-center justify-center bg-black bg-opacity-50'
      onClick={onClose}
    >
      <button
        onClick={() => {
          onClose();
        }}
        className='absolute top-3 right-3 p-1 text-gray-500 hover:text-white'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className='h-8 w-8'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
        </svg>
      </button>
      <div className='shadow-lg overflow-hidden '>
        <div className='w-[80%]'>{children}</div>
      </div>
    </div>
  ) : null;
};
