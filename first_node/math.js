function add(a, b){
    return a+b;
}
function sub(a,b){
    return a-b;
}
// default export
// module.exports = {
//     addFn: add,
//     subFn: sub
// }; 

exports.addFn = (a,b) => a+b;
exports.subFn = (a,b) => a-b;