
import Image from 'next/image'
import useAuth from '@/hook/useAuth'
import Link from 'next/link'
import Footer from '@/components/Footer'
const Page = () => {

  return (

    <div className="max-w-screen-2xl mx-auto">

      <div className="flex flex-row justify-between w-full max-w-6xl mx-auto px-5" style={{ borderBottom: "1px solid #D6D6D6" }}>
        <div className=" py-1.5 ">
          <img src="../assets/seller-panel/seller-logo.png" className="h-6 mt-2 sm:h-8 md:h-10 lg:h-12 xl:h-14" />
        </div>
        <div className=" flex items-center py-1.5  ">
          <div className="flex gap-x-5">
            <Link href="auth/login" className="py-2 px-4 md:px-7 text-sm font-bold  rounded-[2rem] shadow-sm bg-gray-100">Sign In</Link>
            <Link href="/signup" className="text-sm font-bold text-[#FFFFFF] bg-[#0075FF] px-4 py-2 md:px-7 rounded-[2rem]">Start Selling
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="order-1 md:-order-10 flex justify-center items-center flex-col w-full md:w-[40%] ">
          <div className="p-5">
            <p className="text-[#333333] font-semibold text-sm md:text-xl">Reach Out To</p>
            <p className="font-bold text-[#333333] text-xl sm:text-2xl md:text-3xl lg:text-5xl not-italic mt-2">27000+ Pincodes</p>
            <p className="text-[#333333] font-bold text-xl sm:text-2xl md:text-3xl lg:text-5xl not-italic mt-3">All Across India</p>
            <p className="text-[#333333] font-semibold  sm:text-sm md:text-lg xl:text-xl mt-5">40 Million+ Monthly Active Users</p>
            <div>
              <button className="text-sm font-bold text-[#FFFFFF] bg-[#0075FF] w-40 h-10 mt-8">Register Now</button>
            </div>
          </div>
        </div>
        <div className="w-full  md:w-1/2 mt-11 grow mb-14">
          <img src="../assets/seller-panel/seller-journey-heroimg.png" />
        </div>
      </div>
      <div>
        <h1 className="text-[#333333] font-semibold text-xl text-center not-italic pb-2 underline decoration-[#FF3F6C]" >Start Selling In 4 Simple Steps</h1>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2  lg:grid-cols-4 xl:grid-cols-4 gap-5 p-5">
          <div className=" flex flex-col justify-between overflow-hidden">
            <img className="h-8 sm:h-14 md:h-24 lg:h-32 xl:h-44 object-contain w-full" src="../assets/seller-panel/register.png" />
            <div className="bg-[#FFEBF0] grow flex flex-col justify-around text-center p-2">
              <p className="font-bold  sm:text-sm md:text-md lg:text-lg ">Register</p>
              <p className="text-base py-4">Find all the onboarding requirements to create your account here.</p>
              <div className="flex justify-center">
                <a href="/" className=" bg-[#FFFFFF] text-[#0075FF] px-6 py-2  hover:bg-slate-300 text-base border border-solid 
                    border-[#0075FF] rounded">WATCH VIDEO</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col  overflow-hidden">
            <img className="h-8 sm:h-14 md:h-24 lg:h-32 xl:h-44 object-contain w-full" src="../assets/seller-panel/sell.png" />
            <div className="bg-[#FFF6E5] grow flex flex-col justify-around text-center p-2">
              <p className="font-bold  sm:text-sm md:text-md lg:text-lg ">Sell</p>
              <p className="text-base py-4">platform integration & prerequisites for operational readiness here.</p>
              <div className="flex justify-center">
                <a href="/" className=" bg-[#FFFFFF] text-[#0075FF] px-6 py-2  hover:bg-slate-300 text-base border border-solid 
                    border-[#0075FF] rounded">Read More</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col  overflow-hidden">
            <img className="h-8 sm:h-14 md:h-24 lg:h-32 xl:h-44 object-contain w-full" src="../assets/seller-panel/earn.png" />
            <div className="bg-[#E5F6F2] grow flex flex-col justify-around text-center p-2">
              <p className="font-bold  sm:text-sm md:text-md lg:text-lg ">Earn</p>
              <p className="text-base py-4">Get secure & timely payments on
                predefined days. Find out about the
                payment cycle.</p>
              <div className="flex justify-center">
                <a href="/" className=" bg-[#FFFFFF] text-[#0075FF] px-6 py-2  hover:bg-slate-300 text-base border border-solid 
                    border-[#0075FF] rounded">WATCH VIDEO</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col  overflow-hidden ">
            <img className="h-8 sm:h-14 md:h-24 lg:h-32 xl:h-44 object-contain w-full" src="../assets/seller-panel/grow.png" />
            <div className="bg-[#FFEEE8] grow flex flex-col justify-around text-center p-2">
              <p className="font-bold  sm:text-sm md:text-md lg:text-lg ">Grow</p>
              <p className="text-base py-4">Get tailored support at every step to steer your business.</p>
              <div className="flex justify-center">
                <a href="/" className=" bg-[#FFFFFF] text-[#0075FF] px-6 py-2  hover:bg-slate-300 text-base border border-solid 
                    border-[#0075FF] rounded">WATCH VIDEO</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 p-5">
        <div className="flex flex-col md:flex-row divide-x gap-4 ">
          <div className="flex justify-center items-center">
            <div className="flex flex-col w-[70%] ">
              <p className="text-[#333333] font-semibold  sm:text-sm md:text-md lg:text-lg">Why Suppliers Love 21Genx</p>
              <p className="font-normal mt-3  text-base">All the benefits that comes with selling on 21genx are designed to
                help you sell more and make it easier to grow your business</p>
            </div>
          </div>
          <div>
            <div className="border">
              <div className="grid grid-cols-1 divide-y">
                <div>
                  <div className="flex">
                    <div>
                      <img className="mt-2 ml-2 h-4 sm:ml-4 sm:h-6 lg:ml-6 lg:h-8 xl:ml-8 xl:h-8" src="../assets/seller-panel/icon-1.png" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold pt-2">0% Commission Fee</h4>
                      <p className=" sm:py-0.5 text-base">Suppliers selling on 21genx keep 100% of their profit by not payin any commission</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex">
                    <div>
                      <img className="mt-2 ml-2 h-4 sm:ml-4 sm:h-6 lg:ml-6 lg:h-8 xl:ml-8 xl:h-8" src="../assets/seller-panel/icon-2.png" />
                    </div>
                    <div className="ml-8">
                      <h4 className="font-bold pt-2">0 Penalty Charges</h4>
                      <p className=" sm:py-0.5 text-base">Sell online without the fear of order cancellation charges with 0 penalty fro late dispatch or order cancellations.</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex">
                    <div>
                      <img className="mt-2 ml-2 h-4 sm:ml-4 sm:h-6 lg:ml-6 lg:h-8 xl:ml-8 xl:h-8" src="../assets/seller-panel/icon-3.png" />
                    </div>
                    <div className="ml-6">
                      <h4 className="font-bold pt-2">Growth fro Every Supplier</h4>
                      <p className=" sm:py-0.5 text-base">From small to large and unbranded to bbranded, all suppliers have grown their businesses on 21Genx</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex">
                    <div>
                      <img className="mt-2 ml-2 h-4 sm:ml-4 sm:h-6 lg:ml-6 lg:h-8 xl:ml-8 xl:h-8" src="../assets/seller-panel/icon-4.png" />
                    </div>
                    <div className="ml-8">
                      <h4 className="font-bold pt-2">Ease of Doing Business</h4>
                      <div className="flex gap-5 flex-wrap py-1">
                        <div className=" text-base"> <span>✔️</span> Easy Product Listing</div>
                        <div className="text-base"> <span>✔️</span> Lowest cost shipping</div>
                        <div className=" text-base"> <span>✔️</span> 7-Day payment cycle from the delivery date</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row bg-[#E7EEFF] relative p-5">
        <div className="flex flex-col w-full lg:w-1/2 justify-center items-center">
          <p className="text-[#333333] font-semibold text-base py-5">Exclusive Supplier+ Rewards for the first 30 days</p>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-5   ">
          <div className="flex flex-row flex-wrap gap-5">
            <div className="w-2/5  border bg-[#FFFFFF] rounded-[1rem] p-5">
              <div>
                <img className="ml-2 mt-4 " src="../assets/seller-panel/icon-5.png" />
              </div>
              <p className="font-bold px-0.5  text-base">Free catalog visibility of ₹1200</p>
              <p className="font-normal  px-0.5 sm:text-sm md:text-base">Run advertisements for your catalogs to increase the visibility of your products and get more orders</p>
            </div>
            <div className="w-2/5  border bg-[#FFFFFF] rounded-[1rem] p-5">
              <div>
                <img className="ml-2 mt-4" src="../assets/seller-panel/icon-6.png" />
              </div>
              <p className="font-bold px-0.5  text-base">Dedicated Catalog Manager</p>
              <p className="font-normal  px-0.5 sm:text-sm md:text-base">Clear all your cataloging doubtss like how to upload catalogs,correct quality check errors and more</p>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-5">
            <div className="w-2/5  border bg-[#FFFFFF] rounded-[1rem] p-5">
              <div>
                <img className="ml-2 mt-4" src="../assets/seller-panel/icon-7.png" />
              </div>
              <p className="font-bold px-0.5  text-base">Free Return Shipping</p>
              <p className="font-normal  px-0.5 sm:text-sm md:text-base">Send out your orders stress-free with zero fees on return shipping for the first month</p>
            </div>
            <div className=" w-2/5  border bg-[#FFFFFF] rounded-[1rem] p-5">
              <div>
                <img className="ml-2 mt-4" src="../assets/seller-panel/icon-8.png" />
              </div>
              <p className="font-bold px-0.5  text-base">No Order Cancellation Charges</p>
              <p className="font-normal  px-0.5 sm:text-sm md:text-base">Cancel orders that you can’t fulfil for unforeseen reasons without worrying about penalties</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" py-5 bg-[#FFFFFF]">
        <div className="max-w-5xl mx-auto flex flex-col">
          <p className="text-center font-semibold py-10">Experiences suppliers love to talk about</p>
          <div className="grid  md:grid-cols-2  lg:grid-cols-3 gap-5 px-5">
            <div className=''>
              <div className='flex justify-center'>
                <iframe className='w-full aspect-video' src="https://www.youtube.com/embed/8sLS2knUa6Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
              <div className='p-5'>
                <h3 className='font-semibold py-1 '>Amit and Rajat Jain</h3>
                <p className='text-sm py-1 '>Smartees, Tiruppur</p>
                <p className=''>Our business has grown beyond
                  our imagination, getting upto
                  10,000 orders consistently during
                  sale days. We are now
                  constantly bringing new
                  products thanks to 21Genx’s
                  insights.</p>
              </div>
            </div>
            <div >
              <div className='flex justify-center'>
                <iframe className='w-full aspect-video' src="https://www.youtube.com/embed/8sLS2knUa6Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
              <div className='py-5'>
                <h3 className='font-semibold py-1 '>Amit and Rajat Jain</h3>
                <p className='text-sm '>Smartees, Tiruppur</p>
                <p className=''>Our business has grown beyond
                  our imagination, getting upto
                  10,000 orders consistently during
                  sale days. We are now
                  constantly bringing new
                  products thanks to 21Genx’s
                  insights.</p>
              </div>
            </div>
            <div>
              <div className='flex justify-center'>
                <iframe className='w-full aspect-video' src="https://www.youtube.com/embed/8sLS2knUa6Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
              <div className='p-5'>
                <h3 className='font-semibold py-1'>Amit and Rajat Jain</h3>
                <p className='text-sm py-1'>Smartees, Tiruppur</p>
                <p className=''>Our business has grown beyond
                  our imagination, getting upto
                  10,000 orders consistently during
                  sale days. We are now
                  constantly bringing new
                  products thanks to 21Genx’s
                  insights.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="bg-[#F5F8FF] flex justify-center mt-12 p-5">
          <div className="mt-24 mb-6 mx-1 sm:mt-28 sm:mb-7 md:mt-32 md:mb-8 lg:mt-36 lg:mb-10 xl:mt-44 xl:mb-12">
            <p className="font-bold text-[#333333] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl not-italic">Start your Seller Journey</p>
            <p className="font-normal text-[#333333] not-italic text-base w-2/3 my-2 sm:my-4 md:my-6 lg:my-8 xl:my-10">Join our family of 10 Lakh+ businesses who sell on 21genx.com</p>
            <button className="text-sm font-bold text-[#FFFFFF] bg-[#0075FF] p-1 sm:p-2 md:p-3 lg:p-3 xl:p-3 rounded-2xl">Start Selling</button>
            <p className="font-thin text-[#333333] text-base">It takes only 15 minutes to setup your account</p>
          </div>
          <div className="ml-10 mt-16 mb-6 xl:ml-52 xl:mt-32 xl:mb-12">
            <img className="h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72" src="../assets/seller-panel/delivery.png" />
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Page;