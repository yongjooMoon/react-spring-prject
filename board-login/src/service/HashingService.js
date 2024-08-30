import CryptoJS from 'crypto-js';

const encryptText = (data) =>{
    return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
}

const HashingService = {
    encryptText
}

export default HashingService;