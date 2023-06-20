import React from 'react'

const Varition = ({ id, varition, img, sku, productName, date, available, feePreview, priceandShopping }) => {
    return (
        <tr className="border-b bg-white">
            <td className="w-4 p-4">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 " />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </td>
            <td>
                <p classNameName='font-bold '><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                </p>
            </td>
            <td scope="row" className="whitespace-nowrap px-2 py-4 font-medium text-gray-900">{varition}</td>
            <td className="px-2 py-4">
                <div className='min-w-[80px]'>
                    <img className='w-20 h-20 aspect-square' src={img} />
                </div>

            </td>
            <td className="px-2 py-4">
                <p className='text-teal-500 font-normal text-sm'>{sku}</p>
            </td>
            <td className="px-2 py-4">
                <div>
                    <p className='text-teal-500 font-normal text-sm'>{productName}</p>
                    <p className='text-xs text-gray-600 font-normal uppercase'>B0BWRYKLHN</p>
                </div>
            </td>
            <td className="px-2 py-4">
                <div>
                    <p className='text-xs text-teal-500 font-normal'>{date}</p>
                    <p className='text-xs text-gray-600 font-normal uppercase'>{date}</p>
                </div>
            </td>
            <td>

            </td>
            <td className="px-2 py-4">{available}</td>
            <td className="px-2 py-4">{feePreview}</td>

            <td className=''>

                <div>
                    <p className='text-teal-500 '>Add quantity +</p>
                    <p>Disconts: {priceandShopping}</p>
                </div>
            </td>
            <td className='px-2 py-4'>
                <a href='/'>
                    <select value="" className='bg-white rounded-md shadow-[0px_2px_5px_rgba(15,17,17,0.15)] px-4 py-1 outline-none'>
                        <option value="option" selected >Edit</option>
                        <option value="Orange">Orange</option>
                        <option value="Radish">Radish</option>
                        <option value="Cherry">Cherry</option>
                    </select>
                </a>
            </td>
        </tr>
    )
}

export default Varition