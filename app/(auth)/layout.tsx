import { Link } from 'lucide-react'
import React from 'react'
import Image from 'next/image'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className="auth-layout">
      <section className='auth-left-section scrollbar-hide-default'>
        <Link href='/' className='auth-logo'>
          <Image src='/logo.png' alt='logo' width={140} height={32} className="h-8 w-auto "/>
        </Link>
        <div className='pb-6 lg:pb-8 flex-1'>
          {children}
        </div>
      </section>
        
    </main>
  )
}

export default layout