let jsonString = []
let jsonStringRBKZ = []
let prevRrdid = 0
let currentRrdid = 0
let startDate = ``
let endDate = ``
let APIKey = ''
const startDateInput = document.createElement('input')
startDateInput.type = 'date'
startDateInput.classList.add('startDateInput', 'dateInput')
const endDateInput = document.createElement('input')
endDateInput.type = 'date'
endDateInput.classList.add('endDateInput', 'dateInput')
console.log(startDateInput)
const apiKeyInput = document.createElement('input')
apiKeyInput.classList.add('apiKeyInput')
const text = document.createElement('p')
const dateInpDescr = document.createElement('p')
dateInpDescr.innerText = 'enter Start date - End date'

startDateInput.onchange = (e)=>{
    startDate = e.target.value
    console.log(startDate)
    getDate()
}
apiKeyInput.onchange = (e)=>{
    APIKey = e.target.value
}

function addDateinput() {
    document.body.append(dateInpDescr)
    document.body.append(startDateInput)    
    document.body.append(endDateInput)
    text.innerText = 'API key :'
    document.body.append(text)
    document.body.append(apiKeyInput)
}

function getData() {
    fetch(`https://suppliers-stats.wildberries.ru/api/v1/supplier/reportDetailByPeriod?key=${APIKey}&dateFrom=${startDate}&limit=100000&dateTo=${endDate}&rrdid=${currentRrdid}`).then(function(response) {
        response.json().then(function(json) {
            if(json==null){ 
                sortJson()
                console.log(JSON.stringify(jsonString))
                // console.log(JSON.stringify(jsonStringRBKZ), 'BY-KZ')
                return json
            }
            prevRrdid = currentRrdid
            currentRrdid = json[json.length-1].rrd_id
            jsonString = [...jsonString, json]
            if(json.length!=null){
                getData(currentRrdid)
            }
        });
      });
}

function getDate(e){
    console.log(e.target.value)
}

startDateInput.onchange = (e) => {
    startDate = e.target.value
}
endDateInput.onchange = (e) => {
    endDate = e.target.value
}

// function sortJson() {
//     jsonString = jsonString.reduce((accum, current)=>{
//         if(current.site_country === "KZ" || current.site_country === "BY"){
//             jsonStringRBKZ = [...jsonStringRBKZ, current] 
//             console.log(jsonStringRBKZ)
//             return accum
//         }
//         accum = [...accum, current]
//         return accum
//     },[])  
//     console.log(JSON.stringify(jsonString))
//     console.log(JSON.stringify(jsonStringRBKZ), 'BY-KZ')
// }
// function exportToExcel() {
//     exports.wrap = () => {
//         const workbook = new Excel.Workbook();
//         const worksheet = workbook.addWorksheet('reportDetailByPeriod');
//         const fakeData =  {
//             address: "well st",
//             description: "180036710",
//             fromTotal: 1.365
//         };
//         let columnsArr = []
//         for (let keys in json[0]){
//             columnsArr = [...columnsArr, {header: key, width: 10}]
//         }
//         worksheet.columns = columnsArr;
    
//         worksheet.addRow(json)
    
//         return workbook.xlsx.writeFile("reportDetailByPeriod.xlsx");
//     };
// }

// {
//     "realizationreport_id": 20230279,
//     "date_from": "2022-11-21T00:00:00Z",
//     "date_to": "2022-11-27T00:00:00Z",
//     "create_dt": "2022-11-28T06:32:20Z",
//     "suppliercontract_code": null,
//     "rrd_id": 9431318915,
//     "gi_id": 8598994,
//     "subject_name": "Обои",
//     "nm_id": 50356941,
//     "brand_name": "Белорусские обои",
//     "sa_name": "АККОРД.9С6К.11",
//     "ts_name": "0",
//     "barcode": "4810815465828",
//     "doc_type_name": "Продажа",
//     "quantity": 1,
//     "retail_price": 764,
//     "retail_amount": 335.18,
//     "sale_percent": 50,
//     "commission_percent": 0.05,
//     "office_name": "Коледино",
//     "supplier_oper_name": "Продажа",
//     "order_dt": "2022-11-22T00:00:00Z",
//     "sale_dt": "2022-11-26T00:00:00Z",
//     "rr_dt": "2022-11-26T00:00:00Z",
//     "shk_id": 6824096094,
//     "retail_price_withdisc_rub": 382,
//     "delivery_amount": 0,
//     "return_amount": 0,
//     "delivery_rub": 0,
//     "gi_box_type_name": "Без коробов",
//     "product_discount_for_report": 50,
//     "supplier_promo": 0,
//     "rid": 601066611151,
//     "ppvz_spp_prc": 0.1021,
//     "ppvz_kvw_prc_base": 0.0417,
//     "ppvz_kvw_prc": -0.0604,
//     "ppvz_sales_commission": -23.1,
//     "ppvz_for_pay": 363.87,
//     "ppvz_reward": 0,
//     "acquiring_fee": 4.86,
//     "acquiring_bank": "Альфа-Банк Рос 7728168971",
//     "ppvz_vw": -27.96,
//     "ppvz_vw_nds": -5.59,
//     "ppvz_office_id": 0,
//     "ppvz_office_name": "Пункт самовывоза (ПВЗ)",
//     "ppvz_supplier_id": 0,
//     "ppvz_supplier_name": "",
//     "ppvz_inn": "",
//     "declaration_number": "",
//     "sticker_id": "",
//     "site_country": "BY",
//     "penalty": 0,
//     "additional_payment": 0,
//     "srid": "ce84f85253ef4a26aa904ed6dd18eb7d"
// }
