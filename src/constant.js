
const API_URL = process.env.REACT_APP_TARGET_ENV === 'development' ?
            `${process.env.REACT_APP_API_URL_ENV}` :
            `${process.env.REACT_APP_API_URL}`;

console.log('api ', API_URL)
module.exports = {
    API_URL,
}