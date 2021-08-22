import slowDown from 'express-slow-down'



const trustOrigins = [
    process.env.FE_DEV_TRUST_URL,
    process.env.FE_PROD_TRUST_URL,
    process.env.FE_PROD_TRUST_URL_2,
    process.env.FE_PROD_TRUST_URL_3,
    process.env.FE_PROD_TRUST_URL_4
]

export const corsConfig = {
    origin: function (origin, callback) {
        if (!origin || trustOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Origin not allowed'))
        }
    }
}

export const requestSpeedLimiter = slowDown({
    // set interval 5 min
    windowMs: 5 * 60 * 1000,
    // set max request per windowMs (this case 30)
    delayAfter: 15,
    // set increment delay after the 30 requests
    delayMs: 300,
    // set a max delay will not be over 3000ms
    maxDelayMs: 3000
})