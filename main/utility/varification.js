exports.generateToken = (payload) => {
    var token = jwt.sign({ payload }, 'privatekey');
    let TokenObject = {
        token: token,
        sucess: true
    }
    return TokenObject
};
