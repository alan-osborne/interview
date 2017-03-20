/*

    Solera basket test code

*/

const inventory = {
    "papaya" : {
        "unitPrice" : .50,
        "promotion" : {
            "type" : "units",
            "discountVolume" : 3,
            "discountAdjVolume" : 2
        }
    },
    "apple" : {
        "unitPrice" : .25,
        "promotion" : null
    },
    "orange" : {
        "unitPrice" : .30,
        "promotion" : null
    },
    "garlic" : {
        "unitPrice" : .15,
        "promotion" : null
    }
};

//represents a sequence of added items, feel free to change this to test
let basket = ["apple", "apple", "papaya", "papaya", "papaya", "garlic", "apple", "apple", "papaya", "garlic", "orange", "papaya", "garlic", "orange", "papaya", "orange", "orange"],
    basketMap = {};

const
    TILL_HEADER = 'Item\t\tQty\t\tUnit Price\t\tAmount\n',
    TILL_ITEM_OUTPUT_FORMAT = '%s\t\t%s\t\t%s\t\t\t%s\t%s',
    TILL_TOTAL_OUTPUT_FORMAT = '\nTotal\t\t\t\t\t\t\t%s';

basket.reduce((acc, val) => {
    basketMap[val] = basketMap[val] ? ++basketMap[val] : 1;
});

let calcWithDiscount = function(item) {
    let amount = (parseInt(basketMap[item] / inventory[item].promotion.discountVolume) * inventory[item].promotion.discountAdjVolume) * inventory[item].unitPrice;
    amount += (basketMap[item] % inventory[item].promotion.discountVolume) * inventory[item].unitPrice;
    return amount;
};

//determine if item has a discount applied (1 discount type assumed)
let discountInEffect = function (item) {
    return  inventory[item].promotion &&
            inventory[item].promotion !== null;
};

//determine if item has a discount applied (1 discount type assumed)
let discountApplied = function (item) {
    return  (parseInt(basketMap[item] / inventory[item].promotion.discountVolume)) > 0;
};


//
let outputBasket = function (basketMap){
    let total = 0;
    console.log(TILL_HEADER);
    for (item in basketMap) {
        let itemAmount = 0,
            isDiscount = discountInEffect(item),
            discountWasApplied = '';
        if (isDiscount) {
            itemAmount += calcWithDiscount(item);
            discountWasApplied = discountApplied(item) ? 'Promotion In Effect' : '';
        } else {
            itemAmount = (basketMap[item] * inventory[item].unitPrice);
        }
        console.log(TILL_ITEM_OUTPUT_FORMAT, item, basketMap[item], inventory[item].unitPrice, itemAmount.toFixed(2), discountWasApplied);
        total += itemAmount;
    }
    console.log(TILL_TOTAL_OUTPUT_FORMAT, total.toFixed(2));
};

outputBasket(basketMap);