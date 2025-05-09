'use client'

import { usePathname, useRouter } from 'next/navigation'

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import BtnLogout from './BtnLogout/BtnLogout'
import Link from 'next/link'
import Image from 'next/image'

const user = {
    imageUrl:
        '/admin/admin/user.png',
}

const navigation = [
    { name: 'Panel', href: '/admin', current: true },
    { name: 'Videos', href: '/admin/videos', current: false },
    { name: 'Eventos', href: '/admin/events', current: false },
    { name: 'Recursos', href: '/admin/resources', current: false },
    { name: 'Artículos', href: '/admin/news', current: false },
    { name: 'Administradores', href: '/admin/admins', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const isCurrentPath = (current, href) => {
    if (current == href) return true
    return false
}

function AdminNav() {
    const pathname = usePathname()
    const router = useRouter()
    
    const buttonHandler = async (e) => {
        e.preventDefault()
        const response = await fetch('/api/admins/profile');
        const result = await response.json();
        router.push(`/admin/profile?user=${result.data}`)
    }
    return (

        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Image
                                alt="Your Company"
                                src="/admin/inkuALogo.png"
                                className="h-8 w-auto"
                                width={150}
                                height={150}
                            />
                        </div>
                        <div className="hidden md:block">
                            <nav className="ml-10 flex items-baseline space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        aria-current={isCurrentPath(pathname, item.href) ? 'page' : undefined}
                                        className={classNames(
                                            isCurrentPath(pathname, item.href) ? ' text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium',
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <img alt="user" src={user.imageUrl} className="h-8 w-8 rounded-full bg-blue-200 object-scale-down" />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <MenuItem>
                                        <button
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                            onClick={(e) => buttonHandler(e)}
                                            onKeyDown={(e) => { (e.key === 'Enter' || e.key === ' ') && (buttonHandler(e)) }}>
                                            Perfil
                                        </button>
                                    </MenuItem>

                                    <MenuItem >
                                        <Link
                                            href={"/admin/settings"}
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                        >
                                            Contraseña
                                        </Link>
                                    </MenuItem>

                                    <BtnLogout />
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="md:hidden">
                <nav className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={isCurrentPath(pathname, item.href) ? 'page' : undefined}
                            className={classNames(
                                isCurrentPath(pathname, item.href) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </nav>
                <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                            <img alt="" src={user.imageUrl} className="h-10 w-10 rounded-full" />
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium leading-none text-white">{user.name}</div>
                            <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                        </div>

                    </div>
                    <div className="mt-3 space-y-1 px-2">
                        <button
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                            onClick={(e) => buttonHandler(e)}
                            onKeyDown={(e) => { (e.key === 'Enter' || e.key === ' ') && (buttonHandler(e)) }}>
                            Perfil
                        </button>

                        <DisclosureButton
                            as="a"
                            href="/admin/settings"
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                            Contraseña
                        </DisclosureButton>

                        <BtnLogout />
                    </div>
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}

export default AdminNav
