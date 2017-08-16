/**
 * Created by 15050978 on 1/3/2017.
 */
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var port = 8900;
var router = express.Router();

var nodemailer = require('nodemailer');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:6900");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.get('/', function (req, res) {
    res.send('im the home page!');
});

router.post('/mail', function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'edwardsuwirya@gmail.com',
            pass: '3Streifen2408'
        }
    });
    var mailOptions = {
        from: 'edwardsuwirya@gmail.com',
        to: 'nanang.zulkarnain@btpn.com,v-agus.rianto@btpn.com',
        subject: 'ARMS Check In Request',
        html: '<div>Kepada</div>' +
        '<div>PT. [Nama Vendor]</div> ' +
        '<div>[Alamat Vendor]</div> ' +
        '<br/> ' +
        '<br/> ' +
        '<p>Mohon dapat dilakukan pengambilan box dokumen pada lokasi cabang dengan [REQUEST ID] dan detail sebagai berikut:</p> ' +
        '<table> ' +
        '<tr> ' +
        '<td>Nama Divisi/ Cabang Pemilik Arsip, Branch Code   & Cost Center</td> ' +
        '<td>:</td> ' +
        '<td></td> ' +
        '</tr> ' +
        '<tr> ' +
        '<td>Alamat pengambilan dokumen</td> ' +
        '<td>:</td> ' +
        '<td></td> ' +
        '</tr> ' +
        '<tr> ' +
        '<td>Tanggal pengambilan dokumen</td> ' +
        '<td>:</td> ' +
        '<td></td> ' +
        '</tr> ' +
        '<tr> ' +
        '<td>Nama PIC</td> ' +
        '<td>:</td> ' +
        '<td></td> ' +
        '</tr> ' +
        '<tr> ' +
        '<td>No. Telp. / Hp</td> ' +
        '<td>:</td> ' +
        '<td></td> ' +
        '</tr> ' +
        '<tr> ' +
        '<td>Jumlah Box</td> ' +
        '<td>:</td> ' +
        '<td></td> ' +
        '</tr> ' +
        '<tr> ' +
        '<td>Detail box</td> ' +
        '<td>:</td> ' +
        '<td> ' +
        '<div>1.	No box 1</div> ' +
        '<div>2.	No box 2</div> ' +
        '</td> ' +
        '</tr> ' +
        '</table>' +
        '<p>Demikian permohonan dari kami. Atas perhatian dan kerja samanya kami ucapkan terima kasih.</p>'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        };
    });
});

app.use('/', router);

app.listen(port);
console.log('App happens on port ' + port);

