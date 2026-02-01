import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NavItems from './NavItems'

const Header = () => {
  return (
    <header className='sticky top-0 header'>
        <div className='container header-wrapper'>
            <Link href='/'>
                <Image src='/logo.png' alt='Lgo' width={140} height={32} className="h-8 w-auto cursor-pointer" />
            </Link>
            <nav className='hidden sm:block'>
                { /* navitems can be added here in future */ }
                <NavItems />
            </nav>
        {/*userdropdown can be added here in future*/}   
        </div>
    </header>
  )
}

export default Header