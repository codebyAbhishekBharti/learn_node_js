const fs = require('fs')
function logReqRes(filename) {
    return (req,res,next)=>{
        fs.appendFile(filename,`${Date.now()}: Request Method: ${req.method}, Request URL: ${req.url}\n`,(err)=>{})
        // console.log('Hello from Middle ware 1')
        req.myUserName = "Abhishek Bharti"
        next()
    }
}

module.exports = {logReqRes};