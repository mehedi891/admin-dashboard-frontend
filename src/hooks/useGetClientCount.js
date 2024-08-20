import { useEffect, useState } from "react";


const useGetClientCount = () => {
    const [clientCount, setClientCount] = useState('');

    useEffect(() => {
        
            fetch('https://amin-dashboard-backend.onrender.com/api/client/allclientcount')
            .then(res => res.json())
            .then(data => setClientCount(data))
            .catch(error => {
                console.log(error)
            })
        

        
    }, []);

    return [clientCount, setClientCount]


}

export default useGetClientCount