'use client'
import React from 'react'
import Link from 'next/link'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Footer from './Footer'
import { MobileNavProps } from '@/types'
  

const MobileNav = ({user}: MobileNavProps) => {
    const pathname = usePathname();
  return (
    <section className='w-full max-w-[264px]'>
        <Sheet>
        <SheetTrigger>
            <Image
                src="/icons/hamburger.svg"
                width={30}
                height={30}
                alt='menu'
                className='cursor-pointer'
            />
        </SheetTrigger>
        <SheetContent side='left' className='border-none bg-white'>
            <nav className='flex flex-col gap-4'>
                <Link href="/" className="flex cursor-pointer gap-1 items-center px-4">
                    <Image 
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt='Heritage logo'
                    />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Heritage</h1>
                </Link>
                <div className='mobilenav-sheet'>
                    <SheetClose asChild>
                        <nav className='flex h-full flex-col gap-6 pt-16 text-white'>
                            {sidebarLinks.map((item)=>{
                                const isActive = pathname === item.route || pathname.startsWith(`${item.route}`)
                                return (
                                    <SheetClose asChild key={item.route}>
                                        <Link href={item.route} key={item.label} className={cn('mobilenav-sheet_close w-full', {
                                            'bg-bankGradient' : isActive
                                        })}>
                                            <div className='relative size-6'>
                                                <Image
                                                    src={item.imgURL}
                                                    alt={item.label}
                                                    width={20}
                                                    height={20}
                                                    className={cn({
                                                        'brightness-[3] invert-0': isActive
                                                    })}
                                                />
                                            </div>
                                            <p className={cn('text-16 font-semibold text-black-2',{
                                                '!text-white' : isActive}
                                            )}>
                                                {item.label}
                                            </p>
                                        </Link>
                                    </SheetClose>
                                )
                            })}
                            USER
                        </nav>
                    </SheetClose>
                    <Footer user={user} type='mobile'/>
                </div>
            </nav>
        </SheetContent>
        </Sheet>
    </section>
  )
}

export default MobileNav