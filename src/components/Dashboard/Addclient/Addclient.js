import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DefaultContext } from "../../../context/DefaultContext/Context";


import "./Addclient.css";

const Addclient = () => {
  const navigate = useNavigate();
  const { addStoreTitle, setaAdStoreTitle, dataTemp } = useContext(DefaultContext);
  const { currMonth, currYear } = addStoreTitle;
  const [chooseApp, setChooseApp] = useState('ib');
  const [getSummaryData, setgetSummaryData] = useState({});

  //client data get and create oibject
  // const handleAddClient = (e) => {

  //   e.preventDefault();


  //   const storeUrl = e.target.storeUrl.value.trim();
  //   const bType = e.target.bType.value;
  //   const reasonFromGivRev = e.target.reasonFromGivRev.value.trim();
  //   const reasonFromAskRev = e.target.reasonFromAskRev.value.trim();
  //   const reviewGiven = e.target.reviewGiven.value;
  //   const reviewAsk = e.target.reviewAsk.value;
  //   const comment = e.target.comment.value;
  //   const noOfCalls = e.target.noOfCalls.value;
  //   const app = e.target.selectApp.value;
  //   const clientType = e.target.clientType.value;
  //   const callThisMonth = parseInt(1);
  //   const addedBy = dataTemp.login.name;
  //   const storeDev = e.target.storeDev.checked ? 'yes' : 'no'

  //   const newClient = {
  //     storeUrl,
  //     app,
  //     bType,
  //     reasonFromGivRev,
  //     reasonFromAskRev,
  //     reviewGiven,
  //     reviewAsk,
  //     comment,
  //     noOfCalls,
  //     callThisMonth,
  //     clientType,
  //     addedBy,
  //     storeDev,
  //     reviewAskCount: reviewAsk === "yes" ? 1 : 0
  //   };


  //   // variable with condition for summary data
  //   // const uniqueCalls = getMonthSummary.error 
  //   // ? 1 
  //   // : getMonthSummary?.summary?.uniqueCalls + 1;

  //   // let totalAskRev = !getMonthSummary.error ? getMonthSummary?.summary?.totalAskRev : parseInt(0);
  //   // totalAskRev = (reviewAsk === "yes") ? totalAskRev + 1 : totalAskRev;



  //   // let totalReviewGive = !getMonthSummary.error ? getMonthSummary?.summary?.totalReviewGive : parseInt(0);
  //   //   totalReviewGive = (reviewGiven === "yes") ? totalReviewGive + 1 : totalReviewGive;




  //   // let totalStore = getMonthSummary.error
  //   //  ? 1 
  //   //  : getMonthSummary?.summary?.totalStore + 1;

  //   //  let totalCallCurrMonth = getMonthSummary.error
  //   //  ? 1 
  //   //  : getMonthSummary?.summary?.totalCallCurrMonth + 1;

  //   const incTotalAskRev = reviewAsk === "yes" ? true : false;
  //   const incTotalReviewGive = reviewGiven === "yes" ? true : false;

  //   const summaryObj = {
  //     incUniqueCalls: true,
  //     incTotalAskRev,
  //     incTotalReviewGive,
  //     incTotalStore : true,
  //     incTotalCallCurrMonth:true

  //   };

  //   //post data to client  api

  //   fetch("https://amin-dashboard-backend.onrender.com/api/client", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(newClient),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if(data.existsClient){
  //         toast.success(data.message);
  //         setaAdStoreTitle({
  //           ...addStoreTitle,
  //           storeTitle: '',
  //         });
  //         upSummaryFnc();
  //       }else{
  //         toast.warn(data.error)


  //       }

  //     })
  //     .catch(error =>{
  //       toast.error('Something went wrong');
  //     })

  //   //post data to summary API
  //   const upSummaryFnc = () =>{

  //   fetch(`https://amin-dashboard-backend.onrender.com/api/summary/${currMonth}-${currYear}/${app}`,{
  //       method:'PUT',
  //       headers:{
  //           'content-type': 'application/json'
  //       },
  //       body: JSON.stringify(summaryObj)
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     if(data.result.acknowledged){
  //        navigate('/')
  //       toast.success('Updated Summary');
  //      setaAdStoreTitle({...addStoreTitle,reviewAsk:'yes',reviewGiven:'no'});
  //     }
  //     else{
  //       console.log(data)
  //       toast.warn('Summary updated failed');
  //     }


  //   })
  //   .catch(error =>{
  //     toast.error('Something went wrong')
  //   })
  // }

  // };

  useEffect(() => {
    fetch(`https://amin-dashboard-backend.onrender.com/api/summary/${currMonth}-${currYear}/${chooseApp}`)
      .then(res => res.json())
      .then(data => {
        setgetSummaryData(data.summary)
      })
      .catch(err => {
        console.log(err)
      })
  }, [currMonth, currYear, chooseApp]);
  const handleAddClient = (e) => {

    e.preventDefault();


    const storeUrl = e.target.storeUrl.value.trim();
    const bType = e.target.bType.value;
    const reasonFromGivRev = e.target.reasonFromGivRev.value.trim();
    const reasonFromAskRev = e.target.reasonFromAskRev.value.trim();
    const reviewGiven = e.target.reviewGiven.value;
    const reviewAsk = e.target.reviewAsk.value;
    const comment = e.target.comment.value;
    const noOfCalls = e.target.noOfCalls.value;
    const app = e.target.selectApp.value;
    const clientType = e.target.clientType.value;
    const callThisMonth = parseInt(1);
    const addedBy = dataTemp.login.name;
    const revReasonNotAsking = e.target.revReasonNotAsking.value;
    const storeDev = e.target.storeDev.checked ? 'yes' : 'no'

    const newClient = {
      storeUrl,
      app,
      bType,
      reasonFromGivRev,
      reasonFromAskRev,
      reviewGiven,
      reviewAsk,
      comment,
      noOfCalls,
      callThisMonth,
      clientType,
      addedBy,
      storeDev,
      revReasonNotAsking,
      reviewAskCount: reviewAsk === "yes" ? 1 : 0
    };

    //console.log('reviewAsk:',reviewAsk,'reviewGiven:',reviewGiven)

    let summaryObj = {};
    let totalStoreCallThisMonth = [];
    let totalStoreGivenRevThisMonth = [];
    let totalStoreAskRevThisMonth = [];
    let uniqueCalls = 0;
    let totalAskRev = 0;
    let totalReviewGive = 0;
    let totalStore = 0;
    let totalCallCurrMonth = 0;
    let revReason = [];
    if (Object.keys(getSummaryData).length === 0) {

      totalStoreCallThisMonth = [storeUrl];
      totalStoreGivenRevThisMonth = reviewGiven === "yes" ? [storeUrl] : [];
      totalStoreAskRevThisMonth = reviewAsk === "yes" ? [storeUrl] : [];
      uniqueCalls = 1;
      totalAskRev = reviewAsk === "yes" ? 1 : 0;
      totalReviewGive = reviewGiven === "yes" ? 1 : 0;
      totalStore = 1;
      totalCallCurrMonth = 1;
      revReason = [{ [revReasonNotAsking]: 1 }]


      summaryObj = {
        totalStoreCallThisMonth,
        totalStoreGivenRevThisMonth,
        totalStoreAskRevThisMonth,
        uniqueCalls,
        totalAskRev,
        totalReviewGive,
        totalStore,
        totalCallCurrMonth,
        revReason,
        app

      }

    } else {


      const isExisttotalStoreCallThisMonth = getSummaryData.totalStoreCallThisMonth;
      const isExisttotalStoreGivenRevThisMonth = getSummaryData.totalStoreGivenRevThisMonth;
      const isExisttotalStoreAskRevThisMonth = getSummaryData.totalStoreAskRevThisMonth;



      totalStoreCallThisMonth = isExisttotalStoreCallThisMonth.includes(storeUrl) ? isExisttotalStoreCallThisMonth : [...isExisttotalStoreCallThisMonth, storeUrl];

      totalStoreGivenRevThisMonth = reviewGiven === "yes" & !isExisttotalStoreGivenRevThisMonth.includes(storeUrl) ? [...isExisttotalStoreGivenRevThisMonth, storeUrl] : isExisttotalStoreGivenRevThisMonth;

      totalStoreAskRevThisMonth = reviewAsk === "yes" & !isExisttotalStoreAskRevThisMonth.includes(storeUrl) ? [...isExisttotalStoreAskRevThisMonth, storeUrl] : isExisttotalStoreAskRevThisMonth;

      uniqueCalls = getSummaryData.uniqueCalls + 1;

      totalAskRev = reviewAsk === "yes" & !isExisttotalStoreAskRevThisMonth.includes(storeUrl) ? getSummaryData.totalAskRev + 1 : getSummaryData.totalAskRev;

      totalReviewGive = reviewGiven === "yes" & !isExisttotalStoreGivenRevThisMonth.includes(storeUrl) ? getSummaryData.totalReviewGive + 1 : getSummaryData.totalReviewGive;

      totalStore = getSummaryData.totalStore + 1;

      totalCallCurrMonth = getSummaryData.totalCallCurrMonth + 1;

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

      summaryObj = {
        totalStoreCallThisMonth,
        totalStoreGivenRevThisMonth,
        totalStoreAskRevThisMonth,
        uniqueCalls,
        totalAskRev,
        totalReviewGive,
        totalStore,
        totalCallCurrMonth,
        revReason,
        app
      };

    }


    //console.log(summaryObj)


    //post data to client  api

    fetch("https://amin-dashboard-backend.onrender.com/api/client", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newClient),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.existsClient) {
          toast.success(data.message);
          setaAdStoreTitle({
            ...addStoreTitle,
            storeTitle: '',
          });
          upSummaryFnc();

        } else {
          toast.warn(data.error)


        }

      })
      .catch(error => {
        toast.error('Something went wrong');
      })

    //post data to summary API
    const upSummaryFnc = () => {

      fetch(`https://amin-dashboard-backend.onrender.com/api/summary/${currMonth}-${currYear}/${app}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(summaryObj)
      })
        .then(res => res.json())
        .then(data => {
          if (data.message) {
            navigate('/')
            toast.success('Updated Summary');
            setaAdStoreTitle({ ...addStoreTitle, reviewAsk: 'yes', reviewGiven: 'no' });
          }
          else {
            console.log(data)
            toast.warn('Summary updated failed');
          }


        })
        .catch(error => {
          toast.error('Something went wrong')
        })
    }

  };

  return (
    <div className="form-container addClient">
      <h3 className="addClienttitle title text-center">

        {addStoreTitle.storeTitle
          ? `StoreUrl: ${addStoreTitle.storeTitle} App: ${addStoreTitle.app}`
          : 'Add New Client'}
      </h3>
      <form onSubmit={handleAddClient}>
        <div className="storeUrl flex-column">
          <label htmlFor="storeUrl">Store URL</label>
          <input
            type="text"
            name="storeUrl"
            required
            placeholder="ADD Sotr URL"
            defaultValue={addStoreTitle.storeTitle}
          />
        </div>

        <div className="businessType flex-column">
          <label htmlFor="bType">Business Type</label>
          <input
            required
            type="text"
            name="bType"
            placeholder="Business Type(ex. cloths,car)"
          />
        </div>

        <div className="comment flex-column">
          <label htmlFor="comment">Email</label>
          <input
            type="email"
            name="comment"
            placeholder="Add additional info about client/ Optional"
          />
        </div>
        <div className="noOfcalls flex-column">
          <label htmlFor="noOfCalls">No Of calls</label>
          <input
            type="number"
            name="noOfCalls"
            placeholder="Type Number"
            defaultValue="1"
          />
        </div>
        <div className="inputConditionGroup">
          <h4>Review Asked</h4>
          <div className="reviewAskDiv flex-row">
            <div className="reviewAskYesDiv">
              <input
                type="radio"
                onChange={(e) => {
                  setaAdStoreTitle({
                    ...addStoreTitle,
                    reviewAsk: e.target.value,
                  });
                }}
                name="reviewAsk"
                id="reviewAskY"
                value="yes"
                defaultChecked={addStoreTitle.reviewAsk === 'yes' ? true : false}
              />
              <label>Yes</label>

              <div className="reviewGivenDiv">
                <h4>Review Given</h4>
                <div className="flex-row">
                  <div className="reviewGivenYes">
                    <input
                      type="radio"
                      onChange={(e) => {
                        setaAdStoreTitle({
                          ...addStoreTitle,
                          reviewGiven: e.target.value,
                        });
                      }}
                      name="reviewGiven"
                      id="reviewGivenY"
                      value="yes"
                      defaultChecked={addStoreTitle.reviewGiven === 'yes' ? true : false}
                    />
                    <label>Yes</label>
                    <div className="reviewGivenCele">
                      <h5 className="">
                        Your hard work and perseverance have paid off.
                        Congratulations!
                      </h5>
                    </div>
                  </div>
                  <div className="reviewGivenNo">
                    <input
                      type="radio"
                      onChange={(e) => {
                        setaAdStoreTitle({
                          ...addStoreTitle,
                          reviewGiven: e.target.value,
                        });
                      }}
                      name="reviewGiven"
                      id="reviewGivenN"
                      value="no"
                      defaultChecked={addStoreTitle.reviewGiven === 'no' ? true : false}
                    />
                    <label>No</label>
                    <div className="reasonDiv">
                      <input
                        type="text"
                        name="reasonFromGivRev"
                        required={
                          addStoreTitle.reviewGiven === "no" ? true : false
                        }
                        placeholder="Write a reason for not given"
                        defaultValue={addStoreTitle.reviewAsk === 'no' ? 'Not given yet' : ''}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="reviewAskNoDiv">
              <input
                type="radio"
                onChange={(e) => {
                  setaAdStoreTitle({
                    ...addStoreTitle,
                    reviewAsk: e.target.value,
                  });
                }}
                name="reviewAsk"
                id="reviewAskN"
                value="no"
                defaultChecked={addStoreTitle.reviewAsk === 'no' ? true : false}
              />
              <label>No</label>
              <div className="reasonDiv">
                <input
                  type="text"
                  name="reasonFromAskRev"
                  required={addStoreTitle.reviewAsk === "no" ? true : false}
                  placeholder="Write a reason for not Asking"
                />
              </div>
            </div>
          </div>
          <div className="askAgainReview storeDev">
            <label>Developer Or Not</label>
            <input type="checkbox" name="storeDev" id="storeDev" />
          </div>
          <div className="selectApp">
            <label>Select App</label>
            <select defaultValue={addStoreTitle.app} onChange={(e) => setChooseApp(e.target.value)} name="selectApp">
              <option value="ib">Inkybay</option>
              <option value="mv">Multivariants</option>
              <option value="dr">Discount Ray</option>
            </select>
          </div>
          <div className="revReason">
            <label>Select Reason for Not Asking Review</label>
            <select defaultValue={'notapplicable'} name="revReasonNotAsking">
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
            <select defaultValue={"safe"} name="clientType">
              <option value="safe">Safe</option>
              <option value="try">Give it A Try</option>
              <option value="risky">Risky</option>
              <option value="danger">Danger</option>
            </select>
          </div>
        </div>

        <div className="submitBtnDiv">
          <input className="btn" type="submit" value="Add Client" />
        </div>
      </form>
    </div>
  );
};

export default Addclient;
