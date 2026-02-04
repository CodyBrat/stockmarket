import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NavItems from './NavItems'
import { User } from 'lucide-react'
import UserDropdown from './UserDropdown'

const Header = ({user}:{user:User}) => {
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
            <UserDropdown user={user} />
        {/*userdropdown can be added here in future*/}   
        </div>
    </header>
  )
}

export default Header