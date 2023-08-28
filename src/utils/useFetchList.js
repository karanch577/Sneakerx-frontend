import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useFetchList = (api) => {
    const [list, setList] = useState([])
    const isOrderCancelled = useSelector(store => store.user.isOrderCancelled)

    const fetchData = async () => {
        if(api) {
        try {
            const response = await axios.get(`/${api}`);
            const data = response.data;

        if(data.success) {
            setList(data)
        }

        } catch (error) {
            console.log(error)
        }
    }
    }

    useEffect(() => {
        fetchData()
    },[isOrderCancelled])

    return list;
}

export default useFetchList;