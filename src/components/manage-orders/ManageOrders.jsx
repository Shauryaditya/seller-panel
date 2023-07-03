import React, { useEffect, useState } from "react";
import Cancel from "./Cancel";
import Orders from "./Orders";
import Pending from "./Pending";
import "./styles/manage-orders.css";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Pagination from '@mui/lab/Pagination';
import Stack from '@mui/material/Stack';
import axios from "axios";

const ManageOrders = () => {
    const [selectedTab, setSelectedTab] = useState(2);
    const [totalOrders, setTotalOrders] = useState(null)
    const initialFilters = {
        days: "365",
        dateFrom: "",  // will only contain date if value of days = custom
        dateTo: "", // will only contain date if value of days = custom
        sortBy: 1,
        currentPage: 1,
        dataPerPage: 15,
        searchBy: "orderId",
        searchKeyword: "",
        isBusinessCustomer: false
    }
    const [filters, setFilters] = useState(initialFilters)

    const [openModal, setOpenModal] = useState(false)
    const [checkedOrderIds, setCheckedOrderIds] = useState([])
    const [orderData, setOrderData] = useState(null)
    const [filteredData, setFilteredData] = useState(null)
    const [isFilterVisible, setIsFilterVisible] = useState(true)
    const defaultProductFields = {
        time: true,
        timeFromOrderDate: true,
        fulfilmentMethod: true,
        salesChannel: true,
        country: false,
        sku: true,
        asin: true,
        image: true,
        itemSubtotal: true,
        condition: false,
        listingId: false,
        orderItemId: false,
        shipByDate: true,
        deliveryByDate: true
    }
    const [searchKey, setSearchKey] = useState("")
    const [productOptionalFields, setProductOptionalFields] = useState(defaultProductFields)
    const [productOptionalTemp, setProductOptionalTemp] = useState(defaultProductFields)
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #fff',
        boxShadow: 24,
    };

    const daysOptions = [
        {
            name: "Last day",
            value: "1"
        },
        {
            name: "Last 3 days",
            value: "3"
        },
        {
            name: "Last 7 days",
            value: "7"
        },
        {
            name: "Last 14 days",
            value: "14"
        },
        {
            name: "Last 30 days",
            value: "30"
        },
        {
            name: "Last 90 days",
            value: "90"
        },
        {
            name: "Last 180 days",
            value: "180"
        },
        {
            name: "Last 365 days",
            value: "365"
        },
        // {
        //     name: "Custom date range",
        //     value: "custom"
        // }
    ]
    const shipByDate = [
        { name: "Order date (ascending)", value: 1 },
        { name: "Order date (descending)", value: -1 }
    ]
    const perPageOptions = [
        { name: "15", value: "15" },
        { name: "25", value: "25" },
        { name: "50", value: "50" },
        { name: "100", value: "100" }
    ]
    const orderByType = [
        { name: "Order ID", value: "orderId" },
        { name: "ASIN", value: "asin" },
        { name: "Buyer email", value: "buyerEmail" },
        { name: "Listing ID", value: "listingId" },
        { name: "SKU", value: "sku" },
        { name: "Product name", value: "productName" },
        { name: "Tracking ID", value: "trackingId" }
    ]

    // will be received from API
    const productDummy = {
        image: "ae6cfbab-636b-4b43-acdd-efb88f0316f8",
        name: "Novium HOVERPEN 2.0 - Futuristic Luxury Pen Made With Aerospace Alloys, Unique Aesthetic, Free Spinning Executive Pen, Cool Gadgets",
        asin: "DFH4KJN34",
        sku: "Basics Mars Magma",
        subtotal: "13,499.00",
        condition: "Good",
        listingId: "238430",
        id: 45
    }


    const onChange = (e) => {
        const obj = filters
        if (e.target.type === "checkbox")
            obj[e.target.name] = e.target.checked
        else
            obj[e.target.name] = e.target.value
        setFilters({ ...obj })
    };

    const onOptionalChecked = (e) => {
        const obj = { ...productOptionalTemp }
        obj[e.target.name] = e.target.checked
        setProductOptionalTemp({ ...obj })
    }

    const getOrders = async (url, token) => {

        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error('Request failed');
            }
        } catch (error) {
            console.log('Error:', error.message);
            // Handle error appropriately
        }

        // const orders = await axios.get(`http://localhost:3000/v1/orders/get?days=${filters.days}&dateFrom=${filters.dateFrom}&dateTo=${filters.dateTo}&sortBy=${filters.sortBy}&searchBy=${filters.searchBy}&searchKeyword=${filters.searchKeyword}&perPage=${filters.dataPerPage}&pageNo=${filters.currentPage}`)
        // console.log(orders.data)

        // setOrderData(orders.data)
        // setFilteredData(orders.data)
    }

    const getOrderCount = async () => {
        // const orderCount = await axios.get(`http://localhost:3000/v1/orders/order-count`)
        // setTotalOrders(orderCount.data.ordercount)
    }

    useEffect(() => {
        console.log(filteredData);
        let url = ''
        if (filteredData === null) {
            url = `https://two1genx.onrender.com/v1/order/getAllOrders/seller?sort[order_date]=${filters.sortBy}&days=${filters.days}`;
            console.log(url);
        } if (filteredData === 'unpaid') {
            url = `https://two1genx.onrender.com/v1/order/getAllOrders/seller?sort[order_date]=${filters.sortBy}&days=${filters.days}&filter[payment][$eq]=${filteredData}`;
        } if (filteredData === 'cancel') {
            url = `https://two1genx.onrender.com/v1/order/getAllOrders/seller?sort[order_date]=${filters.sortBy}&days=${filters.days}&filter[payment][$eq]=paid`;
        }
        console.log(url);
        let token = localStorage.getItem('access_token')
        getOrders(url, token)
            .then(data => {
                setOrderData(data.orderList)
                setTotalOrders(data.totalCount)
                console.log('seller order', data);
            })
            .catch(error => {
                // Handle the error
                console.error(error);
            });

    }, [filters, selectedTab])

    useEffect(() => {
        getOrderCount()
    }, [])

    // const filterOrderData = (filter) => {
    //     if (filter == "all")
    //         setFilteredData(orderData)
    //     else {
    //         const obj = orderData
    //         const filteredObj = obj.filter((item) => {
    //             return item.orderStatus == filter
    //         })

    //         setFilteredData([...filteredObj])
    //     }
    // }

    const handlePageChange = (event, value) => {
        const obj = filters
        obj.currentPage = value
        setFilters({ ...obj })
    };
    // console.log('filterre data ', filteredData);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div class="mt-4 px-7 mb-12 pb-4 border-b border-[#cccccc]">

                <div class="flex w-full">
                    <div class="flex w-[70%]">
                        <p class=" not-italic font-normal text-2xl items-center ">Manage Orders
                        </p>
                    </div>
                    <div class="w-[30%] flex">
                        <div class=" flex w-1/3">
                            <select value={filters.searchBy} name='searchBy' class="w-full pl-1 py-1 bg-[#F0F2F2] text-xs font-medium text-[#0F1111]" style={{ boxShadow: "0px 2px 5px rgba(15, 17, 17, 0.15)", border: "1px solid #D5D9D9", borderRadius: "7px", width: "87px", height: "28.99px" }}
                                onChange={onChange}>
                                {orderByType.map((item) => {
                                    return (<option value={item.value}>{item.name}</option>)
                                })}
                            </select>
                        </div>
                        <div class="flex w-2/3 justify-end h-[32px]" >
                            <input
                                type="text"
                                className="block w-full px-2 py-2 text-gray-700 bg-white border rounded-l focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                name="searchKeyword"
                                onChange={(e) => { setSearchKey(e.target.value) }}
                                placeholder="Search"
                            />
                            <button class="text-xs font-medium text-[#FFFFFF] bg-[#303333] px-1 py-1 rounded-r" style={{ width: "64.32px" }}
                                onClick={() => {
                                    const obj = filters
                                    obj.searchKeyword = searchKey
                                    setFilters({ ...obj })
                                }}>Search</button>
                        </div>

                    </div>
                </div>
                <p class="pt-1.5 text-[#565959] text-[0.777rem] font-medium">fulfilled by 21 genx</p>
                {/* // tab section */}
                <div class="flex  border-b border-[#cccccc]">
                    <div class="flex flex-row items-start text-base font-normal text-[#007185]">
                        <p class={`mr-7 cursor-pointer py-2 ${selectedTab == 1 ? "font-medium border-b border-solid border-[#E77600]" : ""}`}
                            onClick={() => {
                                setSelectedTab(1)
                                setFilteredData("unpaid")
                            }}>Pending</p>
                        <p class={`mr-7 cursor-pointer py-2 ${selectedTab == 2 ? "font-medium border-b border-solid border-[#E77600]" : ""}`}
                            onClick={() => {
                                setSelectedTab(2)
                                setFilteredData(null)
                            }}>All orders</p>
                        <p class={`mr-7 cursor-pointer py-2 ${selectedTab == 3 ? "font-medium border-b border-solid border-[#E77600]" : ""}`}
                            onClick={() => {
                                setSelectedTab(3);
                                setFilteredData("cancel");
                            }}>Cancelled</p>
                    </div>

                </div>

                <div class="mt-3.5 flex  ">
                    <div class="w-1/6 border border-[#DDDDDD] px-3 pt-5 pb-8 bg-[#F3F3F3] h-fit">
                        <p class="text-[0.777rem] font-medium not-italic mb-2.5">Refine by</p>
                        <p class="text-[0.777rem] font-bold not-italic pb-1 border-b-2">Order Type</p>
                        <div class="flex items-center text-[0.777rem] font-medium not-italic py-1 border-b-2">
                            <input type="checkbox" class="mr-1" onChange={onChange} name="isBusinessCustomer" checked={filters.isBusinessCustomer} />
                            Business Customer
                        </div>
                    </div>


                    <div class="w-5/6 flex flex-col ml-6 h-fit">

                        <div class="flex flex-row flex-wrap">
                            <div class="w-[40%] flex flex-row items-center">
                                {isFilterVisible && <button class="text-xs font-bold text-[#fff] bg-[#303333] py-1" style={{ borderRadius: "20px", width: "90px", border: "1px solid #0F1111", boxShadow: "0px 2px 5px rgba(213, 217, 217, 0.5)" }}
                                    onClick={() => {
                                        setIsFilterVisible(false)
                                        setFilters(initialFilters)
                                    }}>Hide filters</button>}
                                {!isFilterVisible && <button class="text-xs font-bold text-[#fff] bg-[#303333] py-1" style={{ borderRadius: "20px", width: "90px", border: "1px solid #0F1111", boxShadow: "0px 2px 5px rgba(213, 217, 217, 0.5)" }}
                                    onClick={() => { setIsFilterVisible(true) }}>Show filters</button>}
                                <p class="font-bold text-lg ml-2">{orderData?.length} order(s)</p>
                                <p class="ml-2 text-[0.779rem] text-[#AAAAAA]">Last {filters.days} days</p>
                            </div>

                            {isFilterVisible && <div class="w-[60%] flex flex-row flex-wrap justify-between">
                                <div>
                                    <select value={filters.days} name='days' class="w-full pl-1 py-1 bg-[#F0F2F2] text-xs font-medium text-[#0F1111]" style={{ boxShadow: "0px 2px 5px rgba(15, 17, 17, 0.15)", border: "1px solid #D5D9D9", borderRadius: "7px", width: "110px" }}
                                        onChange={onChange}>
                                        {daysOptions.map((item) => {
                                            return (<option value={item.value}>{item.name}</option>)
                                        })}
                                    </select>

                                </div>
                                <div><select value={filters.sortBy} name='sortBy' class="w-full pl-1 py-1 bg-[#F0F2F2] text-xs font-medium text-[#0F1111]" style={{ boxShadow: "0px 2px 5px rgba(15, 17, 17, 0.15)", border: "1px solid #D5D9D9", borderRadius: "7px", width: "180px" }}
                                    onChange={onChange}>
                                    {shipByDate.map((item) => {
                                        return (<option value={item.value}>{item.name}</option>)
                                    })}
                                </select></div>
                                <div><select value={filters.dataPerPage} name='dataPerPage' class="w-full pl-1 py-1 bg-[#F0F2F2] text-xs font-medium text-[#0F1111]" style={{ boxShadow: "0px 2px 5px rgba(15, 17, 17, 0.15)", border: "1px solid #D5D9D9", borderRadius: "7px", width: "50px" }}
                                    onChange={onChange}>
                                    {perPageOptions.map((item, index) => {
                                        return (<option key={index} value={item.value}>{item.name}</option>)
                                    })}
                                </select></div>
                                <div class="bg-[ #FFFFFF] text-xs font-medium text-[#0F1111] px-2 py-1 cursor-pointer" style={{ boxShadow: "0px 2px 5px rgba(213, 217, 217, 0.5)", border: "1px solid #D5D9D9", borderRadius: "7px" }}
                                    onClick={() => {
                                        setOpenModal(true)
                                        setProductOptionalTemp(productOptionalFields)
                                    }}>Set Table Preferences</div>
                                <div class=" bg-[ #FFFFFF] text-xs font-medium text-[#0F1111] px-2 py-1 cursor-pointer" style={{ boxShadow: "0px 2px 5px rgba(213, 217, 217, 0.5)", border: "1px solid #D5D9D9", borderRadius: "7px" }}
                                    onClick={() => { setFilters(initialFilters) }}>Refresh</div>


                                {filters.days === "custom" && <div class="datepicker-wrapper text-xs font-medium text-[#0F1111] mt-3 flex flex-row items-center">
                                    <span className="mr-1">From:</span>
                                    <DatePicker
                                        value={filters.dateFrom}
                                        onChange={(newValue) => {
                                            const obj = filters
                                            obj["dateFrom"] = newValue
                                            setFilters({ ...obj })
                                        }}
                                    />
                                    <span className="mx-1">To:</span>
                                    <DatePicker
                                        value={filters.dateTo}
                                        onChange={(newValue) => {
                                            const obj = filters
                                            obj["dateTo"] = newValue
                                            setFilters({ ...obj })
                                        }}
                                    />
                                </div>}
                            </div>}
                        </div>

                        {/* {(selectedTab == 1 && orderData) && <Pending orders={orderData} productDummy={productDummy} checkedIds={[...checkedOrderIds]} setCheckedIds={setCheckedOrderIds} orderOptionalFields={productOptionalFields} />
                        } */}
                        {
                            orderData &&
                            <Orders orders={orderData} productDummy={productDummy} checkedIds={[...checkedOrderIds]} setCheckedIds={setCheckedOrderIds} orderOptionalFields={productOptionalFields} />
                        }
                        {/* {
                            (selectedTab == 3 && orderData) &&
                            <Cancel
                                orders={orderData}
                                productDummy={productDummy}
                                checkedIds={[...checkedOrderIds]} setCheckedIds={setCheckedOrderIds} orderOptionalFields={productOptionalFields}
                            />
                        } */}

                        {orderData && selectedTab == 2 &&
                            <div class="mt-4 ">
                                <div class="flex flex-col items-center">
                                    <Stack spacing={2}>
                                        <Pagination
                                            count={parseInt(totalOrders / filters.dataPerPage) + 1}
                                            onChange={handlePageChange}
                                            variant="outlined"
                                            color="primary"
                                        />
                                    </Stack>

                                    <p class="text-[11px] text-[#808080] pt-2 ml-2">Showing orders {(filters.currentPage - 1) * filters.dataPerPage + 1} - {(totalOrders >= (filters.dataPerPage * filters.currentPage) ? (filters.dataPerPage * filters.currentPage) : totalOrders)} of total orders.</p>
                                </div>
                                <div class="flex flex-row justify-end items-center pt-1">
                                    <p class="text-[14px] text-[#909090] mr-2">Results per page</p>
                                    <select value={filters.dataPerPage} name='dataPerPage' class="w-full pl-1 py-1 bg-[#F0F2F2] text-xs font-medium text-[#0F1111]" style={{ boxShadow: "0px 2px 5px rgba(15, 17, 17, 0.15)", border: "1px solid #D5D9D9", borderRadius: "7px", width: "50px" }}
                                        onChange={onChange}>
                                        {perPageOptions.map((item) => {
                                            return (<option value={item.value}>{item.name}</option>)
                                        })}
                                    </select>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
            <Modal
                open={openModal}
                onClose={() => {
                    setOpenModal(false)
                    setProductOptionalTemp({ ...defaultProductFields })
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <div class="bg-[#F5F5F5] p-4">
                        <p class=" font-semibold pl-4">Set default Manage Order table Preference</p>
                    </div>

                    <div class="grid grid-cols-3 p-2 ml-7 mb-4 text-sm not-italic">
                        <div class="flex flex-col items-start">
                            <p class="mb-2 font-bold text-[ #0F1111] ">Order date</p>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" disabled checked /> Day</div>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" name="time" checked={productOptionalTemp.time}
                                onChange={onOptionalChecked} /> Time</div>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" name="timeFromOrderDate" checked={productOptionalTemp.timeFromOrderDate}
                                onChange={onOptionalChecked} /> Time from the order date</div>
                        </div>

                        <div class="flex flex-col items-start">
                            <p class="mb-2  text-base font-bold text-[ #0F1111] not-italic">Order details</p>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" disabled checked />Order ID</div>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" disabled checked />Buyer name</div>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" name="fulfilmentMethod" checked={productOptionalTemp.fulfilmentMethod}
                                onChange={onOptionalChecked} />Fulfilment method</div>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" name="salesChannel" checked={productOptionalTemp.salesChannel}
                                onChange={onOptionalChecked} />Sales channel</div>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" name="country" checked={productOptionalTemp.country}
                                onChange={onOptionalChecked} />Billing Country/Region</div>
                        </div>

                        <div class="flex flex-col items-start">
                            <p class="mb-2  text-base font-bold text-[ #0F1111] not-italic">Product name</p>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" disabled checked />Name</div>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" disabled checked />Quantity</div>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" name="sku" checked={productOptionalTemp.sku}
                                onChange={onOptionalChecked} />SKU</div>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" name="asin" checked={productOptionalTemp.asin}
                                onChange={onOptionalChecked} />ASIN</div>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" name="image" checked={productOptionalTemp.image}
                                onChange={onOptionalChecked} />Image</div>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" name="itemSubtotal" checked={productOptionalTemp.itemSubtotal}
                                onChange={onOptionalChecked} />Item subtotal</div>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" name="condition" checked={productOptionalTemp.condition}
                                onChange={onOptionalChecked} />Condition</div>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" name="listingId" checked={productOptionalTemp.listingId}
                                onChange={onOptionalChecked} />Listing ID</div>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" name="orderItemId" checked={productOptionalTemp.orderItemId}
                                onChange={onOptionalChecked} />Order Item ID</div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 p-2 ml-7 mb-10 text-sm not-italic">
                        <div class="flex flex-col items-start ">
                            <p class="mb-2 text-base font-bold text-[ #0F1111] not-italic">Customer Option</p>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" disabled checked /> Customer shipping service</div>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" name="shipByDate" checked={productOptionalTemp.shipByDate}
                                onChange={onOptionalChecked} />Ship by date</div>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" name="deliveryByDate" checked={productOptionalTemp.deliveryByDate}
                                onChange={onOptionalChecked} />Deliver by date</div>
                        </div>
                        <div class="flex flex-col items-start">
                            <p class="mb-2 text-base font-bold text-[ #0F1111] not-italic">Order Status</p>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" disabled checked /> Order fullfilment status</div>
                            <div class="flex justify-center mb-1"><input
                                type="checkbox" class="mr-1" disabled checked />Status warnings</div>
                        </div>
                    </div>
                    <div class="flex flex-row justify-end mr-4 mb-4">
                        <div class="flex items-center justify-center"><button class="px-1.5 py-1 bg-[#FFFFFF] text-xs font-medium" style={{ "border": "1px solid #D5D9D9", "boxShadow": "0px 2px 5px rgba(213, 217, 217, 0.5)", "borderRadius": "5px" }}
                            onClick={() => {
                                setOpenModal(false)
                                setProductOptionalTemp({ ...defaultProductFields })
                            }}>Cancel</button></div>
                        <div class="flex items-center justify-center ml-2"><button class="px-1.5 py-1 bg-[#FADC10] text-xs font-medium" style={{ "border": "1px solid #D5D9D9", "boxShadow": "0px 2px 5px rgba(213, 217, 217, 0.5)", "borderRadius": "5px" }}
                            onClick={() => {
                                setOpenModal(false)
                                setProductOptionalFields({ ...productOptionalTemp })
                            }}>Save Preferences</button></div>
                    </div>
                </Box>

            </Modal>
        </LocalizationProvider>
    )
}
export default ManageOrders;