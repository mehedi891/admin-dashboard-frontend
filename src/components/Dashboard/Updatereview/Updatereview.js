import React, { useEffect, useState } from 'react'
import './Updatereview.css'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

function Updatereview() {
    const [cData, setCData] = useState({});
    const { id } = useParams();


    const [getSUmmaryData, setGetSummaryData] = useState({});
    const [chooseApp, setChooseApp] = useState('total');
    const currMonth = new Date().getMonth() + 1;
    const currYear = new Date().getFullYear();
    let fullDate = currYear + '-' + currMonth;
    const [getDate, setGetDate] = useState(fullDate);


    const getMonthData = getDate?.split('-')[1];
    const otherMonth = getMonthData.toString().length === 1 ? '0' + getMonthData : getMonthData;
    const otherYear = getDate?.split('-')[0];
    useEffect(() => {
        const url = `https://amin-dashboard-backend.onrender.com/api/summary/${otherMonth}-${otherYear}/${chooseApp}`;

        //console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setGetSummaryData(data);
                //console.log('data:',data);

            })
            .catch(error => {

            })

    }, [getDate, otherMonth, otherYear, chooseApp]);

    useEffect(() => {
        fetch(`https://amin-dashboard-backend.onrender.com/api/client/${id}`)
            .then(res => res.json())
            .then(data => {
                setCData(data);
                setChooseApp(data.app)
            })
    }, [id]);

    //console.log(cData)



    const handleUpdateReview = (e)=>{
        e.preventDefault();
        const reviewGiven = e.target.reviewGiven.value;
        const reviewAsk = e.target.reviewAsk.value;
        const reasonFromAskRev = e.target.reasonFromAskRev.value;
        const reasonFromGivRev = e.target.reasonFromGivRev.value;

        const updatedClientData = {reviewAsk,reviewGiven,reasonFromAskRev,reasonFromGivRev};
        

                // variable with condition for summary data
           
                const incTotalAskRev = reviewAsk === "yes" & reviewAsk !== cData.reviewAsk ? true : false;
        
                const incTotalReviewGive = reviewGiven === "yes" & reviewGiven !== cData.reviewGiven ? true : false; 

                const summarObj = { incTotalAskRev, incTotalReviewGive }

                console.log(summarObj)

        if(
            cData.reviewGiven !== reviewGiven||
            cData.reviewAsk !== reviewAsk
        ){
            fetch(`https://amin-dashboard-backend.onrender.com/api/client/${cData._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updatedClientData)
            })
                .then(res => res.json())
                .then(data => {
                  
                   if(data.updatedClient.acknowledged){
                
                    toast.success(`Review Data Updated for Client ${cData.storeUrl}`);
                    fetch(`https://amin-dashboard-backend.onrender.com/api/summary/${otherMonth}-${otherYear}/${cData.app}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(summarObj)
                    })
                        .then(res => res.json())
                        .then(data => {
                           if(data.result.acknowledged){
                            toast.success(data.message);
                           } 
                        })
                   } 
                })
        }else{
            console.log('No data to chage')
        }

    }


    return (
        <div className='updateReview'>
            {
                cData._id &&

                <div className='updateSummary'>
                    <div className='summary-conatiner'>
                        <h2>Update Review : {getSUmmaryData.message ? getSUmmaryData.message : getSUmmaryData.monthName} for : {cData.storeUrl} APP: {cData.app} </h2>
                        <div className='search-summary-container'>

                            <form className='showTotalSummary'>

                                <div className="mainSummaruShowDiv">
                                    <div className="chooseMonthYear">
                                        <label>Choose Date</label>
                                        <input defaultValue={currMonth.toString().length === 1 ? currYear + '-0' + currMonth : currYear + '-' + currMonth} type="month" onBlur={(e) => setGetDate(e.target.value)} name="date" />
                                    </div>
                                    
                                </div>

                            </form>


                        </div>
                    </div>
                    <div className="updateReviewCont">
                        <form onSubmit={handleUpdateReview}>
                        {cData.reviewAsk !== undefined &&
                    <div className="inputConditionGroup">
                        <h4>Review Asked</h4>
                        <div className="reviewAskDiv flex-row">
                            <div className="reviewAskYesDiv">
                                <input type="radio" name="reviewAsk" id="reviewAskY" value='yes'
                                    defaultChecked={cData.reviewAsk === 'yes' ? true : false}
                                />
                                <label>Yes</label>

                                <div className="reviewGivenDiv">
                                    <h4>Review Given</h4>
                                    <div className='flex-row'>
                                        <div className="reviewGivenYes">
                                            <input type="radio" name="reviewGiven" id="reviewGivenY" value='yes'
                                                defaultChecked={cData.reviewGiven === 'yes' ? true : false}
                                            />
                                            <label >Yes</label>
                                            <div className="reviewGivenCele">
                                                <h5 className=''>Your hard work and perseverance have paid off. Congratulations!</h5>
                                            </div>
                                        </div>
                                        <div className="reviewGivenNo">
                                            <input type="radio" name="reviewGiven" id="reviewGivenN" value='no'
                                                defaultChecked={cData.reviewGiven === 'no' ? true : false}
                                            />
                                            <label >No</label>
                                            <div className="reasonDiv">
                                                <input type="text" name="reasonFromGivRev" placeholder='Write a reason for Not given review' defaultValue={cData.reasonFromGivRev}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="reviewAskNoDiv">
                                <input type="radio" name="reviewAsk" id="reviewAskN" value="no"
                                    defaultChecked={cData.reviewAsk === 'no' ? true : false}
                                />
                                <label>No</label>
                                <div className="reasonDiv">
                                    <input type="text" name="reasonFromAskRev" placeholder='Write a reason for not asking review' defaultValue={cData.reasonFromAskRev}  />
                                </div>
                            </div>
                        </div>
                        
                       

                    </div>
                }

                <input className='btn updateReviewBtn' type="submit" value="Update Review" />
                        </form>
                    </div>
                </div>


            }

        </div>

    )
}

export default Updatereview
