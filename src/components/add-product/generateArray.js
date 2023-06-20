function generateArray(att1, att2) {
    const finalArray = [];
    for (let obj of att1) {
        if (att2.length == 0) {
            finalArray.push({
                "color": obj,
                qty: '',
                isSelect: false,
                style: '',
                seler_sku: '',
                product_external_id: '',
                product_external_id_type: '',
                item_condition: '',
                max_retail_price: 0,
                offer_note: '',
                list_price: 0,
                offer_start_date_offer: '',
                offer_end_date_offer: '',
                "variation_value1": obj,
            });

        }
        else {
            for (let obj3 of att2) {
                finalArray.push({
                    "color": obj,
                    "styleName": obj3,
                    qty: '',
                    isSelect: false,
                    style: '',
                    product_sku: '',
                    product_external_id: '',
                    product_external_id_type: '',
                    item_condition: '',
                    max_retail_price: 0,
                    offer_note: '',
                    list_price: 0,
                    offer_start_date_offer: '',
                    offer_end_date_offer: '',
                    "variation_value1": obj,
                    "variation_value2": obj3,
                });
            }

        }

    }
    return finalArray;
}
export default generateArray