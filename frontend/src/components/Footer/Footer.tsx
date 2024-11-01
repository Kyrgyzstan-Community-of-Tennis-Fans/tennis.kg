import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { FacebookIcon, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <div className={'bg-cr-shark pt-8 pb-4'}>
      <div
        className={
          'mx-auto flex flex-col items-center justify-center lmd:items-start lmd:flex-row max-w-7xl p-6 lg:px-8 lmd:justify-evenly gap-10'
        }
      >
        <div className={'basis-1/4 flex flex-col gap-5 lmd:gap-10'}>
          <div className={'flex lg:flex-1 justify-evenly lmd:justify-start'}>
            <NavLink to='/' className={'-m-1.5 p-1.5'}>
              <span className='sr-only'>Your Company</span>
              <svg width='98' height='36' viewBox='0 0 98 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M0 0.486092V27.7948H7.70459V16.8966H9.18719C12.355 16.8966 13.5955 19.3659 14.4603 22.0832C15.0781 24.0275 15.5723 25.9719 16.5607 27.7948H25.1252C23.603 24.8345 22.4911 21.5533 21.3791 18.4326C20.3067 15.3945 18.5375 13.1245 15.2016 12.2349L25.5798 0.486092H15.8589L8.03076 11.3016H7.70459V0.486092H0ZM70.0381 6.72752H72.1138V0.486092H92.4946V6.72752H85.8081V27.7948H78.0195V8.86632L73.1071 7.08723V9.41561H70.0381V27.7948H62.2693V6.64488H56.6107C56.6107 15.6327 57.3866 24.6692 47.2209 27.4253L44.7005 20.7756C46.3422 19.8654 47.5768 18.3822 48.1599 16.6195C48.2878 16.1986 48.3788 15.7676 48.4317 15.3314C49.2175 10.101 48.7677 6.3192 48.9259 0.486092H70.053V6.72752H70.0381ZM43.4501 28.1156C41.2206 28.3464 38.9746 28.3805 36.7389 28.2177C26.8549 27.5274 22.4071 21.4901 22.4071 14.6071C22.3873 5.10397 29.9634 0 39.0666 0C40.2017 0.000650088 41.3351 0.0867781 42.4568 0.257629L44.399 7.06292C42.7839 6.4769 41.0794 6.16462 39.3581 6.13935C34.7028 6.13935 30.5811 8.6087 30.5811 14.0383C30.5811 20.0319 36.1804 22.6665 41.1224 21.9617L43.4501 28.1156Z'
                  fill='white'
                />
                <path
                  d='M71.0727 8.52254C70.3709 8.89684 70.1782 8.67809 69.2837 8.16284L68.8192 7.24412C67.7517 7.03024 67.3366 7.84201 66.5014 8.25033C64.8458 9.06211 64.6778 9.52389 63.4077 10.3308C63.3088 10.394 63.1853 10.3989 62.9135 10.5301L62.0585 11.0162C61.6594 11.2229 61.2384 11.3859 60.8032 11.5023C60.2102 11.6724 60.0026 11.5946 59.118 11.8814C58.5798 12.0509 58.0614 12.2758 57.5711 12.5522L56.4493 13.1939C55.8612 13.573 53.7955 14.589 53.5978 14.798C53.3057 15.0351 52.9702 15.2149 52.6094 15.3278C52.4661 15.4348 52.6094 15.3813 52.4858 15.4737C52.449 15.5099 52.3995 15.5308 52.3474 15.532L51.9274 15.6244C51.677 15.68 51.4358 15.77 51.2108 15.8917C51.1064 15.9429 51.0099 16.0083 50.9241 16.0861C50.8105 16.2077 50.7759 16.2222 50.5683 16.1882C49.5799 16.0229 48.5372 15.8382 47.6031 15.6195C47.144 15.4691 46.7108 15.2512 46.3182 14.973C45.4797 14.4105 44.7289 13.7309 44.0894 12.9557C43.6885 12.4324 43.1842 11.9943 42.6068 11.6676L42.5079 11.6141C41.6725 11.1575 40.7355 10.9104 39.7799 10.8947C36.1327 10.744 35.0109 15.0362 37.986 16.9805C38.2721 17.1239 38.5696 17.2442 38.8755 17.3403C39.9727 17.5639 40.6349 17.7583 41.7864 17.5055C42.4733 17.35 43.0169 17.0194 43.7039 16.8639C43.7793 16.8541 43.8537 16.8379 43.9263 16.8153L44.5836 16.6063C44.8753 16.5336 45.1705 16.4752 45.4682 16.4313C46.1557 16.3232 46.8574 16.3397 47.5389 16.4799C47.697 16.5139 47.6229 16.4799 47.7909 16.4799C48.3197 16.5528 48.9918 16.8493 49.575 16.9368C49.6392 17.1847 49.5305 17.3111 49.8418 17.4861C49.9802 17.5687 50.1186 17.4861 50.2619 17.3791L50.3311 17.3354C50.4052 17.2965 50.3311 17.3354 50.4052 17.3062C50.4991 17.7097 50.1878 17.8798 50.7512 17.9819L50.8994 17.8458C51.0378 17.8993 51.0576 18.0013 51.2306 17.9868C51.2942 17.9727 51.3569 17.9548 51.4184 17.9333C51.6655 17.8798 51.5419 18.1861 52.0954 17.8507L52.1646 17.8118C52.5228 17.6772 52.8443 17.4626 53.1036 17.1847C53.3973 16.7593 53.8505 16.4657 54.3638 16.3681C54.9222 16.2854 55.4313 15.882 55.9699 15.6973C56.1973 15.6195 56.4641 15.532 56.6816 15.4834C57.1758 15.3619 57.67 15.2646 58.1642 15.1188C58.6584 14.973 59.0538 14.7299 59.5134 14.5793L61.8509 13.6071C62.2144 13.5286 62.563 13.3941 62.8838 13.2085C63.6301 12.8439 64.5789 12.1877 65.2757 11.9884C65.6714 11.8287 66.0775 11.6955 66.4915 11.5898C66.6249 11.5655 66.7435 11.512 66.8671 11.478C67.0895 11.4148 67.2476 11.546 67.4453 11.653C67.8802 11.8766 68.3101 12.0175 68.75 12.2168C68.9081 12.2898 68.9427 12.3578 69.086 12.4259C70.2128 12.9654 73.0742 16.4896 73.608 17.3986C73.7068 17.559 73.7809 17.559 73.9144 17.6805C73.8452 18.1666 67.8752 21.054 67.386 21.2873C67.0153 21.4477 66.7929 21.6568 66.3976 21.8269C65.9782 22.1329 65.674 22.5672 65.5327 23.0616C65.1917 24.3108 64.9347 24.2039 64.7667 24.6171C64.7321 24.6754 61.4506 29.5315 61.3073 29.6287C61.164 29.7259 61.0948 29.8814 60.9811 29.9981L60.8477 30.1245C59.5875 31.2814 59.9235 30.7904 59.5084 30.6689L59.0587 30.9654C58.2927 29.5072 58.7721 31.2231 58.7671 31.2328C58.6535 31.5099 58.0752 31.2328 57.8874 31.1842C57.6082 31.0991 57.3384 30.9867 57.0819 30.8488C56.9583 30.8099 56.9831 30.8488 56.8694 30.7759C56.7557 30.7029 56.7656 30.7029 56.6816 30.6592C56.2783 30.4468 55.9378 30.1353 55.6932 29.7551C55.6388 29.5898 55.6932 29.5558 55.2583 29.5703C55.0211 29.5703 55.1298 29.619 55.031 29.6627C54.7937 29.7648 54.7394 29.4099 54.5812 30.3043C54.5767 30.5196 54.6241 30.7328 54.7196 30.9265C55.032 31.6993 55.4021 32.4483 55.8266 33.1674C55.9205 33.3133 56.0144 33.4348 56.1133 33.5757C56.1532 33.6419 56.1978 33.7053 56.2467 33.7653C56.6421 34.2514 56.9633 34.825 57.329 35.3548L57.3735 35.4229C57.5118 35.6222 57.6354 35.909 57.9171 35.9916C58.006 35.909 57.9616 35.9284 58.0703 35.8507L58.1642 35.802C58.2334 35.802 58.1642 35.802 58.2877 35.802C58.3174 35.6027 58.3668 35.5444 58.5151 35.4861L58.861 35.3451C58.9137 35.3115 58.9681 35.2806 59.0241 35.2528C59.1756 35.1282 59.3131 34.988 59.4343 34.8347L59.8395 34.4458C60.1262 34.1348 60.4079 34.1202 60.1459 33.6632C60.2449 33.4869 60.3661 33.3236 60.5067 33.1771C60.8131 32.832 60.6747 33.041 60.8131 32.555C60.9607 32.5174 61.0954 32.4419 61.2035 32.3362L61.6977 31.9084L61.8114 31.7966C62.8443 30.9654 63.8969 30.1342 64.9397 29.3079C65.4978 28.8068 65.9953 28.2441 66.4223 27.6308C67.0049 26.896 67.4668 26.0759 67.7912 25.2004C67.9049 24.865 67.9395 24.899 68.2063 24.7532C68.5604 24.5302 68.9425 24.3537 69.343 24.2282C69.4567 24.1942 69.5456 24.1553 69.6593 24.1261C71.4631 23.5136 74.967 22.9255 76.0444 22.4588C76.3158 22.2918 76.5981 22.1424 76.8895 22.0116C77.0773 21.8949 77.2206 21.7734 77.3837 21.6713C77.5245 21.8164 77.6443 21.98 77.7395 22.1574C78.1101 22.6435 78.466 23.0761 78.8218 23.5865C78.9107 23.7129 79.0936 23.7858 79.2814 23.9949L80.1166 24.865C80.5857 25.3797 80.9982 25.9419 81.3471 26.542L81.8908 27.2711C82.5481 27.9371 83.1312 27.6454 83.9417 27.8058C84.0569 27.8344 84.1774 27.8344 84.2926 27.8058C84.7522 27.8058 86.6252 28.3308 87.1441 28.3989C87.2798 28.4214 87.4136 28.4539 87.5444 28.4961C89.1061 28.9044 90.5739 29.0599 92.0664 29.7259L92.694 30.0564C92.8983 30.1682 93.0948 30.2932 93.2821 30.4307C93.1981 30.6397 93.1536 30.4696 93.0745 30.6981C93.0277 30.8253 93.0277 30.9646 93.0745 31.0918C93.1882 31.2911 93.5984 31.2717 93.8554 31.3446C94.0778 31.8744 93.8554 31.8015 94.5275 32.1661C94.6118 32.2052 94.6872 32.2606 94.7492 32.3291C94.8112 32.3976 94.8585 32.4778 94.8882 32.5647C95.0217 32.9924 95.1897 32.8806 95.249 33.0508C95.2885 33.1723 95.249 33.1577 95.2787 33.2549C95.3075 33.3553 95.3525 33.4505 95.4121 33.5369C95.2312 33.9564 94.9497 34.3266 94.5917 34.616C94.6217 34.8968 94.6746 35.1747 94.7499 35.4472C95.0415 35.7 95.9804 35.6076 96.2325 35.5396C96.3243 35.5256 96.4118 35.4918 96.4888 35.4405C96.5657 35.3892 96.6301 35.3218 96.6772 35.243C96.8495 34.918 96.9632 34.566 97.0133 34.2028C97.0133 33.9598 97.0133 34.1347 97.0825 33.9014C97.1517 33.6681 97.0528 33.7167 97.0825 33.5271C97.2505 32.8952 97.2802 32.6716 97.4037 31.9959L97.5718 30.7807C97.7464 29.9781 97.8767 29.1667 97.9622 28.3503C97.8979 28.219 97.888 28.2384 97.6854 28.1898C96.8848 28.0148 97.6261 28.394 96.6377 28.0537C96.3986 27.9733 96.1405 27.9648 95.8964 28.0294H95.8668C95.706 28.0968 95.5409 28.1537 95.3726 28.1996C95.3281 28.0926 95.3726 28.1558 95.2836 28.0635C95.0365 28.0635 94.9525 28.0197 94.7647 28.1315L94.5917 28.1996C94.46 28.2349 94.3198 28.2228 94.1964 28.1655C93.5193 27.9371 93.0795 27.7135 92.437 27.4315C92.2739 27.3586 92.2739 27.3149 92.1306 27.2468C91.8291 27.1177 91.5354 26.9716 91.2509 26.8093C91.1027 26.6732 90.9594 26.6732 90.8111 26.5517C90.6573 26.452 90.4913 26.3719 90.3169 26.3135C90.0994 26.2163 90.0006 26.1239 89.8227 26.0462C89.6448 25.9684 89.5608 25.8566 89.3779 25.7594C89.0672 25.5628 88.7358 25.3998 88.3895 25.2733L87.1837 24.9282C86.3979 24.7483 85.1327 24.9282 84.8115 24.69C84.4903 24.4518 84.5496 24.3692 84.3815 24.131C83.3487 22.4296 79.148 13.0092 79.7064 12.6981C79.8497 12.6203 80.5169 13.0335 80.6355 13.0675C81.2187 13.1696 82.7655 13.2814 83.1065 13.5001C83.2943 13.6119 83.2498 13.6411 83.3734 13.7869C83.6719 14.1911 84.0024 14.5714 84.3618 14.9244L84.4211 14.9778L84.9153 15.4639C85.9877 16.2903 86.4325 16.9854 87.2924 17.8944C88.1424 18.677 87.8657 19.0707 88.3944 19.8874C88.4626 20.0012 88.5221 20.1198 88.5724 20.2422C88.6267 20.3686 88.7799 20.7964 88.8195 20.9228C88.8837 21.1318 88.7898 21.1658 88.8639 21.3651C89.2198 21.3991 89.1802 20.461 89.1506 20.2471C89.4965 20.3881 89.6448 20.7575 89.8968 21.0151C90.1457 21.2889 90.4483 21.5105 90.7864 21.6665L90.8655 21.5595C90.9 21.5109 90.7913 21.4526 90.737 21.3797V21.3554L90.6431 21.2339C90.5567 21.1017 90.4555 20.9794 90.3416 20.8693L90.2724 20.7964C90.1312 20.6118 90.0102 20.413 89.9116 20.2033C89.882 20.1304 89.9759 20.0818 89.9759 20.077C90.2922 20.2471 90.5442 20.5631 90.8506 20.7332C91.3844 21.0248 91.7352 21.4234 91.839 20.913L91.4783 20.636C91.0582 20.3783 90.7419 20.0381 90.3218 19.8339C90.3503 19.7433 90.3993 19.6602 90.4651 19.5909C90.8506 19.7756 91.582 20.3249 91.9823 20.3394L92.0812 20.0721C91.522 19.8129 90.992 19.4968 90.4997 19.1291C90.559 19.027 90.5887 18.9006 90.6974 18.8617C90.9495 18.8326 91.7303 19.1777 91.9082 19.1242L91.9478 18.852C91.3398 18.7431 90.7528 18.5413 90.2082 18.2541C89.8919 18.0062 89.8622 17.768 89.2198 17.5055C88.9633 17.3988 88.7275 17.2491 88.5229 17.0632C88.0287 16.5771 86.2694 14.0446 85.8394 13.5487C85.7999 13.4953 85.024 12.5474 84.8955 12.4356C84.6635 12.192 84.4176 11.9616 84.1591 11.7453C82.1379 10.4086 80.334 9.92735 78.5351 8.44477C78.3029 8.25033 78.1546 8.04131 77.9372 7.85174C77.6078 7.61606 77.2469 7.42631 76.8647 7.28787C76.761 7.21496 76.2668 7.12746 76.1926 7.08371C75.8912 6.91358 73.7463 6.80178 73.3708 6.78233C73.4251 6.45665 73.7365 6.34971 73.8106 6.11153C74.0083 5.47474 74.1318 4.75533 74.1466 4.70186C74.3048 4.21577 73.7266 3.32136 73.4004 3.00053C72.58 2.2082 71.0925 2.61652 70.2968 3.23386C70.1367 3.40097 70.0034 3.59111 69.9015 3.79773C69.6481 4.09473 69.4612 4.44089 69.3529 4.81366C69.2096 5.36085 69.1529 5.9265 69.1849 6.49068C69.348 6.87955 69.3628 7.3219 69.5308 7.71077C70.3413 8.28436 70.025 8.44963 71.1073 8.26005C71.2556 8.31352 71.3593 8.26005 71.5076 8.31352C71.3396 8.33783 71.2407 8.48852 71.0727 8.51282V8.52254ZM44.5836 16.2271C44.6626 15.8674 45.1123 14.832 44.974 14.5695C45.1917 14.6806 45.3956 14.816 45.5818 14.973C45.98 15.2228 46.3628 15.4955 46.7284 15.7896C46.5851 15.9938 46.4269 15.8966 46.1749 15.916C44.6676 16.0375 45.4682 16.1007 44.5836 16.2271Z'
                  fill='#64B32C'
                />
              </svg>
            </NavLink>
          </div>
          <div>
            <p style={{ color: '#D9DBE1' }}>Copyright © 2022 KSLT</p>
            <p className={'text-center lmd:text-left'} style={{ color: '#D9DBE1' }}>
              All rights reserved
            </p>
          </div>
          <div className={'flex inline-flex text-white gap-5'}>
            <a
              href=''
              className={'w-10 h-10 flex justify-center items-center rounded-full'}
              style={{ background: '#373A40', cursor: 'pointer' }}
            >
              <Instagram className={'w-5 h-5'} />
            </a>
            <a
              href=''
              className={'w-10 h-10 flex justify-center items-center rounded-full'}
              style={{ background: '#373A40', cursor: 'pointer' }}
            >
              <FacebookIcon className={'w-5 h-5'} fill={'white'} />
            </a>
            <a
              href=''
              className={'w-10 h-10 flex justify-center items-center rounded-full'}
              style={{ background: '#373A40', cursor: 'pointer' }}
            >
              <Mail className={'w-5 h-5'} fill={'gray'} />
            </a>
          </div>
        </div>
        <div
          className={
            'flex flex-col text-center xs:text-left xs:flex-row xs:justify-between xs: basis-1 lmd:basis-1/2 text-cr-white gap-10 xs:gap-0'
          }
        >
          <div className={'basis-1/3'}>
            <h1 className={'pb-7 text-lg xs:text-xl'}>О нас</h1>
            <ul className={'flex flex-col gap-4 text-sm xs:text-base'} style={{ color: '#D9DBE1' }}>
              <li>
                <NavLink to={'/calendar'} className={'hover:text-white'}>
                  Календарь
                </NavLink>
              </li>
              <li>
                <NavLink to={'/rating'} className={'hover:text-white'}>
                  Рейтинг
                </NavLink>
              </li>
              <li>
                <NavLink to={'/blog'} className={'hover:text-white'}>
                  Блог
                </NavLink>
              </li>
              <Menu as='li' className='relative inline-block'>
                <div>
                  <MenuButton className='inline-flex justify-center hover:text-white'>
                    Положение
                    <ChevronDownIcon aria-hidden='true' className='-mr-1 h-5 w-5 text-gray-400' />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className='absolute -left-8 top-full z-10 mt-3 w-screen max-w-xs overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in'
                >
                  <div className='py-5'>
                    <MenuItem>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]'
                      >
                        Положение КСЛТ
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]'
                      >
                        Форма заявки на проведение турнира
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]'
                      >
                        Таблица начисления рейтинговых очков
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]'
                      >
                        Таблица начисления рейтинговых очков
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </ul>
          </div>
          <div className={'basis-1/3'}>
            <h1 className={'pb-7 text-lg xs:text-xl'}>Условия</h1>
            <ul style={{ color: '#D9DBE1' }} className={'gap-4 text-sm xs:text-base'}>
              <li>
                <p className={'hover:text-white'}>Публичная оферта</p>
              </li>
            </ul>
          </div>
          <div className={'basis-1/3'}>
            <h1 className={'pb-7 text-xl'}>Главный партнер</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
