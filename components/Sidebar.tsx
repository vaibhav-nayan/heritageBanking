'use client'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { SiderbarProps } from '@/types'
import Footer from './Footer'

const Sidebar = ({user}: SiderbarProps) => {
    const pathname = usePathname();
  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-4'>
            <Link href="/" className="flex mb-12 cursor-pointer gap-2 items-center">
                <Image 
                    src="/icons/logo.svg"
                    width={34}
                    height={34}
                    alt='Heritage logo'
                    className='size=[24px] max-xl:size-14'
                />
                <h1 className='sidebar-logo'>Heritage</h1>
            </Link>

            {sidebarLinks.map((item)=>{
                const isActive = pathname === item.route || pathname.startsWith(`${item.route}`)
                return (
                    <Link href={item.route} key={item.label} className={cn('sidebar-link', {
                        'bg-bankGradient' : isActive
                    })}>
                        <div className='relative size-6'>
                            <Image
                                src={item.imgURL}
                                alt={item.label}
                                fill
                                className={cn({
                                    'brightness-[3] invert-0': isActive
                                })}
                            />
                        </div>
                        <p className={cn('sidebar-label',{
                            '!text-white' : isActive}
                        )}>
                            {item.label}
                        </p>
                    </Link>
                )
            })}
            USER
        </nav>
        
        <Footer user={user}/>
    </section>
  )
}

export default Sidebar