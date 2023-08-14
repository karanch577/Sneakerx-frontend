import axios from "axios";
import { useEffect, useState } from "react";

const useFetchProduct = (id) => {
  const [product, setProduct] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/product/id/${id}`);
      const data = res.data

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
