import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import UpdatesummaryData from './UpdatesummaryData';

function Updatesummary() {

        // const {app,totalAskRev,totalReviewGive,totalCallCurrMonth,totalStore,uniqueCalls} = getSUmmaryData.summary;
        
        const [getSUmmaryData, setGetSummaryData] = useState({});
        const [chooseApp,setChooseApp] = useState('total');
        const currMonth = new Date().getMonth() + 1;
        const currYear = new Date().getFullYear();
        let fullDate = currYear+'-'+currMonth;
        const [getDate,setGetDate] = useState(fullDate);
      

        const getMonthData = getDate?.split('-')[1];
        const otherMonth = getMonthData.toString().length === 1 ? '0' + getMonthData : getMonthData;
        const otherYear = getDate?.split('-')[0];
    useEffect(() => {
        const url = `http://localhost:3001/api/summary/${otherMonth}-${otherYear}/${chooseApp}`;
        
        //console.log(url)
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        setGetSummaryData(data);
                        console.log('data:',data);
                      
                    })
                    .catch(error =>{
                     
                    })
        
            }, [getDate,otherMonth,otherYear,chooseApp]);
 
            //conditional destructure from summary API data
        // const {app,totalAskRev,totalCallCurrMonth,totalReviewGive,totalStore,uniqueCalls} = getSUmmaryData.summary !== undefined  &&  getSUmmaryData.summary ;
       
       

       


  return (
    <div className='updateSummary'>
      <div className='summary-conatiner'>
            <h2>Update Summary : {getSUmmaryData.message ? getSUmmaryData.message  :getSUmmaryData.monthName} for {chooseApp} </h2>
            <div className='search-summary-container'>

                <form className='showTotalSummary'>

                    <div className="mainSummaruShowDiv">
                    <div className="chooseMonthYear">
                        <label>Choose Date</label>
                    <input defaultValue={currMonth.toString().length === 1 ? currYear + '-0' + currMonth : currYear + '-' + currMonth} type="month" onBlur={(e)=> setGetDate(e.target.value) } name="date"  />
                    </div>
                    <div className='chooseApp'>
                        <label>Select APP</label>
                       <select name="chooseApp" defaultValue='total' onChange={(e)=>setChooseApp(e.target.value)}>
                            <option value="total">Total</option>
                            <option value="ib">Inkybay</option>
                            <option value="mv">Multivariants</option>
                            <option value="dr">Discount Ray</option>
                       </select>
                       
                    </div>
                    </div>
                   
                </form>
                
              
            </div>
            </div>

{
    getSUmmaryData?.summary?.app &&

            <UpdatesummaryData
            key={getSUmmaryData.summary._id}
            getSUmmaryData={getSUmmaryData}

            ></UpdatesummaryData>
        }
 


 
  
    </div>
  )
}

export default Updatesummary
