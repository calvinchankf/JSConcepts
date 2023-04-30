import { useState } from 'react';
import './App.css';

function App({
    cardHolder = 'Calvin Chan',
    cardNumber = '2345345645675678',
    cardExpiry = '03/25',
    cardCvv = '789'
}) {
    const [isCardNumberHover, setCardNumberHover] = useState(false)
    const [isCardExpiryHover, setCardExpiryHover] = useState(false)
    const [isCardCVVHover, setCardCVVHover] = useState(false)
    const [isLocked, setLock] = useState(false)

    const cardNumberMouseEnter = () => {
        setCardNumberHover(true)
    }
    const CardNumberMouseLeave = () => {
        setCardNumberHover(false)
    }
    const cardNumberOnClick = () => {
        navigator.clipboard.writeText(cardNumber)
    }

    const cardExpiryMouseEnter = () => {
        setCardExpiryHover(true)
    }
    const cardExpiryMouseLeave = () => {
        setCardExpiryHover(false)
    }
    const cardExpiryOnClick = () => {
        navigator.clipboard.writeText(cardExpiry)
    }

    const cardCVVMouseEnter = () => {
        setCardCVVHover(true)
    }
    const cardCVVMouseLeave = () => {
        setCardCVVHover(false)
    }
    const cardCvvOnClick = () => {
        navigator.clipboard.writeText(cardCvv)
    }

    const luckButtonOnClick = () => {
        setLock(!isLocked)
    }

    return (
        <div className="App">
            <div className='card'>
                <div className='card-logo'></div>
                <div className='card-holder'>{cardHolder}</div>
                <div
                    className={isLocked ? 'card-number invisible' : 'card-number'}
                    onMouseEnter={() => cardNumberMouseEnter()}
                    onMouseLeave={() => CardNumberMouseLeave()}
                    onClick={() => cardNumberOnClick()}
                >
                    <div className='card-number-12digits'>{isCardNumberHover ? cardNumber.slice(0, 4) : '****'}</div>
                    <div className='card-number-12digits'>{isCardNumberHover ? cardNumber.slice(4, 8) : '****'}</div>
                    <div className='card-number-12digits'>{isCardNumberHover ? cardNumber.slice(8, 12) : '****'}</div>
                    <div className='card-number-last-digits'>{cardNumber.slice(12, 16)}</div>
                </div>
                <div className='card-expires-cvc'>
                    <div>
                        <div style={{fontSize: 9}}>Expires</div>
                        <div
                            className={isLocked ? 'card-expires invisible' : 'card-expires'}
                            onMouseEnter={() => cardExpiryMouseEnter()}
                            onMouseLeave={() => cardExpiryMouseLeave()}                  
                            onClick={() => cardExpiryOnClick()}      
                        >
                            {isCardExpiryHover ? cardExpiry : '**/**'}
                        </div>
                    </div>
                    <div style={{marginLeft: 30}}>
                        <div style={{fontSize: 9}}>CVV</div>
                        <div
                            className={isLocked ? 'card-cvv invisible' : 'card-cvv'}
                            onMouseEnter={() => cardCVVMouseEnter()}
                            onMouseLeave={() => cardCVVMouseLeave()}
                            onClick={() => cardCvvOnClick()}
                        >
                            {isCardCVVHover ? cardCvv : '***'}
                        </div>
                    </div>
                </div>
                <img
                    className={isLocked ? 'visa-logo opa50' : 'visa-logo'}
                    src='./visa_logo.png'
                    alt='visa-logo'
                />
            </div>
            <div
                className='lock-button'
                onClick={() => luckButtonOnClick()}
            >
                {isLocked ? 'Unlock' : 'Lock' }
            </div>
        </div>
    );
}

export default App;
