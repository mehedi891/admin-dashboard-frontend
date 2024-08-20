import React from 'react'

function Totalstore({ getSUmmaryData }) {
    const { uniqueCalls, totalAskRev, totalReviewGive, totalStore, totalCallCurrMonth, totalStoreCallThisMonth, totalStoreAskRevThisMonth, totalStoreGivenRevThisMonth, revReason } = getSUmmaryData.summary;

    //console.log(totalStoreCallThisMonth,totalStoreAskRevThisMonth,totalStoreGivenRevThisMonth);

    return (
        <div>


            <div className="showTotal">
                <div className="showTotal-Store">
                    <h3>Total Store</h3>

                    <div className="showTotal-StoreList">

                        {
                            totalStoreCallThisMonth && totalStoreCallThisMonth.map((store, index) => {
                                return <p>{index + 1}. {store}</p>
                            })
                        }
                    </div>

                </div>

                <div className="showTotal-askRev">
                    <h3>Total Store Ask Rev</h3>

                    <div className="showTotal-StoreList">
                        {
                            totalStoreAskRevThisMonth && totalStoreAskRevThisMonth.map((store, index) => {
                                return <p>{index + 1}. {store}</p>
                            })
                        }

                    </div>

                </div>


                <div className="showTotal-giveRev">
                    <h3>Total Give Rev</h3>

                    <div className="showTotal-StoreList">
                        {
                            totalStoreGivenRevThisMonth && totalStoreGivenRevThisMonth.map((store, index) => {
                                return <p>{index + 1}. {store}</p>
                            })
                        }

                    </div>


                </div>


                <div className="showTotal-revReason">
                    <h3>Review Not given Reason</h3>

                    <div className="showTotal-StoreList">
                        {
                            revReason && revReason.map((reason, index) => {

                               return <p>
                                    {Object.keys(reason).map((key) => (
                                            <span>
                                            {key}: {reason[key]}
                                            </span>
                                        
                                    ))}

                                </p>
                            })
                        }
                    </div>

                </div>


            </div>



        </div>
    )
}

export default Totalstore
