var nodemailer = require("nodemailer");

module.exports = function(app) {
    app.post("/mail", mail);

    function mail(req, res){
        var data = req.body;

        var mailOptions = {
            from: data.email,
            to: 'rachel@knightmovescafe.com',
            subject: 'Email from ' + data.name + " at " + data.email,
            text: data.msg
        };

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'knightmovescafetest@gmail.com', // Your email id
                pass: process.env.EMAIL_PASSWORD // Your password
            }
        });

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                res.json({yo: 'error'});
            }else{
                console.log('Message sent: ' + info.response);
                res.json({yo: info.response});
            }
        });
    }
};