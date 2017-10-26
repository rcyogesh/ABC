const fs = require('fs');
const util = require('util');
// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

const bpFile = 'bp.txt';

module.exports = {
    process: function(BP) {
        let date = new Date();
        fs.appendFileSync(bpFile,
            util.format("%d/%d/%d %d:%d:%d, %d, %d, %d, %d\r\n",
             date.getMonth() + 1, date.getDate(), date.getFullYear(),
             date.getHours(), date.getMinutes(), date.getSeconds(), 
             BP.Systolic, BP.Diastolic, BP.HB, BP.Weight),
            'utf8');

         let msg = {
                to: 'rcyogesh@gmail.com',
                from: 'rcyogesh@gmail.com',
                subject: 'BP Backup',
                text: fs.readFileSync(bpFile, 'utf8'),
              };
        sgMail.send(msg);
    }
}

