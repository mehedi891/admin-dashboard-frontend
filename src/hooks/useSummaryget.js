import { useEffect, useState } from "react";


const useSummaryget = () =>{

    const [getSummary, setGetSummary] = useState([]);

    useEffect(()=>{

        fetch('https://amin-dashboard-backend.onrender.com/summary')
        .then(res => res.json())
        .then(data => setGetSummary(data))

    },[]);

    return [getSummary, setGetSummary]

}

export default useSummaryget