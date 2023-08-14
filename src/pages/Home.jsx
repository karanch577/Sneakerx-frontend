import React from "react";
import Container from "../components/Container";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import useFetchList from "../utils/useFetchList";

function Home() {
 const productList = useFetchList("product/list?page=1&limit=9").products
 const categoryList = useFetchList("category/all").collections

  return (
    <div>
      <Container className={`px-4 sm:px-6 xl:px-2`}>
        {/* Category grid start */}
        <div>
          <h2 className="text-[20px] md:text-[24px] font-[500] my-6">The Collections</h2>
          <div className="flex overflow-auto gap-2 md:gap-7 mb-5">
          {!categoryList && <div className="flex overflow-auto gap-2 md:gap-7 mb-5">
            {/* simmer ui start */}
              {[...Array(3)].map(el => <div className="bg-[#F6F6F6] h-[140px] md:h-[360px] min-w-[9rem] w-[33vw]"></div>)}
              {/* simmer ui end */}
            </div>  }

            {categoryList?.map(category => <CategoryCard key={category._id} category={category} />)
          }
          
         </div>
        </div>
        {/* Category grid end */}

        {/* Latest Release Section start */}
        <div>
        <h2 className="text-[20px] md:text-[24px] font-[500] mt-6">Latest Releases</h2>
        <div className="flex flex-wrap justify-between mb-10">
          {/* simmer ui start */}
          {!productList && [...Array(9)].map(el => <div className="w-[49%] md:w-[32%] bg-[#F6F6F6] h-[200px] min-[500px]:h-[250px] sm:h-[350px] mt-4"></div>)}
          {/* simmer ui end */}

          {productList?.map((product) => <ProductCard key={product._id} product={product}/>)}
        </div>
        </div>
        {/* Latest Release section end */}
      </Container>
    </div>
  );
}

export default Home;
