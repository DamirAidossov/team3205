import React, { useState, useEffect }  from 'react';
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import https from 'https'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'

//Array with currency codes in ISO 4217 format and their full names 
let currencyCodes = [{"code":"EUR","name":"Euro Member Countries"},{"code":"USD","name":"United States Dollar"},{"code":"RUB","name":"Russia Ruble"},{"code":"AED","name":"United Arab Emirates Dirham"},{"code":"AFN","name":"Afghanistan Afghani"},{"code":"ALL","name":"Albania Lek"},{"code":"AMD","name":"Armenia Dram"},{"code":"ANG","name":"Netherlands Antilles Guilder"},{"code":"AOA","name":"Angola Kwanza"},{"code":"ARS","name":"Argentina Peso"},{"code":"AUD","name":"Australia Dollar"},{"code":"AWG","name":"Aruba Guilder"},{"code":"AZN","name":"Azerbaijan Manat"},{"code":"BAM","name":"Bosnia and Herzegovina Convertible Mark"},{"code":"BBD","name":"Barbados Dollar"},{"code":"BDT","name":"Bangladesh Taka"},{"code":"BGN","name":"Bulgaria Lev"},{"code":"BHD","name":"Bahrain Dinar"},{"code":"BIF","name":"Burundi Franc"},{"code":"BMD","name":"Bermuda Dollar"},{"code":"BND","name":"Brunei Darussalam Dollar"},{"code":"BOB","name":"Bolivia Bolíviano"},{"code":"BRL","name":"Brazil Real"},{"code":"BSD","name":"Bahamas Dollar"},{"code":"BTN","name":"Bhutan Ngultrum"},{"code":"BWP","name":"Botswana Pula"},{"code":"BYN","name":"Belarus Ruble"},{"code":"BZD","name":"Belize Dollar"},{"code":"CAD","name":"Canada Dollar"},{"code":"CDF","name":"Congo/Kinshasa Franc"},{"code":"CHF","name":"Switzerland Franc"},{"code":"CLP","name":"Chile Peso"},{"code":"CNY","name":"China Yuan Renminbi"},{"code":"COP","name":"Colombia Peso"},{"code":"CRC","name":"Costa Rica Colon"},{"code":"CUC","name":"Cuba Convertible Peso"},{"code":"CUP","name":"Cuba Peso"},{"code":"CVE","name":"Cape Verde Escudo"},{"code":"CZK","name":"Czech Republic Koruna"},{"code":"DJF","name":"Djibouti Franc"},{"code":"DKK","name":"Denmark Krone"},{"code":"DOP","name":"Dominican Republic Peso"},{"code":"DZD","name":"Algeria Dinar"},{"code":"EGP","name":"Egypt Pound"},{"code":"ERN","name":"Eritrea Nakfa"},{"code":"ETB","name":"Ethiopia Birr"},{"code":"FJD","name":"Fiji Dollar"},{"code":"FKP","name":"Falkland Islands (Malvinas) Pound"},{"code":"GBP","name":"United Kingdom Pound"},{"code":"GEL","name":"Georgia Lari"},{"code":"GGP","name":"Guernsey Pound"},{"code":"GHS","name":"Ghana Cedi"},{"code":"GIP","name":"Gibraltar Pound"},{"code":"GMD","name":"Gambia Dalasi"},{"code":"GNF","name":"Guinea Franc"},{"code":"GTQ","name":"Guatemala Quetzal"},{"code":"GYD","name":"Guyana Dollar"},{"code":"HKD","name":"Hong Kong Dollar"},{"code":"HNL","name":"Honduras Lempira"},{"code":"HRK","name":"Croatia Kuna"},{"code":"HTG","name":"Haiti Gourde"},{"code":"HUF","name":"Hungary Forint"},{"code":"IDR","name":"Indonesia Rupiah"},{"code":"ILS","name":"Israel Shekel"},{"code":"IMP","name":"Isle of Man Pound"},{"code":"INR","name":"India Rupee"},{"code":"IQD","name":"Iraq Dinar"},{"code":"IRR","name":"Iran Rial"},{"code":"ISK","name":"Iceland Krona"},{"code":"JEP","name":"Jersey Pound"},{"code":"JMD","name":"Jamaica Dollar"},{"code":"JOD","name":"Jordan Dinar"},{"code":"JPY","name":"Japan Yen"},{"code":"KES","name":"Kenya Shilling"},{"code":"KGS","name":"Kyrgyzstan Som"},{"code":"KHR","name":"Cambodia Riel"},{"code":"KMF","name":"Comorian Franc"},{"code":"KPW","name":"Korea (North) Won"},{"code":"KRW","name":"Korea (South) Won"},{"code":"KWD","name":"Kuwait Dinar"},{"code":"KYD","name":"Cayman Islands Dollar"},{"code":"KZT","name":"Kazakhstan Tenge"},{"code":"LAK","name":"Laos Kip"},{"code":"LBP","name":"Lebanon Pound"},{"code":"LKR","name":"Sri Lanka Rupee"},{"code":"LRD","name":"Liberia Dollar"},{"code":"LSL","name":"Lesotho Loti"},{"code":"LYD","name":"Libya Dinar"},{"code":"MAD","name":"Morocco Dirham"},{"code":"MDL","name":"Moldova Leu"},{"code":"MGA","name":"Madagascar Ariary"},{"code":"MKD","name":"Macedonia Denar"},{"code":"MMK","name":"Myanmar (Burma) Kyat"},{"code":"MNT","name":"Mongolia Tughrik"},{"code":"MOP","name":"Macau Pataca"},{"code":"MRU","name":"Mauritania Ouguiya"},{"code":"MUR","name":"Mauritius Rupee"},{"code":"MVR","name":"Maldives (Maldive Islands) Rufiyaa"},{"code":"MWK","name":"Malawi Kwacha"},{"code":"MXN","name":"Mexico Peso"},{"code":"MYR","name":"Malaysia Ringgit"},{"code":"MZN","name":"Mozambique Metical"},{"code":"NAD","name":"Namibia Dollar"},{"code":"NGN","name":"Nigeria Naira"},{"code":"NIO","name":"Nicaragua Cordoba"},{"code":"NOK","name":"Norway Krone"},{"code":"NPR","name":"Nepal Rupee"},{"code":"NZD","name":"New Zealand Dollar"},{"code":"OMR","name":"Oman Rial"},{"code":"PAB","name":"Panama Balboa"},{"code":"PEN","name":"Peru Sol"},{"code":"PGK","name":"Papua New Guinea Kina"},{"code":"PHP","name":"Philippines Peso"},{"code":"PKR","name":"Pakistan Rupee"},{"code":"PLN","name":"Poland Zloty"},{"code":"PYG","name":"Paraguay Guarani"},{"code":"QAR","name":"Qatar Riyal"},{"code":"RON","name":"Romania Leu"},{"code":"RSD","name":"Serbia Dinar"},{"code":"RWF","name":"Rwanda Franc"},{"code":"SAR","name":"Saudi Arabia Riyal"},{"code":"SBD","name":"Solomon Islands Dollar"},{"code":"SCR","name":"Seychelles Rupee"},{"code":"SDG","name":"Sudan Pound"},{"code":"SEK","name":"Sweden Krona"},{"code":"SGD","name":"Singapore Dollar"},{"code":"SHP","name":"Saint Helena Pound"},{"code":"SLL","name":"Sierra Leone Leone"},{"code":"SOS","name":"Somalia Shilling"},{"code":"SPL*","name":"Seborga Luigino"},{"code":"SRD","name":"Suriname Dollar"},{"code":"STN","name":"São Tomé and Príncipe Dobra"},{"code":"SVC","name":"El Salvador Colon"},{"code":"SYP","name":"Syria Pound"},{"code":"SZL","name":"eSwatini Lilangeni"},{"code":"THB","name":"Thailand Baht"},{"code":"TJS","name":"Tajikistan Somoni"},{"code":"TMT","name":"Turkmenistan Manat"},{"code":"TND","name":"Tunisia Dinar"},{"code":"TOP","name":"Tonga Pa'anga"},{"code":"TRY","name":"Turkey Lira"},{"code":"TTD","name":"Trinidad and Tobago Dollar"},{"code":"TVD","name":"Tuvalu Dollar"},{"code":"TWD","name":"Taiwan New Dollar"},{"code":"TZS","name":"Tanzania Shilling"},{"code":"UAH","name":"Ukraine Hryvnia"},{"code":"UGX","name":"Uganda Shilling"},{"code":"UYU","name":"Uruguay Peso"},{"code":"UZS","name":"Uzbekistan Som"},{"code":"VEF","name":"Venezuela Bolívar"},{"code":"VND","name":"Viet Nam Dong"},{"code":"VUV","name":"Vanuatu Vatu"},{"code":"WST","name":"Samoa Tala"},{"code":"XAF","name":"Communauté Financière Africaine (BEAC) CFA Franc BEAC"},{"code":"XCD","name":"East Caribbean Dollar"},{"code":"XDR","name":"International Monetary Fund (IMF) Special Drawing Rights"},{"code":"XOF","name":"Communauté Financière Africaine (BCEAO) Franc"},{"code":"XPF","name":"Comptoirs Français du Pacifique (CFP) Franc"},{"code":"YER","name":"Yemen Rial"},{"code":"ZAR","name":"South Africa Rand"},{"code":"ZMW","name":"Zambia Kwacha"},{"code":"ZWD","name":"Zimbabwe Dollar"}]


