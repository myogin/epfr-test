import React from 'react'
import ArrowRightLineIcon from 'remixicon-react/ArrowRightLineIcon'

const PfrSummaryDetail = () => {
  return (
    <div className='space-y-10'> 
      <div className='flex flex-col space-y-5'>
        <label className='text-sm opacity-50 text-gray-light'>Progress</label>
        <span className='text-sm'>progress bar</span>
      </div>
      <div className='flex flex-col space-y-5 border-b border-gray-soft-light'>
        <label className='text-sm opacity-50 text-gray-light'>Name of Client</label>
        <span className='text-sm'>Margo Madison</span>
      </div>
      <div className='flex flex-col space-y-5'>
        <label className='text-sm opacity-50 text-gray-light'>Sex</label>
        <span className='text-sm'>Man</span>
      </div>
      <div className='flex flex-col space-y-5'>
        <label className='text-sm opacity-50 text-gray-light'>Created At</label>
        <span className='text-sm'>12 Jan 2022</span>
      </div>
      <div className='flex flex-col space-y-5'>
        <label className='text-sm opacity-50 text-gray-light'>Date of Review</label>
        <span className='text-sm'>12 Jan 2022</span>
      </div>
      <div className='flex flex-col space-y-5'>
        <label className='text-sm opacity-50 text-gray-light'>Name of Representative</label>
        <span className='text-sm'>Rico Chan</span>
      </div>
      <div className='flex flex-col space-y-5'>
        <label className='text-sm opacity-50 text-gray-light'>EPFR Type</label>
        <span className='text-sm'>Single</span>
      </div>
      <div className='flex flex-col space-y-5'>
        <label className='text-sm opacity-50 text-gray-light'>Smoker</label>
        <span className='text-sm'>Policy Holder is not Smoker</span>
      </div>
      <div className='flex'>
        <button className='flex flex-row px-5 py-3 text-white rounded-lg bg-green-deep'>Continue EPFR <ArrowRightLineIcon /></button>
      </div>
    </div>
  )
}

export default PfrSummaryDetail