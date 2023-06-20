import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
    return (
        <section>
            <div class='flex flex-col md:flex-row items-center'>
                <div class='w-full md:w-1/2 h-[30rem]'>
                    <img class='w-full h-full object-contain aspect-square mix-blend-multiply' src='/assets/catelog/cateloghome.jpg' />
                </div>
                <div class='w-full md:w-1/2 flex flex-col'>
                    <div class='max-w-xl'>
                        <h3 class='text-xs md:text-sm font-bold text-blue-900'>To begin adding products</h3>
                        <h1 class='text-xl md:text-3xl text-gray-900 max-w-xs py-1'>Add, sell &amp; earn Products<span class='text-blue-500'> fast.</span></h1>
                    </div>
                    <form>
                        <div class='max-w-xl flex items-center border border-solid border-[#AAB7B8] my-1'>
                            <input class='w-full px-2 py-1 outline-0 border-r' type='text'
                                placeholder='Product name, UPC, EAN, ISBN or ASIN'
                            />
                            <div class='px-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </div>
                        </div>
                    </form>
                    <div class='max-w-xl flex flex-wrap my-2'>
                        <Link class='basis-1/3 text-xs md:text-sm text-blue-500 text-center p-2 inline-block border-x-2' href='/select-category'>
                            I'm adding a product not sold on 21genx
                        </Link>
                        <Link class='basis-1/3 text-xs md:text-sm text-blue-500 text-center p-2' href='/select-category'>
                            I'm uploading a file to add multiple products
                        </Link>
                        <Link class='basis-1/3 text-xs md:text-sm text-blue-500 text-center p-2 inline-block border-x-2' href='/select-category'>
                            I want to learn how to list products
                        </Link>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default HeroSection