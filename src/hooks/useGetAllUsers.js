import { useEffect, useState } from "react";


const useGetAllUsers = () => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        fetch('https://amin-dashboard-backend.onrender.com/api/user/')
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(error => {
            console.log(error)
        })
    }, []);

    return [users, setUsers]


}

export default useGetAllUsers