const express = require('express')
const router1 = express.Router()
const moment = require('moment');

router1.get('/',function(req, res, next) {
   res.render('calendarInfoHome');
 });

router1.get('/eventList', function(req, res, next) {
  console.log("is this working?")
  const nylas = Nylas.with(req.session.token)
  nylas.events.list({limit: 2 })
  .then(eventList => {
   res.render('CalendarInfoList',
   	{events: eventList,
   	 moment: moment,
   	})
  })
});

module.exports = router1;
