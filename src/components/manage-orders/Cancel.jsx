import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

 const Cancel=(props)=>{
    const {orders, productDummy, checkedIds, setCheckedIds, orderOptionalFields} = props
    const ASSET_BASE_URL ="https://mgmt.21genx.com/assets/"
    const [isCheckedAll, setIsCheckedAll] = useState(false)
    const onCheckToggle=(orderId, isChecked)=>{
        const data = checkedIds
        if(isChecked){
            data.push(orderId)
        }else{
            // find index of the orderId to be removed from the array
            const index = data.indexOf(orderId)
            data.splice(index, 1) // remove 1 element from that index
            setIsCheckedAll(false) // if all was checked then make it to unchecked, since 1 item is unchecked
        }
        setCheckedIds([...data])
    }

    const onCheckAllToggle=(isChecked)=>{
        setIsCheckedAll(isChecked)
        let data = checkedIds
        if(isChecked){
            orders.forEach((order)=>{
                // if current order is not checked then push its index to checked indices
                if(checkedIds.indexOf(order.orderId)==-1)
                    data.push(order.orderId)
            })
        }else{
            // remove all from checked indices array
             data=[]
        }
        setCheckedIds([...data])
    }


    return(
        <div class="mt-8">
            {orders.length==0 && <div>No Cancelled Orders found</div>}
        {orders.length!=0 && <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow class=" bg-[#E7E7E7]">
              <TableCell style={{padding:"8px"}}><div class="text-xs font-normal text-[ #0F1111] not-italic flex justify-center">
                <input
                    type="checkbox" checked={isCheckedAll} onChange={(e)=>{onCheckAllToggle(e.target.checked)}} class="mr-1"/>
                    <span>Order date</span></div></TableCell>
              <TableCell style={{padding:"8px 16px"}}><span class="text-xs font-normal text-[ #0F1111] not-italic">Order details</span></TableCell>
              {orderOptionalFields.image &&<TableCell style={{padding:"8px 16px"}}><span class="text-xs font-normal text-[ #0F1111] not-italic">Image</span></TableCell>}
              <TableCell style={{padding:"8px 16px"}}><span class="text-xs font-normal text-[ #0F1111] not-italic">Product name</span></TableCell>
              <TableCell style={{padding:"8px 16px"}}><span class="text-xs font-normal text-[ #0F1111] not-italic">Customer option</span></TableCell>
              <TableCell style={{padding:"8px 16px"}}><span class="text-xs font-normal text-[ #0F1111] not-italic">Order Status</span></TableCell>
              <TableCell style={{padding:"8px 16px"}}><span class="text-xs font-normal text-[ #0F1111] not-italic">Action</span></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell style={{width:"10%"}}>
                    <div class="flex flex-row text-[0.55rem] items-start">
                      <input
                        type="checkbox"
                        checked={(checkedIds.includes(order.orderId) || isCheckedAll)}
                         onChange={(e)=>{onCheckToggle(order.orderId, e.target.checked)}}/>
                        {
                          <div class="flex flex-col items-start ml-1">
                            {orderOptionalFields.timeFromOrderDate && <p class="font-bold not-italic text-[0.55rem]">{Math.round((new Date() - new Date(order.orderDate))/(1000 * 60 * 60 * 24))} day(s) ago</p>}
                            <p class="text-[#696969]">{new Date(order.orderDate).toLocaleDateString()}</p>
                            {orderOptionalFields.time &&<p class="text-[#696969]">{new Date(order.orderDate).toLocaleTimeString()}</p>}
                        </div>}
                    </div>
                </TableCell>
                <TableCell style={{width:"20%"}}>
                     <div class="flex flex-col items-start text-[0.55rem]">
                            <p class="text-[#007185] font-normal">{order.orderId}</p>
                            {order.buyerName!=null && order.buyerName!="" &&<p class="">Buyer name: {order.buyerName}</p>}
                            {orderOptionalFields.fulfilmentMethod &&<p class="text-[#696969]">Fulfilment method: {order.fullfilmentMethod}</p>}
                            {orderOptionalFields.salesChannel &&<p class="text-[#696969]">Sales channel: {order.salesChannel}</p>}
                           <p class="text-[#696969]">Seller order ID: {order.sellerOrderId}</p>
                           {orderOptionalFields.country &&<p class="text-[#696969]">Billing Country/Region: {order.country}</p>}
                        </div>
                </TableCell>
                {orderOptionalFields.image &&<TableCell style={{width:"5%"}}>
                    <img src={`${ASSET_BASE_URL}${productDummy.image}`} class="h-8 w-8"/>
                </TableCell>}

                <TableCell style={{width:"25%"}}>
                    <div class="flex flex-col items-start text-[0.55rem]">
                            <p class="text-[#007185]">{productDummy.name}</p>
                            {orderOptionalFields.asin && <p class="">ASIN: {productDummy.asin}</p>}
                            {orderOptionalFields.sku &&<p class="text-[#696969]">SKU: {productDummy.sku}</p>}
                            <p class="text-[#696969]">Quantity: {order.quantity}</p>
                            {orderOptionalFields.condition &&<p class="text-[#696969]">Condition: {productDummy.condition}</p>}
                            {orderOptionalFields.listingId &&<p class="text-[#696969]">Listing ID: {productDummy.listingId}</p>}
                            {orderOptionalFields.orderItemId &&<p class="text-[#696969]">Order Item ID: {productDummy.id}</p>}
                            {orderOptionalFields.itemSubtotal &&<p class="text-[#696969]">Item subtotal: ₹{productDummy.subtotal}</p>}
                        </div>
                </TableCell>
                    
                <TableCell style={{width:"13%"}}>
                    <p class="text-[0.55rem] font-bold text-[#000000]">{order.customerOption}</p>
                    {orderOptionalFields.shipByDate &&<p class="text-[0.55rem] font-bold text-[#000000]">Ship by: {new Date(order.shipBy).toLocaleDateString()}</p>}
                    {orderOptionalFields.deliveryByDate &&<p class="text-[0.55rem] font-bold text-[#000000]">Deliver by: {new Date(order.deliverBy).toLocaleDateString()}</p>}
                </TableCell>

                <TableCell style={{width:"12%"}}>
                    {order.orderStatus === "Payment_Complete" && <p class="text-[0.55rem] text-white bg-[#4CAF50] py-0.5 px-0.5 text-center">Payment Complete</p>}
                    {order.orderStatus === "Payment_Pending" && <p class="text-[0.55rem] text-white bg-[#a4a7ab] py-0.5 px-0.5 text-center">Payment Pending</p>}
                    {order.orderStatus === "Cancel" && <p class="text-[0.55rem] text-white bg-[#f04646] py-0.5 px-0.5 text-center">Cancelled</p>}
                </TableCell>

                <TableCell style={{width:"15%"}}>
                    <div class="flex flex-col items-center text-[0.55rem]">
                    <div  class="bg-[ #FFFFFF] font-medium text-[#0F1111] px-2 py-1 cursor-pointer w-full mb-1 text-center" style={{boxShadow: "0px 2px 5px rgba(213, 217, 217, 0.5)", border:"1px solid #D5D9D9", borderRadius:"7px"}}>Print tax invoice</div>
                    <div  class="bg-[ #FFFFFF] font-medium text-[#0F1111] px-2 py-1 cursor-pointer w-full mt-1 text-center" style={{boxShadow: "0px 2px 5px rgba(213, 217, 217, 0.5)", border:"1px solid #D5D9D9", borderRadius:"7px"}}>Refund order</div>
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
      </div>
        )
}
export default Cancel;