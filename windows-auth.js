// var passport = require('passport');
// var WindowsStrategy = require('passport-windowsauth');


// passport.use(new WindowsStrategy({
//   ldap: {
//     url:             'ldap://NewCo.Global/',
//     base:            'DC=NewCo,DC=Global?sAMAccountName?sub?(objectClass=user)',
//     bindDN:          'f_gao',
//     bindCredentials: 'Gf!19901103'
//   },
//   integrated:      false
// }, function(profile, done){
//   User.findOrCreate({ waId: profile.id }, function (err, user) {
//     done(err, user);
//   });
// },function(er){
//   let y = 0;
// }));


// setTimeout(() =>{
//     passport.authenticate('WindowsAuthentication', {
//         successRedirect: '/',
//         failureRedirect: '/login',
//         failureFlash:    true });
// }, 10000)


var ActiveDirectory = require('activedirectory');
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
    }
    else {
        console.log('Authentication failed!');
    }
});


