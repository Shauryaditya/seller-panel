import React, { useState } from 'react'

const TableRow = (props) => {
    const { data, handleChange, index, isSaleClicked, isOfferClicked, } = props
    const { style, isSelect, color, styleName, product_sku, product_external_id, product_external_id_type, item_condition, max_retail_price, qty, offer_description, list_price, offer_start_date_offer, offer_end_date_offer } = data;

    return (
        <tr
            class={`border-b bg-white ${isSelect ? style : 'pointer-events-auto opacity-100'} `}>
            <td class="w-4  px-2 py-1">
                <div class="flex justify-center items-center">
                    <input
                        name='isSelect'
                        checked={isSelect}
                        onChange={(e) => handleChange(e, index)}
                        id="checkbox-table-search-1" type="checkbox" class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600"
                    />
                </div>
            </td>
            <th scope="row" class="whitespace-nowrap  px-2 py-1 font-medium text-gray-900">
                {color}
            </th>
            <th scope="row" class="whitespace-nowrap  px-2 py-1 font-medium text-gray-900">
                {styleName}
            </th>
            <td class=" px-2 py-1">
                <input type="text" class="w-36 outline-0 rounded-sm border border-solid border-gray-300 text-gray-900 px-2 py-2
                 shadow-[0px,1px,2px,#E6E6E6]"
                    name='product_sku'
                    value={product_sku}
                    onChange={(e) => handleChange(e, index)}
                />
            </td>
            <td class=" px-2 py-1">
                <input type="text" class="w-36 outline-0 rounded-sm border border-solid border-gray-300 text-gray-900 px-2 py-2 shadow-[0px,1px,2px,#E6E6E6]"
                    name='product_external_id'
                    value={product_external_id}
                    onChange={(e) => handleChange(e, index)}

                />
            </td>
            <td id="product-type" class=" px-2 py-1">
                <select
                    onChange={(e) => handleChange(e, index)}
                    name='product_external_id_type'
                    value={product_external_id_type}
                    id="product-type" class="rounded-sm border border-solid border-gray-300 text-gray-900 px-2 py-2 shadow-[0px,1px,2px,#E6E6E6]">
                    <option selected>--Selected --</option>
                    <option value="EAN">EAN</option>
                    <option value="GCID">GCID</option>
                    <option value="GTIN">GTIN</option>
                    <option value="UPC">UPC</option>
                    <option value="ASIN">ASIN</option>
                </select>
            </td>
            <td id="item-condition" class=" px-2 py-1">
                <select
                    onChange={(e) => handleChange(e, index)}
                    name='item_condition'
                    value={item_condition}
                    id="item-condition" class="rounded-sm border border-solid border-gray-300 text-gray-900 px-2 py-2 shadow-[0px,1px,2px,#E6E6E6]">
                    <option selected>--Selected --</option>
                    <option value="new">New</option>
                    <option value="old">Old</option>

                </select>
            </td>
            <td id="product-type" class=" px-2 py-1">
                <div class="flex items-center rounded-sm border border-solid border-gray-300 shadow-[0px,1px,2px,#E6E6E6]">
                    <p class="border-r border-solid border-gray-300 bg-gray-100 text-gray-900 px-2 py-2">INR</p>
                    <input
                        onChange={(e) => handleChange(e, index)}
                        name='max_retail_price'
                        value={max_retail_price}
                        type="number"
                        min='0'
                        autoComplete='off'
                        class="w-36 outline-0 text-gray-900 px-2 py-2" />
                </div>
            </td>

            <td class=" px-2 py-1">
                <input
                    onChange={(e) => handleChange(e, index)}
                    name='qty'
                    value={qty}
                    type="number"
                    min='0'
                    autoComplete='off'
                    class="w-20 rounded-sm border border-solid border-gray-300 text-gray-900 px-2 py-2 shadow-[0px,1px,2px,#E6E6E6]" />
            </td>
            <td class=" px-2 py-1">
                <div className={`${isOfferClicked ? 'block' : 'hidden'}`}>
                    <textarea
                        onChange={(e) => handleChange(e, index)}
                        name='offer_description'
                        value={offer_description}
                        autoComplete='off'
                        id="message" rows="2" class="block w-40 rounded-sm border border-solid border-gray-300 text-gray-900 px-2 py-2 text-sm shadow-[0px,1px,2px,#E6E6E6]" placeholder=""></textarea>
                </div>

            </td>

            <td class=" px-2 py-1">
                <div className={`${isSaleClicked ? 'block' : 'hidden'}`}>
                    <div class='flex items-center rounded-sm border border-solid border-gray-300 shadow-[0px,1px,2px,#E6E6E6]'>
                        <p class="border-r border-solid border-gray-300 bg-gray-100 text-gray-900 px-2 py-2">INR</p>
                        <input
                            onChange={(e) => handleChange(e, index)}
                            name='list_price'
                            value={list_price}
                            type="number" class="w-36 outline-0 text-gray-900 px-2 py-2" />
                    </div>
                </div>

            </td>
            <td class=" px-2 py-1">
                <div className={`${isSaleClicked ? 'block' : 'hidden'}`}>
                    <input
                        onChange={(e) => handleChange(e, index)}
                        name='offer_start_date_offer'
                        value={offer_start_date_offer}
                        type="date" class="w-36 outline-0 rounded-sm border border-solid border-gray-300 text-gray-900 px-2 py-2 shadow-[0px,1px,2px,#E6E6E6]" />

                </div>
            </td>
            <td class=" px-2 py-1">
                <div className={`${isSaleClicked ? 'block' : 'hidden'}`}>
                    <input
                        onChange={(e) => handleChange(e, index)}
                        name='offer_end_date_offer'
                        value={offer_end_date_offer}
                        type="date" class="w-36 outline-0 rounded-sm border border-solid border-gray-300 text-gray-900 px-2 py-2 shadow-[0px,1px,2px,#E6E6E6]" />
                </div>

            </td>

            <td class="flex items-center space-x-3  px-2 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                </svg>
            </td>
        </tr>

    )
}

export default TableRow