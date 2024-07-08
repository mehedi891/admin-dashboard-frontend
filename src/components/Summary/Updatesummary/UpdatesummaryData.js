import React from 'react'

function UpdatesummaryData({getSUmmaryData,handleUpdateSummary}) {
  return (
    <div>
      <div className='updateSummaryDiv'>
        <form onSubmit={handleUpdateSummary}>
            <h2>Updating The value for {getSUmmaryData.monthName} {getSUmmaryData?.summary?.app}</h2>
            <div>
                <p>Total Ask Review</p>
               <input type="number" name="totalAskRev" defaultValue={getSUmmaryData.summary.totalAskRev} />
            </div>

            <div>
                <p>Total Given Review</p>
               <input type="number" name="totalReviewGive" defaultValue={getSUmmaryData.summary.totalReviewGive} />
            </div>

            <div>
                <p>Total Current Month Call</p>
               <input type="number" name="totalCallCurrMonth" defaultValue={getSUmmaryData.summary.totalCallCurrMonth} />
            </div>
            <div>
                <p>Total Store</p>
               <input type="number" name="totalStore" defaultValue={getSUmmaryData.summary.totalStore} />
            </div>
            <div>
                <p>Total UniqueCalls</p>
               <input type="number" name="uniqueCalls" defaultValue={getSUmmaryData.summary.uniqueCalls} />
            </div>
            <input type="submit" className='btn' value="Upadate Summary Data" />
        </form>


      </div>
    </div>
  )
}

export default UpdatesummaryData
