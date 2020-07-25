module.exports=(req,res,next)=>{
    try{
        const authToken = req.cookies['AuthToken'];
        if(authToken!=undefined)
        {
            req.user=authToken;
            next()
        }
        else{
            res.redirect('/home/login')
        }
    }catch(err){
        return res.redirect('/home/login')
    }
}