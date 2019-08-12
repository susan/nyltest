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


module.exports = router1;
