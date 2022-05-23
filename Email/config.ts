import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

    function createTransporter(config:any){
        let transporter= nodemailer.createTransport(config)
        return transporter;
    }

    const configuration={
        port:587,
        host:'smtp.gmail.com',
        secure:false,
        requireTLS:true,
        auth:{
            user:process.env.EMAIL as string,
            pass:process.env.EMAILPASS as string
         }
    }

    const sendMailConfig =async(mailoption:any)=>{
        console.log(configuration);
        
        const transporter= createTransporter(configuration)
        await transporter.verify()
        await transporter.sendMail(mailoption)

    }

    export default sendMailConfig