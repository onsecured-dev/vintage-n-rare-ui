import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'

export default function Categories() {
    return (
        <div className='container flex flex-col flex-nowrap items-start justify-between px-8 pt-4 pb-8 h-52 '>


            <p className="text-3xl font-bold ml-12">
                Categories
            </p>
            <div className='container flex flex-row flex-nowrap items-center justify-between px-8 pt-4 pb-8 h-48 '>

                <Link href={""} className='rounded-3xl flex-1 flex flex-col flex-nowrap bg-cool-1 bg-cover text-center content-center align-bottom border-2 border-gray-600 mx-4 h-40 '>
                    <div className='flex-2 h-36'></div>
                    <div className='text- bg-gray-800 opacity-50 rounded-b-3xl'>
                        <p className='font-semibold text-xl '>Acoustic</p>
                    </div>
                </Link>
                <Link href={""} className='rounded-3xl flex-1 flex flex-col flex-nowrap bg-cool-2 bg-cover text-center mx-4 h-40 border-2 border-gray-600 '>
                    <div className='flex-2 h-36'></div>
                    <div className='text-center bg-gray-800 opacity-50 rounded-b-3xl'>
                        <p className='font-semibold text-xl '>Electric Bass</p>
                    </div>
                </Link>
                <Link href={""} className='rounded-3xl flex-1 flex flex-col flex-nowrap bg-cool-3 bg-cover text-center mx-4 h-40 border-2 border-gray-600 '>
                    <div className='flex-2 h-36'></div>
                    <div className='text-center bg-gray-800 opacity-50 rounded-b-3xl'>
                        <p className='font-semibold text-xl '>Electric Guitar</p>
                    </div>
                </Link>
                <Link href={""} className='rounded-3xl flex-1 flex flex-col flex-nowrap bg-cool-4 bg-cover text-center mx-4 h-40 border-2 border-gray-600 '>
                    <div className='flex-2 h-36'></div>
                    <div className='text-center bg-gray-800 opacity-50 rounded-b-3xl'>
                        <p className='font-semibold text-xl '>Amps & Effects</p>
                    </div>
                </Link>
            </div>

        </div>

    )
}

