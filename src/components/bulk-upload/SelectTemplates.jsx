import React from "react";

const SelectTemplates = () => {
  const cards = [
    {
      heading: "List Products already in 21Genx Catalogue",
      description:
        "Add offers to existing products in 21Genx's catalogue by providing the product ID and offer information.You do not need to provide any product details",
      buttonText: "Get Listing Loader",
    },
    {
      heading: "List products not currently in 21Genx catalogue",
      description:
        "Create new products in 21Genx's catalogue by providing your product details and offer information ",
      buttonText: "Get Product Template",
    },
    {
      heading: "Updatae Price & qunatity",
      description:
        "update your price and quantity for your existing listings. You do not need to provide any product details",
      buttonText: "Get Price & Quatity Template",
    },
    {
      heading: "Update Product Details",
      description: "Edit your product details and offer information.",
      buttonText: "Get Product Template",
    },
  ];
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="flex flex-row p-2">
        <div className="flex mx-4">
          <h1 className="text-lg text-blue-600">Add Products Via Upload</h1>
        </div>
        <div className="flex border-l text-sm p-2 text-blue-400">
          <a href="">Learn More </a>{" "}
        </div>
        <div className="flex border-l text-sm p-2 text-blue-400">
          <a href="">Seller University</a>
        </div>
        <div className="flex border-l text-sm p-2 text-blue-400">
          <a href="">Selling Application Status</a>
        </div>
        <div className="flex border-l text-sm p-2 text-blue-400">
          <a href="">Add a Single Product</a>
        </div>
      </div>
      <div className="flex flex-row h-8 mx-4 bg-gray-100 gap-3 p-1">
        <a className="text-sm hover:underline hover:underline-offset-4" href="">
          Download spreadsheet
        </a>
        <a className="text-sm hover:underline" href="">
          Upload your spreadsheet
        </a>
        <a className="text-sm hover:underline" href="">
          Spreadsheet upload status
        </a>
      </div>

      <div className="flex mx-4 py-4">
        <h1 className="text-xl font-bold text-green-950">Choose a template to get started</h1>
      </div>

      <div className="max-w-full mx-4 mt-2">
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <div
              className="flex flex-col gap-4 justify-between bg-white border p-4"
              key={index}
            >
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold mb-2">{card.heading}</h3>
                <p className="text-sm text-green-900 mb-4">
                  {card.description}
                </p>
              </div>

              <button className="bg-gray-100 text-green-800 py-2 px-4 rounded">
                {card.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectTemplates;
