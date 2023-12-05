function generateRandomNumber() {
    // Generate a random number between 100000 and 999999 (inclusive)
    return Math.floor(Math.random() * 900000) + 100000;
}

// Example usage
const randomSixDigitNumber = generateRandomNumber();
 const FetchSmsBrandNoneZalo = (phone) => {
    console.log("111112222222222222222222", phone);
    const settings = {
        url: "http://210.211.109.118/cskhunicodeapi/send?wsdl",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "text/plain;text/xml; charset=utf-8",
        },
        data:
            `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<soapenv:Envelope\r\nxmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\"\r\nxmlns:send=\"http://send_sms.vienthongdidong.vn/\"> <soapenv:Header />\r\n<soapenv:Body>\r\n<send:send>\r\n<!--Optional:--> <USERNAME>thoviet2023</USERNAME>\r\n<!--Optional:--> <PASSWORD>CongTyThoViet@)!!%*%^*</PASSWORD>\r\n<!--Optional:--> <BRANDNAME>THOVIET.VN</BRANDNAME>\r\n<!--Optional:--> <MESSAGE>Để đảm bảo an toàn dịch vụ, đúng Thợ Việt thi công bảo hành. Anh/Chị xác nhận giúp em qua: https://datlich.thoviet.vn/tc</MESSAGE>\r\n<!--Optional:--> <TYPE>1</TYPE>\r\n<!--Optional:--> <PHONE>` +
            phone +
            `</PHONE>\r\n<!--Optional:--> <IDREQ>1614150957093</IDREQ>\r\n</send:send>\r\n</soapenv:Body>\r\n</soapenv:Envelope>\r\n`,
    };
    console.log(settings);
};
export default FetchSmsBrandNoneZalo;
//   fetch(settings.url, {
//     method: settings.method,
//     headers: settings.headers,
//     body: settings.data,
//   })
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(error => console.error('Error:', error));
// const settings = {
//     url: "http://210.211.109.118/apibrandname/SendOTP",
//     method: "POST",
//     timeout: 0,
//     headers: {
//       "Content-Type": "text/plain",
//     },
//     data: `{
//       "phone": "1",
//       "password": "CongTyThoViet@)!!%*%^*",
//       "message": "THOVIET.VN thong bao Ma OTP cua Quy Khach qua Tho Viet la `+randomSixDigitNumber+`. Ma co hieu luc trong vong 3 phut. Tuyet doi khong cung cap ma OTP nay voi nguoi khac!",
//       "idrequest": "1614150957093",
//       "brandname": "THOVIET.VN",
//       "username": "thoviet2023"
//     }`,
//   };

//   fetch(settings.url, {
//     method: settings.method,
//     headers: settings.headers,
//     body: settings.data,
//   })
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(error => console.error('Error:', error));
