import { useEffect, useState } from "react";
import { BASE_URL } from "./constants";

const useFetchProduct = (id) => {
  const [product, setProduct] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/product/id/${id}`);
      const data = await res.json();

      if (data.success) {
        setProduct(data.product);
      }
    } catch (error) {
        console.log(error)
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return product;
};

export default useFetchProduct;
