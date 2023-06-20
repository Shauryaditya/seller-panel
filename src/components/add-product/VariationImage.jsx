import React, { useState } from 'react'
import axios from "axios";
const BASE_URL = "https://two1genx.onrender.com";
const VariationImage = ({ item }) => {
    const [isClicked, setIsClicked] = useState(false)

    const [main_img, setMain_img] = useState("");
    const [img_2, setImg_2] = useState("");
    const [img_3, setImg_3] = useState("");
    const [img_4, setImg_4] = useState("");
    const [img_5, setImg_5] = useState("");
    const [img_6, setImg_6] = useState("");
    const [img_7, setImg_7] = useState("");
    const [img_8, setImg_8] = useState("");

    const [main_img_preview, setMain_img_preview] = useState(null);
    const [img_2_preview, setImg_2_preview] = useState(null);
    const [img_3_preview, setImg_3_preview] = useState(null);
    const [img_4_preview, setImg_4_preview] = useState(null);
    const [img_5_preview, setImg_5_preview] = useState(null);
    const [img_6_preview, setImg_6_preview] = useState(null);
    const [img_7_preview, setImg_7_preview] = useState(null);
    const [img_8_preview, setImg_8_preview] = useState(null);

    const handleInputChange = (event) => {
        const { name, files } = event.target;
        const file = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            switch (name) {
                case "main_img":
                    setMain_img(reader.result);
                    setMain_img_preview(URL.createObjectURL(file));
                    break;
                case "img_2":
                    setImg_2(reader.result);
                    setImg_2_preview(URL.createObjectURL(file));
                    break;
                case "img_3":
                    setImg_3(reader.result);
                    setImg_3_preview(URL.createObjectURL(file));
                    break;
                case "img_4":
                    setImg_4(reader.result);
                    setImg_4_preview(URL.createObjectURL(file));
                    break;
                case "img_5":
                    setImg_5(reader.result);
                    setImg_5_preview(URL.createObjectURL(file));
                    break;
                case "img_6":
                    setImg_6(reader.result);
                    setImg_6_preview(URL.createObjectURL(file));
                    break;
                case "img_7":
                    setImg_7(reader.result);
                    setImg_7_preview(URL.createObjectURL(file));
                    break;
                case "img_8":
                    setImg_8(reader.result);
                    setImg_8_preview(URL.createObjectURL(file));
                    break;
                default:
                    break;
            }
        };
    };
    const handleSubmit = (event, id) => {
        console.log("hii");
        event.preventDefault();
        const data = {
            product_id: id,
            main_img,
            img_2,
            img_3,
            img_4,
            img_5,
            img_6,
            img_7,
            img_8,
        };
        console.log(data);
        axios
            .post(`${BASE_URL}/v1/product-images/add`, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div key={item?._id} className={`w-11/12 mx-auto flex flex-col  py-2 px-4 my-3 shadow-[0px_0px_4.45864px_rgba(0,0,0,0.25)] ${isClicked ? 'h-auto' : 'h-10'} overflow-hidden`}>
            <div className='flex justify-between gap-x-5'>
                <p>Product Name -{item?.item_name} </p>
                <p>Seller Sku -{item?.product_sku} </p>
                <p>Variation Name -{item?.variation_name2}</p>
                <p>Variation Value -{item?.variation_value2}</p>
                <div
                    onClick={() => setIsClicked((prevalue) => !prevalue)}
                    className={`w-5 h-5 text-gray-700 ${isClicked ? 'rotate-90' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg>
                </div>
            </div>
            <div className="mt-4 gap-4 ">
                <form onSubmit={(e) => handleSubmit(e, item._id)} className="">
                    <div className="grid grid-cols-4 grid-flow-row gap-4 px-8 py-6">
                        <div className="relative">
                            <input
                                type="file"
                                name="main_img"
                                id="main_img"
                                onChange={handleInputChange}
                                className="border bg-[#e2eced] border-gray-400 h-8 w-32 rounded-md px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <div className="w-32 h-32 bg-[#e2eced] flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-12 h-12 text-center"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                    />
                                </svg>

                                {main_img_preview && (
                                    <img
                                        src={main_img_preview}
                                        alt="Main Image Preview"
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type="file"
                                name="img_2"
                                id="img_2"
                                onChange={handleInputChange}
                                className="border bg-[#e2eced] border-gray-400 h-8 w-32 rounded-md px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <div className="w-32 h-32 bg-[#e2eced] flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-12 h-12 text-center"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                    />
                                </svg>

                                {img_2_preview && (
                                    <img
                                        src={img_2_preview}
                                        alt="Main Image Preview"
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type="file"
                                name="img_3"
                                id="img_3"
                                onChange={handleInputChange}
                                className="border bg-[#e2eced] border-gray-400 h-8 w-32 rounded-md px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <div className="w-32 h-32 bg-[#e2eced] flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-12 h-12 text-center"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                    />
                                </svg>

                                {img_3_preview && (
                                    <img
                                        src={img_3_preview}
                                        alt="Main Image Preview"
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type="file"
                                name="img_4"
                                id="img_4"
                                onChange={handleInputChange}
                                className="border bg-[#e2eced] border-gray-400 h-8 w-32 rounded-md px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <div className="w-32 h-32 bg-[#e2eced] flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-12 h-12 text-center"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                    />
                                </svg>

                                {img_4_preview && (
                                    <img
                                        src={img_4_preview}
                                        alt="Main Image Preview"
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type="file"
                                name="img_5"
                                id="img_5"
                                onChange={handleInputChange}
                                className="border bg-[#e2eced] border-gray-400 h-8 w-32 rounded-md px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <div className="w-32 h-32 bg-[#e2eced] flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-12 h-12 text-center"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                    />
                                </svg>

                                {img_5_preview && (
                                    <img
                                        src={img_5_preview}
                                        alt="Main Image Preview"
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type="file"
                                name="img_6"
                                id="img_6"
                                onChange={handleInputChange}
                                className="border bg-[#e2eced] border-gray-400 h-8 w-32 rounded-md px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <div className="w-32 h-32 bg-[#e2eced] flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-12 h-12 text-center"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                    />
                                </svg>

                                {img_6_preview && (
                                    <img
                                        src={img_6_preview}
                                        alt="Main Image Preview"
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type="file"
                                name="img_7"
                                id="img_7"
                                onChange={handleInputChange}
                                className="border bg-[#e2eced] border-gray-400 h-8 w-32 rounded-md px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <div className="w-32 h-32 bg-[#e2eced] flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-12 h-12 text-center"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                    />
                                </svg>

                                {img_7_preview && (
                                    <img
                                        src={img_7_preview}
                                        alt="Main Image Preview"
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type="file"
                                name="img_8"
                                id="img_8"
                                onChange={handleInputChange}
                                className="border bg-[#e2eced] border-gray-400 h-8 w-32 rounded-md px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />

                            <div className="w-32 h-32 bg-[#e2eced] flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-12 h-12 text-center"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                    />
                                </svg>

                                {img_8_preview && (
                                    <img
                                        src={img_8_preview}
                                        alt="Main Image Preview"
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                )}
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-end max-w-5xl  mx-10">                                                 <button
                        className="text-white text-xs  font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#008296] inline-block "
                        type="submit"
                    >
                        Upload
                    </button>

                    </div>
                </form>
            </div >
        </div >
    )
}

export default VariationImage