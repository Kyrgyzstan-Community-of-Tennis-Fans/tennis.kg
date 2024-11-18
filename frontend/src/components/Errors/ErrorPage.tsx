import { Link } from 'react-router-dom';

type ErrorCodes = 404 | 403 | 401;

const errorMessages: Record<
  ErrorCodes,
  {
    title: string;
    message: string;
    description: string;
    buttonLabel: string;
    buttonLink: string;
  }
> = {
  404: {
    title: '404',
    message: 'Страница не найдена',
    description: ' Страница, которую вы ищете, не существует или была перемещена',
    buttonLabel: 'Вернуться На главную',
    buttonLink: '/',
  },
  403: {
    title: '403',
    message: 'Доступ запрещен',
    description: 'У вас нет разрешения на доступ к этому ресурсу',
    buttonLabel: 'Вернуться на главную',
    buttonLink: '/',
  },
  401: {
    title: '401',
    message: 'Не авторизован',
    description: 'Вам необходимо войти в систему, чтобы получить доступ к этой странице.',
    buttonLabel: 'Войти в аккаунт',
    buttonLink: '/login',
  },
};

export const ErrorPage = ({ errorCode = 404 }: { errorCode: ErrorCodes }) => {
  const error = errorMessages[errorCode] || errorMessages[404];

  return (
    <div className='flex items-center justify-center'>
      <div className='p-8 bg-white rounded-lg   w-full max-w-5xl mt-10'>
        <div className='flex flex-col items-center'>
          <h1 className='text-5xl font-bold text-red-500 '>{error.title}</h1>
          <h2 className='mt-6 text-3xl font-bold text-gray-800 dark:text-gray-200'>{error.message}</h2>
          <p className='mt-4 text-lg text-gray-600 dark:text-gray-400'>{error.description}</p>
        </div>
        <div className='mt-8 flex justify-center space-x-4'>
          <Link
            to={error.buttonLink}
            className='inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-400'
          >
            {error.buttonLabel}
          </Link>
        </div>
      </div>
    </div>
  );
};
