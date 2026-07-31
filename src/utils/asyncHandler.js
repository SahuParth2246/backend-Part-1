//now the promises wala syntax

// const asyncHandler = (requestHandler) => {
//     return (req,res,next)=>{
//         promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
//     }
// }
// now everything is okay but we have not standardised the error and the response
// that how we want to make other see hen 



const asyncHandler = (fn) =>async (req,res,next) =>{
    try{
        await fn(req,res,next);
    }catch(err){
        res.status(err.code||500).json({
            success:false,
            error:err.message})
        ;
    }
// i will use this syntax for my code because this is what i understand
}

export { asyncHandler };

// here what is happening is that we have taken the fucntion as an argument
// in that we'll call the async handler it will return the async (ke bad wala functiino)
// that will attain the res req from the express object and then it will inside the
//asnc will return a promise to the eperess