export {RatesComp}
function RatesComp(props) { //component with rates table
    let language = navigator.language || navigator.userLanguage //get browser language 
    let baseRate = !language || !language.startsWith("ru") ? 'USD' : 'RUB' //If browser language is russian make baseRate RUB otherwise USD

    //state with base currency code, if it exist in localstorage use it from there
    const [rate, setRate] = useState( localStorage.getItem("baseRate") ? localStorage.getItem("baseRate") : baseRate);

    //Array with all exchange rates from API
    const [rateList, setrateList] = useState([]);

    useEffect(() => {
        https.get(`https://freecurrencyapi.net/api/v2/latest?apikey=b7e2a1e0-3e47-11ec-b0a2-57d88560a01d&base_currency=${rate}`, (res) => {
            res.on('data', (d) => {
                let rateData = JSON.parse(d.toString('utf8')).data
                let arr = []
                for(let i in rateData){
                    arr.push({fromAmount: 1, fromCurrency: rate, toAmount: rateData[i], toCurrency: i})
                }
                setrateList(arr)
            });
            }).on('error', (e) => {
            console.error(e);
        });
        
    }, [rate]);

    const handleClick = (event) => {//function to swap columns from/to exchange rate
        event.preventDefault();
        let arr = []
        for(let i in rateList){
            let item = rateList[i]
            arr.push({fromAmount: 1, fromCurrency: item['toCurrency'], toAmount: 1/item['toAmount'], toCurrency: item['fromCurrency']})
        }
        setrateList(arr)
    };

    const handleCurrencyClick = (event) => {//function to change default rate
        if(event.target.id === 'dropdown-autoclose-true'){
            return
        }
        setRate(event.target.getAttribute('code'))
        localStorage.setItem("baseRate", event.target.getAttribute('code'))
    };
    return(
        <Container fluid>
            <Row>
            <div className="mb-2">
                <Button variant="dark"  onClick={handleClick}>Swap rates</Button>
                <Dropdown  onClick={handleCurrencyClick} className="d-inline mx-2">
                    <Dropdown.Toggle id="dropdown-autoclose-true">
                        Change Base Currency
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {
                            currencyCodes.map((key, i) =>
                                <Dropdown.Item href="#" key={i} code={key.code}>{key.code} - {key.name}</Dropdown.Item>
                            )
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            
            </Row>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Base Currency</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {rateList.map((key, i) =>
                        <tr key={i}>
                            <td>{key.fromAmount} {key.fromCurrency}</td>
                            <td>{key.toAmount.toFixed(2)} {key.toCurrency} </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}