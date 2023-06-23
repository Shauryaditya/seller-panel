import React, { useEffect, useState } from "react";
import ProductIdentity from './ProductIdentity'
import VitalInfo from './VitalInfo'
import Offer from './Offer'
import Compliance from './Compliance'
import Description from './Description'
import Keywords from './Keywords'
import MoreDetails from './MoreDetails'
import Upload from "./Images";
import Variations from "./Variations";
import Productawards from "./Awards";
import { useRouter } from "next/router";
const AddProduct = () => {
    // id from querry
    // const router = useRouter();
    // const { category_id } = router.query;
    // console.log(category_id);
    const [selectedTab, setSelectedTab] = useState(1)
    const [formData, setFormData] = useState({})
    const [draftedTabs, setDraftedTabs] = useState([])
    useEffect(() => { console.log(formData) }, [formData])
    const [id, setId] = useState("")
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id')
        setId(id);
        let sellerId = localStorage.getItem('userId')
        setFormData((preValue) => {
            return { ...preValue, category_id: id, seller_id: sellerId }
        })
        console.log(id)
    }, []);
    const [productId, setProductId] = useState('')
    const handleProductId = (id) => {
        setProductId(id)
        console.log(id)
    }
    const [variationResData, setVariationResData] = useState([])
    const variationsResponse = (data) => {
        setVariationResData(data)
        console.log(data);
    }

    return (
        <section class='pt-5'>
            <div class='flex justify-center flex-wrap gap-x-5 bg-white bg-opacity-2 shadow-[0px_1px_2px_rgba(32,33,36,0.28)]'>
                <p class={`text-sm text-indigo-900 px-4 py-2 cursor-pointer ${selectedTab == 1 ? "font-bold border-b-2 border-solid border-[#38B2AC]" : "font-normal"}`}
                    onClick={() => { setSelectedTab(1) }}>Product Identity</p>
                <p class={`text-sm text-indigo-900 px-4 py-2 cursor-pointer ${selectedTab == 2 ? "font-bold border-b-2 border-solid border-[#38B2AC]" : "font-normal"}`}
                    onClick={() => { setSelectedTab(2) }}>Vital Info</p>
                <p class={`text-sm text-indigo-900 px-4 py-2 cursor-pointer ${selectedTab == 3 ? "font-bold border-b-2 border-solid border-[#38B2AC]" : "font-normal"}`}
                    onClick={() => { setSelectedTab(3) }}>Offer</p>
                <p class={`text-sm text-indigo-900 px-4 py-2 cursor-pointer ${selectedTab == 4 ? "font-bold border-b-2 border-solid border-[#38B2AC]" : "font-normal"}`}
                    onClick={() => { setSelectedTab(4) }}>Compliance</p>
                <p class={`text-sm text-indigo-900 px-4 py-2 cursor-pointer ${selectedTab == 5 ? "font-bold border-b-2 border-solid border-[#38B2AC]" : "font-normal"}`}
                    onClick={() => { setSelectedTab(5) }}>Description</p>
                <p class={`text-sm text-indigo-900 px-4 py-2 cursor-pointer ${selectedTab == 6 ? "font-bold border-b-2 border-solid border-[#38B2AC]" : "font-normal"}`}
                    onClick={() => { setSelectedTab(6) }}>Keywords</p>
                <p class={`text-sm text-indigo-900 px-4 py-2 cursor-pointer ${selectedTab == 7 ? "font-bold border-b-2 border-solid border-[#38B2AC]" : "font-normal"}`}
                    onClick={() => { setSelectedTab(7) }}>Award</p>
                <p class={`text-sm text-indigo-900 px-4 py-2 cursor-pointer ${selectedTab == 8 ? "font-bold border-b-2 border-solid border-[#38B2AC]" : "font-normal"}`}
                    onClick={() => { setSelectedTab(8) }}>More Details</p>
                <p class={`text-sm text-indigo-900 px-4 py-2 cursor-pointer ${selectedTab == 9 ? "font-bold border-b-2 border-solid border-[#38B2AC]" : "font-normal"}`}
                    onClick={() => { setSelectedTab(9) }}>Variations
                </p>
                <p class={`text-sm text-indigo-900 px-4 py-2 cursor-pointer ${selectedTab == 10 ? "font-bold border-b-2 border-solid border-[#38B2AC]" : "font-normal"}`}
                    onClick={() => { setSelectedTab(10) }}>Images</p>


            </div>
            {selectedTab == 1 && <ProductIdentity id={id} setSelectedTab={setSelectedTab} formData={formData} setFormData={setFormData} draftedTabs={draftedTabs} setDraftedTabs={setDraftedTabs} />}
            {selectedTab == 2 && <VitalInfo id={id} setSelectedTab={setSelectedTab} formData={formData} setFormData={setFormData} draftedTabs={draftedTabs} setDraftedTabs={setDraftedTabs} />}
            {selectedTab == 3 && <Offer id={id} setSelectedTab={setSelectedTab} formData={formData} setFormData={setFormData} draftedTabs={draftedTabs} setDraftedTabs={setDraftedTabs} />}
            {selectedTab == 4 && <Compliance id={id} setSelectedTab={setSelectedTab} formData={formData} setFormData={setFormData} draftedTabs={draftedTabs} setDraftedTabs={setDraftedTabs} />}
            {selectedTab == 5 && <Description id={id} setSelectedTab={setSelectedTab} formData={formData} setFormData={setFormData} draftedTabs={draftedTabs} setDraftedTabs={setDraftedTabs} />}
            {selectedTab == 6 && <Keywords id={id} setSelectedTab={setSelectedTab} formData={formData} setFormData={setFormData} draftedTabs={draftedTabs} setDraftedTabs={setDraftedTabs} />}
            {selectedTab == 7 && <Productawards id={id} setSelectedTab={setSelectedTab} formData={formData} setFormData={setFormData} draftedTabs={draftedTabs} setDraftedTabs={setDraftedTabs} />}
            {selectedTab == 8 && <MoreDetails id={id} handleProductId={handleProductId} setSelectedTab={setSelectedTab} formData={formData} setFormData={setFormData} draftedTabs={draftedTabs} setDraftedTabs={setDraftedTabs} />}
            {selectedTab == 9 && <Variations
                id={id}
                productId={productId}
                variationsResponse={variationsResponse}
                setSelectedTab={setSelectedTab} formData={formData} setFormData={setFormData} draftedTabs={draftedTabs} setDraftedTabs={setDraftedTabs} />}
            {selectedTab == 10 && <Upload
                variationResData={variationResData}
                productId={productId} setSelectedTab={setSelectedTab} formData={formData} setFormData={setFormData} draftedTabs={draftedTabs} setDraftedTabs={setDraftedTabs} />}
        </section>
    )
}

export default AddProduct