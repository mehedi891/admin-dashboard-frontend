import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DefaultContext } from '../../../context/DefaultContext/Context';


const Updateclient = () => {
    const { id } = useParams();
    const { addStoreTitle, dataTemp } = useContext(DefaultContext);
    const { currMonth, currYear } = addStoreTitle;
    const [updateClientData, setUpdateClientData] = useState({});
    const [getSummaryData, setGetSummaryData] = useState({});

    //call custom hooks for summary data by month

    //conditional destructure from summary API data

    useEffect(() => {

        fetch(`http://localhost:3001/api/client/${id}`)
            .then(res => res.json())
            .then(data => {
                setUpdateClientData(data)
                //console.log(data)
            })
            .catch(console.error())

    }, [id]);

    useEffect(() => {
        if (updateClientData.app) {


            fetch(`http://localhost:3001/api/summary/${currMonth}-${currYear}/${updateClientData.app}`)
                .then(res => res.json())
                .then(data => {
                    if (data.summary) {
                        setGetSummaryData(data.summary);

                        

                    }
                    
                })
                .catch(error => {
                    setGetSummaryData(error)
                })
        }
    }, [currMonth, currYear, updateClientData.app]);


    const navigate = useNavigate();

    //client data get and create oibject 
    // const handleUpdateClient = e => {

    //     e.preventDefault();



    //     const storeUrl = e.target.storeUrl.value.trim();
    //     const bType = e.target.bType.value;
    //     const reasonFromGivRev = e.target.reasonFromGivRev.value;
    //     const reasonFromAskRev = e.target.reasonFromAskRev.value;
    //     const reviewGiven = e.target.reviewGiven.value;
    //     const reviewAsk = e.target.reviewAsk.value;
    //     const comment = e.target.comment.value;
    //     const noOfCalls = e.target.noOfCalls.value;
    //     const app = e.target.selectApp.value;
    //     const clientType = e.target.clientType.value;
    //     const lastUpdateBy = dataTemp.login.name;
    //     const revReasonNotAsking = e.target.revReasonNotAsking.value;
    //     const storeDev = e.target.storeDev.checked ? 'yes' : 'no'
    //     const reviewAskCount = e.target.reviewAskAgain.checked & reviewAsk === "yes" ? updateClientData.reviewAskCount*1 + 1 : updateClientData.reviewAskCount;

    //     const updatedClient = { storeUrl, bType, reasonFromGivRev, reasonFromAskRev, reviewGiven, reviewAsk, comment, noOfCalls, app, clientType,reviewAskCount,lastUpdateBy,storeDev,revReasonNotAsking}



    //     // variable with condition for summary data
    //     const increaseCall = e.target.increaseCall.checked;
    //     const incTotalStore = updateClientData.callThisMonth === 0 ? true : false;
    //     const incTotalCallCurrMonth = true;
    //     const incTotalAskRev = reviewAsk === "yes" & e.target.reviewAskAgain.checked ? true : false;

    //     const incTotalReviewGive = reviewGiven === "yes" & reviewGiven !== updateClientData.reviewGiven ? true : false;



    //      const revReasonSummary = revReasonNotAsking in getSummaryData;
    //      let revReasonObj = {};
    //      if(revReasonSummary){
    //          revReasonObj = {[revReasonNotAsking]:getSummaryData[revReasonNotAsking] + 1 };
    //         //console.log(revReasonObj,'from if');
    //      }else{
    //          revReasonObj = {[revReasonNotAsking]:1 };
    //         //console.log(revReasonObj,'from else');
    //      }

    //      //console.log(revReasonSummary,getSummaryData);

    //     const summaryObj = increaseCall ? { incTotalAskRev, incTotalReviewGive, incTotalStore, incTotalCallCurrMonth } : { incTotalAskRev, incTotalReviewGive };
    //     //console.log(summaryObj,updatedClient)
    //     // post data to api 



    //     if(updateClientData?.revReasonNotAsking !== revReasonNotAsking){
    //         fetch(`http://localhost:3001/api/summary/rev-reason/${currMonth}-${currYear}/${app}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'content-type': 'application/json'
    //             },
    //             body: JSON.stringify(revReasonObj)
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 if(data.result.acknowledged){
    //                     toast.success('Updated Reason for Not asking Data');
    //                     navigate('/');
    //                 }
    //             })
    //         }else{
    //             toast.warning('Nothing changes in Reason for Not asking');
    //         }


    //     if (
    //         storeUrl !== updateClientData.storeUrl ||
    //         bType !== updateClientData.bType ||
    //         reasonFromGivRev !== updateClientData.reasonFromGivRev ||
    //         reasonFromAskRev !== updateClientData.reasonFromAskRev ||
    //         comment !== updateClientData.comment ||
    //         app !== updateClientData.app ||
    //         reviewAsk !== updateClientData.reviewAsk ||
    //         reviewGiven !== updateClientData.reviewGiven ||
    //         clientType !== updateClientData.clientType ||
    //         e.target.reviewAskAgain.checked ||
    //         storeDev !== updateClientData.storeDev ||
    //         revReasonNotAsking !== updateClientData.revReasonNotAsking
    //     ) {


    //         fetch(`http://localhost:3001/api/client/${updateClientData._id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'content-type': 'application/json'
    //             },
    //             body: JSON.stringify(updatedClient)
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 //console.log(data)
    //                 if (data.updatedClient.acknowledged) {
    //                     toast.success('Updated Client Data  Successfully');
    //                     // send updated data to API to upadte current data
    //                     if (updateClientData.reviewAskCount !== reviewAskCount || reviewGiven !== updateClientData.reviewGiven || increaseCall) {
    //                         //console.log(`http://localhost:3001/api/summary/${currMonth}-${currYear}/${app}`)
    //                         fetch(`http://localhost:3001/api/summary/${currMonth}-${currYear}/${app}`, {
    //                             method: 'PUT',
    //                             headers: {
    //                                 'content-type': 'application/json'
    //                             },
    //                             body: JSON.stringify(summaryObj)
    //                         })
    //                             .then(res => res.json())
    //                             .then(data => {

    //                                 if (data.result.acknowledged) {
    //                                     toast.success('Updated Summary Data  Successfully')
    //                                     navigate('/')
    //                                 }
    //                                 else {
    //                                     toast.error('Something wrong to update Summary data')
    //                                 }
    //                             })
    //                             .catch(error => {
    //                                 toast.error(error.message)
    //                             })
    //                         //console.log('if');
    //                     }
    //                     else {
    //                         toast.warn('Nothing changes in Summary Data')
    //                         navigate('/')
    //                     }

    //                 }
    //                 else {
    //                     toast.error('Something went wrong in Client Data')
    //                 }
    //             })
    //             .catch(error => {
    //                 toast.error(error.message)
    //             })
    //     } else {
    //         toast.warn('Nothing changes in Client Data')
    //     }

    //     //console.log(incTotalAskRev, incTotalReviewGive)


    // }

    console.log(getSummaryData )

    const handleUpdateClient = e => {

        e.preventDefault();



        const storeUrl = e.target.storeUrl.value.trim();
        const bType = e.target.bType.value;
        const reasonFromGivRev = e.target.reasonFromGivRev.value;
        const reasonFromAskRev = e.target.reasonFromAskRev.value;
        const reviewGiven = e.target.reviewGiven.value;
        const reviewAsk = e.target.reviewAsk.value;
        const comment = e.target.comment.value;
        const noOfCalls = e.target.noOfCalls.value;
        const app = e.target.selectApp.value;
        const clientType = e.target.clientType.value;
        const lastUpdateBy = dataTemp.login.name;
        const revReasonNotAsking = e.target.revReasonNotAsking.value;
        const storeDev = e.target.storeDev.checked ? 'yes' : 'no'
        const reviewAskCount = e.target.reviewAskAgain.checked & reviewAsk === "yes" ? updateClientData.reviewAskCount * 1 + 1 : updateClientData.reviewAskCount;

        const updatedClient = { storeUrl, bType, reasonFromGivRev, reasonFromAskRev, reviewGiven, reviewAsk, comment, noOfCalls, app, clientType, reviewAskCount, lastUpdateBy, storeDev, revReasonNotAsking }



        
        // conditional data for Summary
        let summaryObj = {};
        let totalStoreCallThisMonth = [];
        let totalStoreGivenRevThisMonth = [];
        let totalStoreAskRevThisMonth = [];
        let totalAskRev = 0;
        let totalReviewGive = 0;
        let totalStore = 0;
        let totalCallCurrMonth = 0;
        let revReason = [];

        if(Object.keys(getSummaryData).length === 0){
            console.log("from not find summary");

            totalStoreCallThisMonth = e.target.increaseCall.checked ? [storeUrl] : [];

            totalStoreGivenRevThisMonth = reviewGiven === "yes" && updateClientData.reviewGiven !== reviewGiven  ? [storeUrl] : [];

            totalStoreAskRevThisMonth = reviewAsk === "yes" && updateClientData.reviewAsk !== reviewAsk ? [ storeUrl] : reviewAsk === "yes" && e.target.reviewAskAgain.checked  ? [ storeUrl] : [];

            totalAskRev = reviewAsk === "yes" && e.target.reviewAskAgain.checked ? 1 : 0;

            totalReviewGive = reviewGiven === "yes" && updateClientData.reviewGiven !== reviewGiven ?  1 : 0;

            totalStore =  e.target.increaseCall.checked ?  1 : 0;

            totalCallCurrMonth = e.target.increaseCall.checked ?  1 : 0;

            revReason = [{ [revReasonNotAsking]: 1 }]

            summaryObj = {
                totalStoreCallThisMonth,
                totalStoreGivenRevThisMonth,
                totalStoreAskRevThisMonth,
                totalAskRev,
                totalReviewGive,
                totalStore,
                totalCallCurrMonth,
                revReason,
                app,
            }

        }else{
            console.log("from find summary")
        

        const isExisttotalStoreCallThisMonth = getSummaryData.totalStoreCallThisMonth;
        const isExisttotalStoreGivenRevThisMonth = getSummaryData.totalStoreGivenRevThisMonth;
        const isExisttotalStoreAskRevThisMonth = getSummaryData.totalStoreAskRevThisMonth;

        console.log(getSummaryData.totalStoreCallThisMonth,isExisttotalStoreCallThisMonth)

         totalStoreCallThisMonth = !isExisttotalStoreCallThisMonth.includes(storeUrl) && !e.target.increaseCall.checked ? isExisttotalStoreCallThisMonth : e.target.increaseCall.checked && !isExisttotalStoreCallThisMonth.includes(storeUrl) ? [...isExisttotalStoreCallThisMonth,storeUrl] : isExisttotalStoreCallThisMonth;

         totalStoreGivenRevThisMonth = reviewGiven === "yes" && updateClientData.reviewGiven !== reviewGiven && !isExisttotalStoreGivenRevThisMonth.includes(storeUrl) ? [...isExisttotalStoreGivenRevThisMonth, storeUrl] : isExisttotalStoreGivenRevThisMonth;

         totalStoreAskRevThisMonth = reviewAsk === "yes" && updateClientData.reviewAsk !== reviewAsk && !isExisttotalStoreAskRevThisMonth.includes(storeUrl) ? [...isExisttotalStoreAskRevThisMonth, storeUrl] : reviewAsk === "yes" && e.target.reviewAskAgain.checked && !isExisttotalStoreAskRevThisMonth.includes(storeUrl) ? [...isExisttotalStoreAskRevThisMonth, storeUrl] : isExisttotalStoreAskRevThisMonth;

         totalAskRev = reviewAsk === "yes" && e.target.reviewAskAgain.checked ? getSummaryData.totalAskRev + 1 : getSummaryData.totalAskRev;

         totalReviewGive = reviewGiven === "yes" && !isExisttotalStoreGivenRevThisMonth.includes(storeUrl) && updateClientData.reviewGiven !== reviewGiven ? getSummaryData.totalReviewGive + 1 : getSummaryData.totalReviewGive;

         totalStore = !isExisttotalStoreCallThisMonth.includes(storeUrl) & e.target.increaseCall.checked ? getSummaryData.totalStore + 1 : getSummaryData.totalStore;

         totalCallCurrMonth = e.target.increaseCall.checked ? getSummaryData.totalCallCurrMonth + 1 : getSummaryData.totalCallCurrMonth;

         revReason = getSummaryData.revReason;


        if (revReason && revReason.length > 0) {
            const newRevReason = revReason.find((obj) => [revReasonNotAsking] in obj);
            if (newRevReason) {
                newRevReason[revReasonNotAsking] = newRevReason[revReasonNotAsking] + 1;
                revReason = [...revReason];

                //console.log('inner if:',revReason)
            } else {
                revReason = [...revReason, { [revReasonNotAsking]: 1 }]
                //console.log('inner else',revReason)
            }
        } else {
            revReason = [{ [revReasonNotAsking]: 1 }]
            //console.log('outer else',revReason)
        }

        //console.log(revReason)


         summaryObj = {
            totalStoreCallThisMonth,
            totalStoreGivenRevThisMonth,
            totalStoreAskRevThisMonth,
            totalAskRev,
            totalReviewGive,
            totalStore,
            totalCallCurrMonth,
            revReason

        }
    }
        console.log(summaryObj);


        // post data to api 






        // if (
        //     storeUrl !== updateClientData.storeUrl ||
        //     bType !== updateClientData.bType ||
        //     reasonFromGivRev !== updateClientData.reasonFromGivRev ||
        //     reasonFromAskRev !== updateClientData.reasonFromAskRev ||
        //     comment !== updateClientData.comment ||
        //     app !== updateClientData.app ||
        //     reviewAsk !== updateClientData.reviewAsk ||
        //     reviewGiven !== updateClientData.reviewGiven ||
        //     clientType !== updateClientData.clientType ||
        //     e.target.reviewAskAgain.checked ||
        //     storeDev !== updateClientData.storeDev ||
        //     revReasonNotAsking !== updateClientData.revReasonNotAsking
        // ) {


        //     fetch(`http://localhost:3001/api/client/${updateClientData._id}`, {
        //         method: 'PUT',
        //         headers: {
        //             'content-type': 'application/json'
        //         },
        //         body: JSON.stringify(updatedClient)
        //     })
        //         .then(res => res.json())
        //         .then(data => {
        //             //console.log(data)
        //             if (data.updatedClient.acknowledged) {
        //                 toast.success('Updated Client Data  Successfully');
        //                 // send updated data to API to upadte current data
        //                 if (totalStoreCallThisMonth !== getSummaryData.totalStoreCallThisMonth ||
        //                      totalAskRev !== getSummaryData.totalAskRev ||
        //                      totalCallCurrMonth !== getSummaryData.totalCallCurrMonth ||
        //                      totalReviewGive !== getSummaryData.totalReviewGive ||
        //                      totalStore !== getSummaryData.totalStore ||
        //                      revReason !== getSummaryData.revReason ||
        //                      totalStoreAskRevThisMonth !== getSummaryData.totalStoreAskRevThisMonth ||
        //                      totalStoreGivenRevThisMonth !== getSummaryData.totalStoreGivenRevThisMonth

        //                 ) {
        //                     //console.log(`http://localhost:3001/api/summary/${currMonth}-${currYear}/${app}`)
        //                     fetch(`http://localhost:3001/api/summary/${currMonth}-${currYear}/${app}`, {
        //                         method: 'PUT',
        //                         headers: {
        //                             'content-type': 'application/json'
        //                         },
        //                         body: JSON.stringify(summaryObj)
        //                     })
        //                         .then(res => res.json())
        //                         .then(data => {

        //                             if (data.result.acknowledged) {
        //                                 toast.success('Updated Summary Data  Successfully')
        //                                 navigate('/')
        //                             }
        //                             else {
        //                                 toast.error('Something wrong to update Summary data')
        //                             }
        //                         })
        //                         .catch(error => {
        //                             toast.error(error.message)
        //                         })
        //                     //console.log('if');
        //                 }
        //                 else {
        //                     toast.warn('Nothing changes in Summary Data')
        //                     navigate('/')
        //                 }

        //             }
        //             else {
        //                 toast.error('Something went wrong in Client Data')
        //             }
        //         })
        //         .catch(error => {
        //             toast.error(error.message)
        //         })
        // } else {
        //     toast.warn('Nothing changes in Client Data')
        // }




    }


    return (
        <div className='form-container'>
            <h3 className='addClienttitle title text-center'> Update Client : {updateClientData.storeUrl} </h3>
            <form onSubmit={handleUpdateClient}>
                <div className="storeUrl flex-column">
                    <label htmlFor="storeUrl">Store URL</label>
                    <input type="text" name="storeUrl" placeholder='ADD Sotr URL' defaultValue={updateClientData.storeUrl} />
                </div>

                <div className="businessType flex-column">
                    <label htmlFor="bType">Business Type</label>
                    <input type="text" name="bType" placeholder='Business Type(ex. cloths,car)' defaultValue={updateClientData.bType} />
                </div>

                <div className="comment flex-column">
                    <label htmlFor="comment">Email</label>
                    <input type="email" name="comment" placeholder='Add client email' defaultValue={updateClientData.comment} />
                </div>
                <div className="noOfcalls flex-column">
                    <label htmlFor="noOfCalls">No Of calls</label>
                    <input type="number" name="noOfCalls" placeholder='Type Number' defaultValue={updateClientData.noOfCalls} />
                </div>
                {updateClientData.reviewAsk !== undefined &&
                    <div className="inputConditionGroup">
                        <h4>Review Asked</h4>
                        <div className="reviewAskDiv flex-row">
                            <div className="reviewAskYesDiv">
                                <input type="radio" name="reviewAsk" id="reviewAskY" value='yes'
                                    defaultChecked={updateClientData.reviewAsk === 'yes' ? true : false}
                                />
                                <label>Yes</label>

                                <div className="reviewGivenDiv">
                                    <h4>Review Given</h4>
                                    <div className='flex-row'>
                                        <div className="reviewGivenYes">
                                            <input type="radio" name="reviewGiven" id="reviewGivenY" value='yes'
                                                defaultChecked={updateClientData.reviewGiven === 'yes' ? true : false}
                                            />
                                            <label >Yes</label>
                                            <div className="reviewGivenCele">
                                                <h5 className=''>Your hard work and perseverance have paid off. Congratulations!</h5>
                                            </div>
                                        </div>
                                        <div className="reviewGivenNo">
                                            <input type="radio" name="reviewGiven" id="reviewGivenN" value='no'
                                                defaultChecked={updateClientData.reviewGiven === 'no' ? true : false}
                                            />
                                            <label >No</label>
                                            <div className="reasonDiv">
                                                <input type="text" name="reasonFromGivRev" placeholder='Write a reason for Not given review' defaultValue={updateClientData.reasonFromGivRev}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="reviewAskNoDiv">
                                <input type="radio" name="reviewAsk" id="reviewAskN" value="no"
                                    defaultChecked={updateClientData.reviewAsk === 'no' ? true : false}
                                />
                                <label>No</label>
                                <div className="reasonDiv">
                                    <input type="text" name="reasonFromAskRev" placeholder='Write a reason for not asking review' defaultValue={updateClientData.reasonFromAskRev} />
                                </div>
                            </div>
                        </div>

                        <div className="askAgainReview">
                            <label>Review Ask Again </label>
                            <input type="checkbox" name="reviewAskAgain" id="reviewAskAgain" />
                        </div>

                        <div className='increaseCall'>
                            <label>Increase Call</label>
                            <input type="checkbox" name="increaseCall" id="increaseCallInp" />
                        </div>

                        <div className="askAgainReview storeDev">
                            <label>Developer Or Not</label>
                            <input type="checkbox" name="storeDev" id="storeDev" defaultChecked={updateClientData.storeDev === 'yes' ? true : false} />
                        </div>

                        <div className="selectApp">
                            <label>Select App</label>
                            <select defaultValue={updateClientData.app} name="selectApp">
                                <option value="ib">Inkybay</option>
                                <option value="mv">Multivariants</option>
                                <option value="dr">Discount Ray</option>
                            </select>
                        </div>

                        <div className="revReason">
                            <label>Select Reason for Not Asking Review</label>
                            <select defaultValue={updateClientData.revReasonNotAsking ? updateClientData.revReasonNotAsking : 'notapplicable'} name="revReasonNotAsking">
                                <option value="notapplicable">Not Applicable</option>
                                <option value="requirementNotMatch">Requirement doens't Match</option>
                                <option value="developer">Developer</option>
                                <option value="taskAdded">Task Added</option>
                                <option value="left">Left</option>
                                <option value="newExploring">New Exploring</option>
                                <option value="saidSureLeaveLater">Said sure. I will leave a review</option>
                                <option value="resQtyDiscount">Want Quantity Discount</option>
                                <option value="leftMiddleCon">Left-Middle of conversation</option>
                            </select>
                        </div>

                        <div className="clientType">
                            <label>Select Client Type(For ask Review)</label>
                            <select defaultValue={updateClientData.clientType ? updateClientData.clientType : "safe"} name="clientType">
                                <option value="safe">Safe</option>
                                <option value="try">Give it A Try</option>
                                <option value="risky">Risky</option>
                                <option value="danger">Danger</option>
                            </select>
                        </div>

                    </div>
                }
                <div className='submitBtnDiv'>
                    <input className='btn' type="submit" value="Update Client" />
                </div>

            </form>
        </div>
    );
};

export default Updateclient;