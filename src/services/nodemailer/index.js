import {createTransport} from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config();

class NodemailerService{
    constructor(){
        this.TEST_MAIL = process.env.MAIL;
        this.PASS_MAIL = process.env.PASS;
    }

    async transporter(){
        const transport = createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: this.TEST_MAIL,
                pass: this.PASS_MAIL
            }
        });
        return transport
    }
    
    mailOptions (body, subject){
        const mailOptions={
            from: this.TEST_MAIL,
            to:  this.TEST_MAIL,
            subject: subject,
            html:`<h1>${body}</h1>`,
        }
        return mailOptions;
    }
}

export default NodemailerService;