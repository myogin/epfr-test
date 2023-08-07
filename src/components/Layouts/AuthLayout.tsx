import Head from 'next/head'
import React, { ReactNode } from 'react'
import { siteConfig } from '@/libs/config'

interface Props {
  children?: ReactNode
}

const AuthLayout = ({ children } : Props) => {
  return (
    <>
      <Head>
        <title>{`Verify | ${siteConfig.siteName}`}</title>
      </Head>
      <div className='flex flex-row w-full min-h-screen font-sans bg-white'>
        {children}
      </div>
    </>
  )
}

export default AuthLayout