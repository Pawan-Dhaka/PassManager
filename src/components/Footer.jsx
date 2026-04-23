import React from 'react'

const Footer = () => {
  return (
    <div className="nav bg-[#0b2e33] flex flex-col px-5 items-center py-1 ">
       <div className="name text-white text-xl font-semibold ">
        <span  className="text-green-400">&lt;</span>
        Pass
        <span className="text-green-400">Manager/&gt;</span>
      </div>
      <div className=" text-gray-200 text-sm">
        Made with &#x2764;&#xFE0F; by Pawan Dhaka.
      </div>
    </div>
  )
}

export default Footer
