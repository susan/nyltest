const express = require('express')
const router1 = express.Router()

   router1.get('/',function(req,res){
   	 options = {
       redirectURI: 'http://localhost:3000/oauth/callback',
       trial: false,
     };
     res.render('index',
        {url: Nylas.urlForAuthentication(options)}
      );
   });

   router1.get('/oauth/callback', function(req, res, next) {
     if (req.query.code) {
       Nylas.exchangeCodeForToken(req.query.code)
       .then(function(token) {
       req.session.token = token;
       res.redirect('/about');
     });
     } else if (req.query.error) {
       res.render('error', {
         message: req.query.reason,
         error: {
         status:
          'Please try authenticating again or use a different email account.',
         stack: '',
         },
      });
     }
   });


   router1.get('/about',function(req,res){
        res.render('about');
  });


   // router1.get('/first',function(req, res, next) {
   //   const nylas = Nylas.with(req.session.token)

   //   let accountInfo = nylas.account.get();
   //   let threadInfo = nylas.threads.first();

   //   Promise.All([accountInfo, threadInfo])
   //   .then(function([account, firstThreadInfo])  {
   //      res.render('emailInfo',
   //        {
   //          account: account,
   //          thread: firstThreadInfo,
   //        }
   //      );
   //    })
   // });


  router1.get('/first',function(req, res, next) {
     nylas.threads.first()
     // .then(r=> console.log(r))
     // res.render('emailInfo')
     .then (firstThreadInfo => {
        res.render('emailInfo',
          { thread: firstThreadInfo }
        );
      })
   });



module.exports = router1;
