import React from 'react'
import Headers from '@/components/Header'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className="min-h-screen text-gray-400">
        <Headers />
        <div className='container py-10'>
            {children}
        </div>
    </main>
  )
}

export default layout