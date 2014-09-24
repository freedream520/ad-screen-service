function errorhandler(res, error) {
    res.send({
        'error': error
    });
}

function toClientGrid(page, total, records, collection){
    return {
        page: page,
        total: total,
        records: records,
        rows: collection
    };
}

module.exports = {
    errorhandler: errorhandler,
    toClientGrid: toClientGrid
};