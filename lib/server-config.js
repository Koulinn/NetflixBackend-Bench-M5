const trustOrigins = [process.env.FE_DEV_TRUST_URL, process.env.FE_PROD_TRUST_URL]


export const corsConfig = {
    origin: function(origin, callback){
        if(!origin || listTrustableOrigins.includes(origin)){
            callback(null, true)
        } else{
            callback(new Error('Origin not allowed'))
        }
    }
}