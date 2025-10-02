import { GetAllBrands } from '@/apis/BrandsActions/getAllBrands';
import { getSpecificBrand } from '@/apis/BrandsActions/getSpecificBrand';
import { BrandsRoot } from '@/types/brands.type';
import React, { createContext, useEffect, useState } from 'react'

interface BrandsContextType {
    brands: BrandsRoot[];
    selectedBrand: BrandsRoot | null;
    isLoading: boolean;
    isModalOpen: boolean;
    selectBrand: (brandId: string) => Promise<void>;
    closeModal: () => void;
    getAllBrandsData: () => Promise<void>;
}

export const brandsContext = createContext<BrandsContextType>({} as BrandsContextType)

const BrandsContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [brands, setBrands] = useState<BrandsRoot[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<BrandsRoot | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function getAllBrandsData() {
        setIsLoading(true);
        try {
            const { data }: { data: BrandsRoot[] } = await GetAllBrands();
            setBrands(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching brands:', error);
            setIsLoading(false);
        }
    }

    async function selectBrand(brandId: string) {
        try {
            const brandDetails = await getSpecificBrand(brandId);
            setSelectedBrand(brandDetails.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching brand details:', error);
            // Fallback to find brand from existing brands list
            const fallbackBrand = brands.find(brand => brand._id === brandId);
            if (fallbackBrand) {
                setSelectedBrand(fallbackBrand);
                setIsModalOpen(true);
            }
        }
    }

    function closeModal() {
        setIsModalOpen(false);
        setSelectedBrand(null);
    }

    useEffect(function () {
        getAllBrandsData();
    }, [])

    return (
        <brandsContext.Provider value={{
            brands,
            selectedBrand,
            isLoading,
            isModalOpen,
            selectBrand,
            closeModal,
            getAllBrandsData
        }}>
            {children}
        </brandsContext.Provider>
    )
}

export default BrandsContextProvider
