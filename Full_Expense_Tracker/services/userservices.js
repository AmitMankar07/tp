const getExpenses = (req) => {
    return req.user.getUserExpense();
};

const getAllDownloadHistory = (req) => {
    return req.user.getFileurls();
}

module.exports = { getExpenses, getAllDownloadHistory };