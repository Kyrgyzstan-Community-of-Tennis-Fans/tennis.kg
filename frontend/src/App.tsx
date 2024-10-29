import { Login } from '@/features/users/Login';
import { Register } from '@/features/users/Register';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {BlockCarousel} from '@/features/carousel/BlockCarousel';
import AdminPaneBlockCarousel from "@/features/carousel/AdminPaneBlockCarousel";
export const App: React.FC = () => {
  return (
    <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/carousel'} element={<BlockCarousel />} />
        <Route path={'/admin-panel-block-carousel'} element={<AdminPaneBlockCarousel/>}/>
    </Routes>
  );
};
