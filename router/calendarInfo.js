const express = require('express')
const router1 = express.Router()
const moment = require('moment');

router1.get('/',function(req, res, next) {
   res.render('calendarInfoHome');
 });

router1.get('/eventList', function(req, res, next) {
  const nylas = Nylas.with(req.session.token)
  nylas.events.list({limit: 8 })
  .then(eventList => {
   res.render('CalendarInfoList',
   	{events: eventList,
   	 moment: moment,
   	})
  })
});

router1.post('/event', function(req, res, next) {
    //console.log(Object.keys(req.body))

    const startDate = `${req.body.eventDate} ${req.body.start}`;
    const endDate = `${req.body.eventDate} ${req.body.end}`;

    const unixStart = moment(new Date(startDate)).unix();
    const unixEnd = moment(new Date(endDate)).unix();

    // const eventInfo = {
	   //  title: req.body.title,
    //   calendarId: req.body.calendarId,
    //   when: { start_time: unixStart, end_time: unixEnd },
    //    participants: [
    //    { email: req.body.firstInviteeEmail, name: req.body.firstInviteeName },
	   //  { email: req.body.secondInviteeEmail, name: req.body.secondInviteeName }],
    //  location: req.body.location,
    // }

    //console.log(eventInfo)
   const nylas = Nylas.with(req.session.token)
   const event = nylas.events.build({
     title: req.body.title,
      calendarId: req.body.calendarId,
      when: { start_time: unixStart, end_time: unixEnd },
       participants: [
       { email: req.body.firstInviteeEmail, name: req.body.firstInviteeName },
	    { email: req.body.secondInviteeEmail, name: req.body.secondInviteeName }
	    ],
     location: req.body.location,
   })

   //res.send("hi")
    event.save({ notify_participants: true }).then(event => {
    console.log(event);
    });
    res.render('CalendarInfoHome')
 })


module.exports = router1;
