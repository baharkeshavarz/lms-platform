import { getCategories } from '@/actions/getCategories';
import React from 'react'
import Categories from './_components/Categories';

const Search = async () => {
  const categories = await getCategories();
  
  return (
    <div className="p-6">
       <Categories 
           items={categories}
        />
    </div>
  )
}

export default Search