import { CategoryRoot } from '@/types/category.type';
import getSubCategory from '@/apis/subCategory';
import React, { createContext, useState } from 'react'

export const categoryContext = createContext({})

const CategoryContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [selectedCategory, setSelectedCategory] = useState<CategoryRoot | null>(null);
    const [subcategories, setSubcategories] = useState<CategoryRoot[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function selectCategory(category: CategoryRoot) {
        setSelectedCategory(category);
        await loadSubcategories(category._id);
    }

    async function loadSubcategories(categoryId: string) {
        setIsLoading(true);
        try {
            const data = await getSubCategory(categoryId);
            setSubcategories(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setSubcategories([]);
            setIsLoading(false);
        }
    }

    function clearCategory() {
        setSelectedCategory(null);
        setSubcategories([]);
    }

    return (
        <categoryContext.Provider value={{
            selectedCategory,
            subcategories,
            isLoading,
            selectCategory,
            loadSubcategories,
            clearCategory
        }}>
            {children}
        </categoryContext.Provider>
    )
}

export default CategoryContextProvider