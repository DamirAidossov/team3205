import React, { useState }  from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import https from 'https'
import Spinner from 'react-bootstrap/Spinner'

//Array with All currency codes in ISO 4217 format
let currencyCodes = ["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTN","BWP","BYN","BZD","CAD","CDF","CHF","CLP","CNY","COP","CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","STN","SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TVD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VEF","VND","VUV","WST","XAF","CFA","XCD","XDR","XOF","XPF","YER","ZAR","ZMW","ZWD"]


export {Converter}
function Converter() { //currency converter component
    //State with answer for last user query, saved in local storage and restored upon page refresh
    const [value, setValue] = useState( !localStorage.getItem("inputValue") ||  localStorage.getItem("inputValue") === 'Error searching currency, please try again.'? ' ' : localStorage.getItem("inputValue"));
    
    //state for loading animation to be invisible
    const [isSpinnerVisible, setisSpinnerVisible] = useState("invisible");
    
    //state to grey out information while information is loading
    const [isGreyOut, setisGreyOut] = useState("");


    const handleSubmit = (event) => {//function to handle user input
        event.preventDefault();
        if(isSpinnerVisible === "visible"){//return if data still loading
            return;
        }
        let input = event.target.querySelector('input');
        let userInputArr = input.value.split(' ')
        let from = ''; //currency code from which need to convert
        let to = ''; //currency code in which we need to convert
        let amount = 1; //amount of conversion
        for(let i in userInputArr){
            if(currencyCodes.indexOf(userInputArr[i].toUpperCase()) !== -1){//check if user input code exist in iso 4217 format
                if(!from.length){
                    from = userInputArr[i]
                } else if(!to.length){
                    to = userInputArr[i]
                }
            } else if(typeof parseInt(userInputArr[i]) == 'number' && !isNaN(parseInt(userInputArr[i]) && amount === 1) ){
                amount = parseInt(userInputArr[i])
            }
        }

        setisSpinnerVisible("visible")//show loading animation
        setisGreyOut("greyOut")//grey out container div

        //request for currency rate
        https.get(`https://freecurrencyapi.net/api/v2/latest?apikey=b7e2a1e0-3e47-11ec-b0a2-57d88560a01d&base_currency=${from.toUpperCase()}`, (res) => {
            res.on('data', (d) => {
                
                let rate = JSON.parse(d.toString('utf8')).data[to.toUpperCase()]
                console.log(rate)
                let result = '';
                if(rate){
                    result = `${amount} ${from.toUpperCase()} = ${(amount * rate).toFixed(2)} ${to.toUpperCase()}`
                } else {
                    result = 'Error searching currency, please try again.'
                    
                }
                setValue(result)
                localStorage.setItem("inputValue", result)
                setisSpinnerVisible("invisible")
                setisGreyOut("")
                input.value = ''
            });

            }).on('error', (e) => {
            console.error(e);
        });

    
      };
    return(
        <Container fluid className={isGreyOut}>
            <Row className="justify-content-center">
                <Form onSubmit={handleSubmit} >
                    <Form.Group className="mb-3" controlId="form1" >
                        <Form.Label >Type text to convert currency (e.g. 20 eur to usd)</Form.Label>
                        <Form.Control type="text" placeholder="10 usd in rub"/>
                    </Form.Group>
                </Form>
                <Spinner animation="border" role="status" className={isSpinnerVisible}>
                </Spinner>
            </Row>
            <Row>
                <p className="text-center fs-2">
                    {value}
                </p>
            </Row>
        </Container>
    );
}