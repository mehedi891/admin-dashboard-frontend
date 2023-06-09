import { useEffect, useState } from "react";


const useSummaryget = () =>{

    const [getSummary, setGetSummary] = useState([]);

    useEffect(()=>{

        fetch('http://localhost:3001/summary')
        .then(res => res.json())
        .then(data => setGetSummary(data))

    },[]);

    return [getSummary, setGetSummary]

}

export default useSummaryget