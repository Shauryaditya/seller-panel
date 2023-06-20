import React from 'react'
const data = [
    {
        heading: 'Adding products',
        description: 'Get the basics of adding products to 21Genx catelog',
        linkName: 'Learn More',
        link: '/seller-panel/add-product'
    },
    {
        heading: 'Volume listings',
        description: 'Learn how to use spreadsheets to upload your inventory and more.',
        linkName: 'Learn More',
        link: '/seller-panel/add-product'
    },
    {
        heading: 'Categories requiring approval',
        description: 'Sellers are required to obtain approval from Amazon before listing in certain product categories.',
        linkName: 'Manage your selling applications',
        link: '/seller-panel/add-product'
    },
    {
        heading: 'Create variations',
        description: 'Learn about relationship types and when to use variation relationships.',
        linkName: 'Create variations using Variation Wizard',
        link: '/seller-panel/add-product'
    },
    {
        heading: "What's a GTIN?",
        description: 'You can find the barcode or GTIN (UPC/EAN/JAN/ISBN) on the packaging of your item. If you do not have a GTIN, you can apply for exemption.',
        linkName: 'Learn More',
        link: '/seller-panel/add-product'
    },
    {
        heading: "GTIN exemption status",
        description: 'If you have requested GTIN exemption you can see the status in Your',
        linkName: 'Check your status here',
        link: '/seller-panel/add-product'
    },
    {
        heading: "Product image guidance",
        description: 'Every product on Amazon needs one or more product image. Read about image standards for listings.',
        linkName: 'Learn More',
        link: '/seller-panel/add-product'
    },
    {
        heading: "Converting to Amazon templates",
        description: 'If you have your own e-commerce website or use another system, you can export your product details into a file.',
        linkName: 'Upload Non-Amazon Template',
        link: '/seller-panel/add-product'
    },
    {
        heading: "Compliance Reference",
        description: 'Learn Compliance requirements and service providers for your products',
        linkName: 'Compliance self-assessment',
        link: '/seller-panel/add-product'
    }

]
const AboutAddingProduct = () => {
    return (
        <section>
            <div className='p-5'>
                <h2 className='text-lg text-blue-900 px-5'>
                    About adding products
                </h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {
                        data.map((item) => (
                            <div className='flex flex-col p-5'>
                                <h3>{item.heading}</h3>
                                <p className='text-xs text-gray-900 py-2'>{item.description}</p>
                                <a href={item.link} className='text-xs text-[#008296] py-1'>{item.linkName}</a>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>

    )
}

export default AboutAddingProduct