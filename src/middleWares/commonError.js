
const commonError = (error) =>{
    console.log(error)
    res.status(500).json({message: "something went wrong"})
}

module.exports = {commonError}