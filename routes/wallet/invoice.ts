module.exports = {
  invoice: async (req:any, res:any) =>  {
    const QRCode = require('qrcode')

      const monerojs = require("monero-javascript");
      let wallet = req.app.locals.wallets[req.body.path]
      try{
        let address = await wallet.getIntegratedAddress("", req.body.payment_id.toString()) 
        let address_qrcode = await QRCode.toDataURL(address)
        let amount = req.app.locals.exchange_rate[req.body.currency] * req.body.amount
        res.status(200).json({address, address_qrcode,amount})
      } catch (error){
        res.status(500).json({ message:'unexpected error: ' + error });
      }

    },
  };