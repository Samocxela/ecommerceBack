import Stripe from "stripe";//portal de pagos para conectarse a su api
import express from "express"
const striper = Stripe('sk_test_51NIJVgGbqyIDsGbLwSSh8jyr5WaagyzOJk3CKZqfqw5HkLH58BWfP0sCQtajq2mUmQAAJhgamezUXmotjUGrmIEz00R4fRFPjZ');//clave de acceso stripe para recibir el pago
const router = express.Router();

router.post("/payment", async (req,res)=>{
      
    let {amount, id} = req.body
    console.log(amount)
    try {
        const payment = await striper.paymentIntents.create({
            amount,
            currency: 'USD',
            description: 'shop',
            payment_method: id,
            confirm: true
        })
        console.log("vamos por aqui a pay")
        console.log('payment', payment);
        res.json({
            message: 'payment succesful',
            succes: true
        })
    } catch (error) {
        console.log('error', error);
        res.json({
            message:'payment failed',
            succes: false
        })
    }
})

export default router;
//funcion que permite conectarse a la api y realizar los pagos

