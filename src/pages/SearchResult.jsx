import React from 'react'
import { useSelector } from 'react-redux'
import CategoryCard from '../components/CategoryCard';
import SearchResultProduct from '../components/searchResultProduct';

function SearchResult() {
    const result = useSelector(store => store.search.searchResult)
    const categoryList = useSelector(store => store.navbar.categoryList)
  return (
    <div className='px-5 mb-5'>
        {result?.length ? <div>
            <h2 className='my-4 text-xl max-w-4xl mx-auto'>Search Result</h2>
            {result.map(el => <SearchResultProduct product={el} />)}
        </div>
        :
        <div className='my-5 text-xl'>
            <p>No result found</p>
            <p className='my-5'>You may like this</p>

            <div className="flex overflow-auto gap-2 md:gap-7 mb-5">
          {!categoryList && <div className="flex overflow-auto gap-2 md:gap-7 mb-5">
            {/* simmer ui start */}
              {[...Array(3)].map((el, i) => <div key={i} className="bg-[#F6F6F6] h-[140px] md:h-[360px] min-w-[9rem] w-[33vw]"></div>)}
              {/* simmer ui end */}
            </div>  }

            {categoryList?.map(category => <CategoryCard key={category._id} category={category} />)
          }
          
         </div>
        </div>    
    }
    </div>
  )
}

export default SearchResult