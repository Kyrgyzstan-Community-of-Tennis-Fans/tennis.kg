import { Login } from '@/features/users/Login';
import { Register } from '@/features/users/Register';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "@/components/Home/Home";
import {BlockCarousel} from "@/features/carousel/BlockCarousel";
export const App: React.FC = () => {
  return (
    <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/carousel'} element={<BlockCarousel />} />
    </Routes>
  );
};
