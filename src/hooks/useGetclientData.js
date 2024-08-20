import { useEffect, useState } from "react";

const useGetClientData = () =>{
    const [allCLient,setAllClient] = useState([]);

    useEffect(()=>{
        fetch('https://amin-dashboard-backend.onrender.com/api/client')
        .then(res => res.json())
        .then(data => setAllClient(data))
        .catch(error => {
            console.log(error)
        })
    },[]);
    return [allCLient,setAllClient];
}

export default useGetClientData