'use client'
import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const Modals = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(12)

    const style = {
        position: 'absolute',
        top: '47.99px',
        height: '100px',
        width: '100px',
        bgcolor: 'background.paper',
        boxShadow: 'none',
        pt: '11px',
        outline: 'none',
        border: 'none',
    };
    return (
        <div>
            {open && <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <div class="text-[#111111] not-italic font-normal text-xs ">
                            <p>Add products</p>
                            <p>Add products via Upload</p>
                            <p>Complete your drafts</p>
                            <p>View selling applications</p>
                            <p>Upload Images</p>
                            <p>Upload & manage videos</p>
                            <p>Manage product documents</p>
                        </div>
                    </div>
                    <div>
                        <div class="text-[#111111] not-italic font-normal text-xs ">
                            <p>Add products</p>
                            <p>Add products via Upload</p>
                            <p>Complete your drafts</p>
                            <p>View selling applications</p>
                            <p>Upload Images</p>
                            <p>Upload & manage videos</p>
                            <p>Manage product documents</p>
                        </div>
                        <div class="text-[#111111] not-italic font-normal text-xs">
                            <p>Manage all inventory</p>
                            <p>Sell Globally</p>
                            <p>Inventory Planning</p>
                            <p>Store & Distribute</p>
                        </div>
                        <div class="text-[#111111] not-italic font-normal text-xs">
                            <p>Manage Pricing</p>
                            <p>Pricing Health</p>
                            <p>Automate Pricing</p>
                            <p>Fee Discounts</p>
                        </div>
                        <div class="text-[#111111] not-italic font-normal text-xs">
                            <p>Manage Orders</p>
                            <p>Order Reports</p>
                            <p>Upload Order Related Files</p>
                            <p>Manage Returns</p>
                        </div>
                        <div class="text-[#111111] not-italic font-normal text-xs">
                            <p>Payments</p>
                            <p>Business Reports</p>
                            <p>Return Reports</p>
                            <p>Custom Reports</p>
                            <p>Inventory Reports</p>
                            <p>Tax Reports</p>
                            <p>tax Document Library</p>
                            <p>Fulfillment</p>
                        </div>
                        <div class="text-[#111111] not-italic font-normal text-xs">
                            <p>B2B Central</p>
                            <p>Product Opportunities</p>
                            <p>Mange Quotes</p>
                        </div>
                    </div>
                </Box>
            </Modal>}
        </div>
    )

}
export default Modals;