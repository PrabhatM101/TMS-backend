

module.exports.apiResponse= (status,data,message='') => {
    let obj = {};
    if(status) obj.status = status;
    if(data) obj.data = data;
    if(message) obj.message = message;
    return obj;
}