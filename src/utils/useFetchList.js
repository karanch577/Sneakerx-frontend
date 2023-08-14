import axios from "axios";
import { useEffect, useState } from "react";

const useFetchList = (api) => {
    const [list, setList] = useState([])

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
    },[])

    return list;
}

export default useFetchList;