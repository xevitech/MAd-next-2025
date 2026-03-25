
import { apiClient } from "@/components/common/common";
import FooterPage from "@/components/common/include/footerPart";
import HeaderPage from "@/components/common/include/headerPart";
import dynamic from "next/dynamic";
import Head from "next/head";
import SingleSectorPage from '@/components/category/SingleSectorStep';
import React from 'react';

const SingleSector = () => {
   
    return (
        <>
        
            <HeaderPage />
            <SingleSectorPage />
            <FooterPage />
        </>
    );
};

export default SingleSector;

