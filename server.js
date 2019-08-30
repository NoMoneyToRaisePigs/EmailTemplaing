//put inquirer later
var ActiveDirectory = require('activedirectory');
 
var express=require('express');
var app=express();
app.use(express.json());


app.use(express.static(__dirname + '/'));

// app.use((req, res, next) => {
//   //  res.setHeader('Content-Type', 'application/json');
//     next();
// });


// var Stomp = require('stomp-client');
// var destination = '/queue/node_test';
// var emai = '/queue/DEV_TEST.Q.EmailDelivery.Request';
// var client = new Stomp('127.0.0.1', 61613, '', '');

// client.connect(function(sessionId) {
//     client.subscribe(destination, function(body, headers) {
//       console.log('This is the body of a message on the subscribed queue:', body);
//     });
    
    

//     let test = {
//         From: 'x',
//         To: ['a','b','c'],
//         Subject: 'test',
//         Body: 'html'
//     }

//     let xml = '<EmailDeliveryRequest><MessageHeader><NmsCorrelationId>4095E674-4F20-4F50-9A32-B26CEF11E3F3.0000</NmsCorrelationId></MessageHeader><From>test-sender@reset.net</From><To><string>gaofan@reset.net</string></To><Cc/><Bcc><string>testBcc@reset.net</string></Bcc><Subject>nunit test EmailDeliver.Tests.ServiceTester.SubmitSendEmailRequest</Subject><Body>test with attachment</Body><IsBodyHtml>false</IsBodyHtml></EmailDeliveryRequest>';
//     client.publish(emai, xml);
// });

const stompit = require('stompit');

const connectOptions = {
  'host': 'localhost',
  'port': 61613
};

stompit.connect(connectOptions, function(error, client) {
  
  if (error) {
    console.log('connect error ' + error.message);
    return;
  }
  
  const sendHeaders = {
    'destination': '/queue/DEV_TEST.Q.EmailDelivery.Request',
    'content-type': 'text/plain',
    '__type__':'EmailDeliveryRequest'
  };
  
  const frame = client.send(sendHeaders);
  frame.write('<EmailDeliveryRequest><MessageHeader><NmsCorrelationId>4095E674-4F20-4F50-9A32-B26CEF11E3F3.0000</NmsCorrelationId></MessageHeader><From>test-sender@reset.net</From><To><string>gaofan@reset.net</string></To><Cc/><Bcc><string>testBcc@reset.net</string></Bcc><Subject>nunit test EmailDeliver.Tests.ServiceTester.SubmitSendEmailRequest</Subject><Body>test with attachment</Body><IsBodyHtml>false</IsBodyHtml></EmailDeliveryRequest>');
  frame.end();
  
//   const subscribeHeaders = {
//     'destination': '/queue/node_test',
//     'ack': 'client-individual'
//   };
  
//   client.subscribe(subscribeHeaders, function(error, message) {
    
//     if (error) {
//       console.log('subscribe error ' + error.message);
//       return;
//     }
    
//     message.readString('utf-8', function(error, body) {
      
//       if (error) {
//         console.log('read message error ' + error.message);
//         return;
//       }
      
//       console.log('received message: ' + body);
      
//       client.ack(message);
      
//       client.disconnect();
//     });
//   });
});

app.get('/p',function(req,res)
{


    res.send('Hello World!');
});

app.get('/xxx',function(req,res)
{
    let userId = req.query.userId;

    var sql  = require('mssql/msnodesqlv8');

    var dbConfig = {    
        driver: 'msnodesqlv8',
        //connectionString:'Data Source=localhost;Initial Catalog=DEV_Portal66;Persist Security Info=True;Trusted_Connection=true;Connect Timeout=60;Application Name=AdminGUI;'
        connectionString: 'Driver={SQL Server Native Client 11.0};Server={XSG00WW77581};Database={Dev_Portal66};Trusted_Connection={yes};'
    };

    sql.connect(dbConfig, function(err){
        if(err){
            console.log("Error while connecting database :- " + err);
            res.send(err);
            sql.close();
        }
        else {                       
            var sqlrequest = new sql.Request();         

            sqlrequest.query(`SELECT * FROM DEV_Portal66..[User] WHERE UserId = ${userId}`,function(err, data){
                if(err){
                    console.log("Error while connecting database :- " + err);
                    res.send(err);
                }
                else{
                    res.end(JSON.stringify(data.recordset[0]));
                }
                sql.close();    
            });            
        }
    });

    // var config = {
    //     user: 'sa',
    //     password: 'mypassword',
    //     server: 'localhost', 
    //     database: 'SchoolDB' 
    // };

    // // connect to your database
    // sql.connect(config, function (err) {
    
    //     if (err) console.log(err);

    //     // create Request object
    //     var request = new sql.Request();
           
    //     // query to the database and get the records
    //     request.query('SELECT TOP(10)* FROM dbo.[User]', function (err, recordset) {
            
    //         if (err) console.log(err)

    //         // send records as a response
    //         let x = recordset;
            
    //     });
    // });


});

app.post('/user', function (req, res) {
    //res.setHeader('Content-Type', 'application/json');
    //res.end(JSON.stringify({ a: 1 , b: 'xxx'}));
    var config = {
        url: 'ldap://NewCo.Global/',
        baseDN: 'DC=NewCo,DC=Global'
    };
    var ad = new ActiveDirectory(config);
    
    var username = 'fan gao';
    var password = 'Gf@19901103';
    
    
    ad.authenticate(username, password, function(err, auth) {
        if (err) {
            console.log('ERROR: '+JSON.stringify(err));
            return;
        }
        if (auth) {
            console.log('Authenticated!');
            res.json({ a: 1 , b: 'xxx', pass: true});
        }
        else {
            console.log('Authentication failed!');
        }
    });

   
})





var server=app.listen(3000,function() {
    console.log('listening 3000');
});