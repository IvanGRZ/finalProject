import twilio from 'twilio'
import dotenv from 'dotenv'

dotenv.config();

class TwilioService{
    constructor(){
        this.accountSid = process.env.ACCOUNT_SID;
        this.authToken = process.env.AUTH_TOKEN;
    }

    async client (){
        const client = twilio(this.accountSid, this.authToken)
        return client
    }
    
}

export default TwilioService;