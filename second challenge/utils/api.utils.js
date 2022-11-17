const successResponse = (data) => {
    return {
        succes: true,
        data: data
    }
}

const errorResponse = () => {
    return {
        succes: false,
        data: `Oh no, something is wrong...`
    }
}

module.exports = { successResponse, errorResponse }