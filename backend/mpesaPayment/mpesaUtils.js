const generateMpesaCredentials = () => {
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
  
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:T.]/g, "")
      .slice(0, 14);
  
    const dataToEncode = shortcode + passkey + timestamp;
  
    const password = Buffer.from(dataToEncode).toString("base64");
  
    return { password, timestamp };
  };
  
  module.exports = generateMpesaCredentials;
