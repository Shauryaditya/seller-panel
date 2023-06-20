import React from 'react'

const data = [
    {
        heading: 'Fill in details',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
        linkName: 'See More',
        href: 'seller-panel/product-category',
        img: '/assets/catelog/div1.png',
        arrow: '/assets/catelog/arrow1.png'
    },
    {
        heading: 'Add Product',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
        linkName: 'See More',
        href: 'seller-panel/product-category',
        img: '/assets/catelog/div2.png',
        arrow: '/assets/catelog/arrow2.png'
    },
    {
        heading: 'Wait for approval',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
        linkName: 'See More',
        href: 'seller-panel/product-category',
        img: '/assets/catelog/div3.png',
        arrow: '/assets/catelog/arrow3.png'
    },
    {
        heading: 'Publish Live',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
        linkName: 'See More',
        href: 'seller-panel/product-category',
        img: '/assets/catelog/div4.png',
    }
]
const HowToAddProduct = () => {
    return (
        <section>
            <div class='max-w-5xl mx-auto flex flex-col py-5'>
                <div class='flex flex-col items-center justify-center'>
                    <h2 class='text-2xl md:text-3xl text-gray-900'>How to add Products ?</h2>
                    <p class='text-base md:text-lg text-blue-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>
                <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                    {data.map((item) => (
                        <div class='flex flex-col relative px-4 my-5 lg:my-10'>
                            <div class='w-32 h-32'>
                                <img class='w-full h-full aspect-square' src={item.img} alt='img' />
                            </div>
                            <h2 class='text-xl md:text-2xl text-gray-900 font-bold'>{item.heading}</h2>
                            <p class='text-base md:text-sm text-gray-900 font-normal py-2'>{item.description}</p>
                            <div class='flex gap-2 items-center py-3'>
                                <a class='text-gray-900' href={item.href}>
                                    {item.linkName}
                                </a>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                            {item.arrow && (
                                <div class='w-16 md:w-24 absolute top-16 right-0 lg:-right-5'>
                                    <img src={item.arrow} alt='img' />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )
}

export default HowToAddProduct