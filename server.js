//put inquirer later
var ActiveDirectory = require('activedirectory');

var express=require('express');
var app=express();
app.use(express.json());


app.use(express.static(__dirname + '/'));

app.use((req, res, next) => {
  //  res.setHeader('Content-Type', 'application/json');
    next();
});

app.get('/',function(req,res)
{
    res.send('Hello World!');
});

app.get('/xxx',function(req,res)
{
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
            var request = new sql.Request();         
            var q = ''; 
            request.query("SELECT * FROM DEV_Portal66..[User] WHERE UserId = 31",function(err, data){
                if(err){
                    console.log("Error while connecting database :- " + err);
                    res.send(err);
                }
                else{
                    let x = data;
                }
                sql.close();    
            });            
        }

        res.send('xxx');
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
    var password = 'Gf!19901103';
    
    
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






var server=app.listen(3000,function() {});