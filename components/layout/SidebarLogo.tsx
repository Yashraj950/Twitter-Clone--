import { useRouter } from 'next/router'
import React from 'react'
import { BsTwitter } from 'react-icons/bs'

const SidebarLogo = () => {

  const route = useRouter()

  return (
    <div onClick={() => route.push('/')} className='rounded-full h-14 w-14  p-4 flex justify-center hover:bg-blue-300 cursor-pointer transition'>
      <BsTwitter size={28} color='white' onClick={() => route.push('/')} />
      

    </div>
  )
}

export default SidebarLogo