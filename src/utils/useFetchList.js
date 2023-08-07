import { useEffect, useState } from "react";
import { BASE_URL } from "./constants";

const useFetchList = (api) => {
    const [list, setList] = useState([])

    const fetchData = async () => {
        if(api) {
        try {
       const res = await fetch(`${BASE_URL}/${api}`)

       const data = await res.json()

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