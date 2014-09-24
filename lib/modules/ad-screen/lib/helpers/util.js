var crypto = require('crypto');

function createGUID() {
    var rdm = (Math.random() + '').substr(2, 20);
    var md5 = crypto.createHash('md5');
    md5.update(rdm, 'utf8');
    return md5.digest('hex').toLowerCase();
}

module.exports = {
    createGUID: createGUID
};