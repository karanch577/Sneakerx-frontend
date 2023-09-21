import React, { useEffect, useState } from 'react'
import Container from "../components/Container"
import useFetchList from '../utils/useFetchList'
import { useParams } from 'react-router-dom'
import CategorySimmer from '../components/CategorySimmer'
import ProductCard from '../components/ProductCard'
import { GrDown } from "react-icons/gr";
import axios from 'axios'


function Category() {
  const [showSortItem, setShowSortItem] = useState(false)
  const [productList, setProductList] = useState([])
const { id } = useParams()
  const categoryList = useFetchList("category/all").collections
  const category = categoryList?.filter(el => el._id === id)

  useEffect(() => {
  axios.get(`category/products/${id}`)
  .then(res => setProductList(res.data.products))
  .catch(err => console.log(err))

  }, [id])

  const handleToggle = () => {
    setShowSortItem(prev => !prev)
  }

  const handleSort = async (e) => {
    let api = `category/products/${id}`
    if(e.target.innerText?.includes("High-Low")){
      api = `${api}/?pricing=desc`
    } else if(e.target.innerText?.includes("Low-High")){
      api = `${api}/?pricing=asc`
    }
    
    const res = await axios.get(api)
    setProductList(res.data.products)
    console.log(productList)
  }
  
  return (
    <div>
      <Container className="px-4 sm:px-6 xl:px-2">
        <div className="left"></div>
        <div className="right ">
          {productList?.length > 0 ? 
          <div>
            <div className='text-2xl font-[500] mt-8 mb-2 flex justify-between'>
              <h2>{category?.length > 0 && category[0]?.name}</h2>
              <div onClick={handleToggle} className='relative text-base flex items-center gap-2 cursor-pointer'>
                Sort By<GrDown className={`transition ${showSortItem && "rotate-180"}`} />
                {showSortItem && 
                <div className='absolute top-6 bg-white -left-12 p-2 rounded w-36'>
                <p onClick={handleSort} className='cursor-pointer hover:opacity-50'>Newest</p>
                <p onClick={handleSort} className='cursor-pointer hover:opacity-50'>Price: High-Low</p>
                <p onClick={handleSort} className='cursor-pointer hover:opacity-50'>Price: Low-High</p>
              </div>}
              </div>
            </div>
          <div className='flex flex-wrap justify-between mb-10'>
            {productList.map(product =>
          <ProductCard key={product._id} product={product} />)}
          </div>
          </div>
        :
        <CategorySimmer />}
        </div>
      </Container>
    </div>
  )
}

export default Category