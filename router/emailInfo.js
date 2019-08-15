const express = require('express')
const router1 = express.Router()


  router1.get('/firstThread', function(req, res, next) {
    const nylas = Nylas.with(req.session.token);
    let accountInfo = nylas.account.get();
    let threadInfo = nylas.threads.first();
    Promise.all([accountInfo, threadInfo])
      .then( ([accountData, threadData]) => {
      res.render('emailInfo',
        {
          account: accountData,
          thread: threadData,
        }
      );
    });
  });


  router1.get('/listThreads', function(req, res, next) {
     const nylas = Nylas.with(req.session.token)
     nylas.threads.list({limit: 2})
     .then(threadList => {
          res.render('emailInfoList', {threads: threadList})
      })
   });


  router1.get('/firstMessage',function(req, res, next) {
     const nylas = Nylas.with(req.session.token);
     nylas.messages.first({in: 'inbox'})
     .then(firstMessageInfo => {
       //console.log(`Subject: ${message.subject} | ID: ${message.id} | Unread: ${message.unread}`);
        res.render('message',
          { message: firstMessageInfo }
        );
      })
   });

 router1.post('/draft', function(req, res, next) {
    console.log('body', req.body)

    const nylas = Nylas.with(req.session.token);

    const draft = nylas.drafts.build(
      {
        subject: req.body.subject,
        to: [{name: req.body.name, email: req.body.email}],
        body: req.body.message
      }
    )
  draft.send().then(r => console.log(r))
 })





module.exports = router1;


// const nylas = Nylas.with(req.session.token)
    //   nylas.threads.list({limit: 2})
    //   .then (threadList => {
    //     for (let thread of threadList) {
    //       console.log(thread.subject);
    //     }
    //       // res.render('emailInfoList',
    //       //   {threads: threadList}
    //       //  )
    //   })
