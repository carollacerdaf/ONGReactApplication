const crypto = require('crypto');


module.exports = function generateUniqueId() {
    const id = crypto.randomBytes(8).toString('HEX');
    return id;
}