import dotenv from 'dotenv'
dotenv.config()

import sendMailConfig from './config'

 const emailService=async(data:any)=>{
    const mailoptions={
        from:process.env.EMAIL as string,
        to :`${data.email}`,
        subject:'Reset Password',
        text:``,
        html:`<h4>${data.password}</h4>`
    }
  
  try {
    await sendMailConfig(mailoptions)
  } catch (error) {
      console.log(error);
      
  }
  
 }
export default emailService