const crypto = require('crypto');

const hashPassword = (plainText) => {
    return crypto.createHmac('sha256', '123456')
        .update(plainText)
        .digest('hex');
}
module.exports = { hashPassword };