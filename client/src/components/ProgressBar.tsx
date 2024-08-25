import React from 'react'

const ProgressBar = ({progress}:{progress:number}) => {
  return (
      <div className='space-y-1 flex flex-col items-start'>
          <div className='text-sm font-medium'>
            <p>{`${progress}%`}</p>
        </div>
    <div className='bg-gray-100 h-3 rounded-md overflow-hidden w-full'>
        
        <div className={`bg-green-500 h-full`} style={{width: `${progress}%`}}>
        </div>
    </div>
      </div>
  )
}

export default ProgressBar