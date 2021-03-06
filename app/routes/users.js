'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();
const cookieSession = require('cookie-session');

const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT_ROUNDS;
const nanoid = require('nanoid');

const nodemailer = require('nodemailer');
// const myPlaintextPassword = 'whip it';
// const someOtherPlaintextPassword = 'into shape';

router.use(cookieSession(
  {
    name: 'session',
    keys: [process.env.SUPERSECRETKEY],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

router.use(function (req,res,next) {
  if (req.session.userId) {
    knex('users')
    .where({id:req.session.userId})
    .first()
    .then(function (result) {
      req.user = result;
      next();
    });
  } else {
    next();
  }
});

router.post('/loginstatus', (req, res, next)=>{
  console.log('called');
  if ((!req.body.user_id) || (!req.session)) {
    let obj = {
      session: 'empty'
    };
    console.log(obj);
  }
  knex('users')
  .where('id', req.body.user_id)
  .first()
  .then((user) => {
    if (!user) {
      return next();
    }
    if (req.session.userId === req.body.user_id) {
      console.log(req.session.userId);
      res.send(user);
    } else {
      let obj = {
        session: 'empty'
      };
      console.log(obj);
      console.log(req.session.userId);
      console.log(req.body.user_id);
      res.send(obj);
    }
  })
  .catch((err) => {
    next(err);
  });
});

router.post('/byemail', (req, res, next)=>{
  console.log('called');
  if (!req.body.email) {
    let obj = {
      email: 'unique'
    };
    console.log(obj);
  }
  knex('users')
  .where('email', req.body.email)
  .first()
  .then((user) => {
    if (!user) {
      let obj = {
        email: 'unique'
      };
      res.send(obj);
    } else {
      res.send(user);
    }

  })
  .catch((err) => {
    next(err);
  });
});

router.post('/newuserconfirm/:id', (req, res, next)=>{
  let linkString = 'http://localhost:3007/emailconfirm/';
  let user = req.params.id;

  let smtp = {
    host: 'smtp.mail.com',
    port: 587,
    secure: false
  };
  let account = {
    smtp: smtp,
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASSWORD
  };

  knex('users')
  .where({id: user})
  .first()
  .then(userFile=>{
    console.log(userFile);
    let identifier = userFile.email_reset.initialize_account;

    let transporter = nodemailer.createTransport(
        {
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            },
            tls: {
              rejectUnauthorized: false
            },
            logger: true,
            debug: true // include SMTP traffic in the logs
        },
        {
            // default message fields

            // sender info
            from: process.env.EMAIL_ACCOUNT
        }
    );

    transporter.verify(function(error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });

    // Message object
    let message = {
        // Comma separated list of recipients
        from: process.env.EMAIL_ACCOUNT,
        to: userFile.email,

        // Subject of the message
        subject: 'Your FreqDomain 2.0 email verification link',

        // plaintext body
        text: 'Please click this link to confirm your email:',

        // HTML body
        html: '<a href="' + linkString + identifier + '"><h1>__FreqDomain2.0_Email_Link__<h1></a>'

    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return process.exit(1);
        }

        console.log('Message sent successfully!');
        console.log(nodemailer.getTestMessageUrl(info));

        // only needed when using pooled connections
        //transporter.close();
    });
  });
});

router.post('/lostpassword/:id', (req, res, next)=>{
  console.log('it\'s emailing time!');
  let linkString = 'http://localhost:3007/passwordreset/';
  let user = req.params.id;
  let idendifier = nanoid() + nanoid();

  let smtp = {
    host: 'smtp.mail.com',
    port: 587,
    secure: false
  };
  let account = {
    smtp: smtp,
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASSWORD
  };

  knex('users')
  .where({id: user})
  .first()
  .update({
    security: {
      "key": req.body.security.key,
      "value": req.body.security.value,
      "passwordRecovery": idendifier
    }
  }, '*')
  .then((result)=>{
    //console.log(req.body.email);
    // nodemailer.createTestAccount((err)=>{
    //   if (err) {
    //     console.log('failed to create a testing account');
    //     return(err);
    //   }
    //   console.log('Credentials obtained, sending message...');
    // });

    let transporter = nodemailer.createTransport(
        {
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            },
            tls: {
              rejectUnauthorized: false
            },
            logger: true,
            debug: true // include SMTP traffic in the logs
        },
        {
            // default message fields

            // sender info
            from: process.env.EMAIL_ACCOUNT
        }
    );

    transporter.verify(function(error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });

    // Message object
    let message = {
        // Comma separated list of recipients
        from: process.env.EMAIL_ACCOUNT,
        to: req.body.email,

        // Subject of the message
        subject: 'Your FreqDomain2.0 password reset link',

        // plaintext body
        text: 'Please click this link to reset your password:',

        // HTML body
        html: '<a href="' + linkString + 'user=' + req.body.id + '&recovery=' + idendifier + '"><h1>FreqDomain2.0_password_reset</h1></a>'

    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return process.exit(1);
        }

        console.log('Message sent successfully!');
        console.log(nodemailer.getTestMessageUrl(info));

        // only needed when using pooled connections
        //transporter.close();
    });


  });
});

router.post('/login', (req,res) => {

  let key = nanoid();
  let value = nanoid();
  let expire = new Date();
  expire.setDate(expire.getDate() + 3);

  if (!req.body.email || !req.body.password) {
    console.log("ERROR STATE");
    res.sendStatus(403);
  }

  knex('users')
  .where({email: req.body.email})
  .first()
  .then((result) => {

    if (!result || (!bcrypt.compareSync(process.env.SALT_PASSWORD + req.body.password,result.hashed_password))) {
      req.session = null;

      knex('users')
      .where({email: req.body.email})
      .first()
      .update({
        security: null
      })
      .then(()=>{
        let failure = {
          user_id: undefined,
          login: 'forbidden'
        };
        res.send(failure);
      });

    } else {
      req.session.userId = result.id;
      result.security = {};
      result.security.key = key;
      result.security.value = value;
      result.security.expire = expire;
      knex('users')
      .where({name: req.body.email})
      .first()
      .update({
        security: { "key": key, "value": value, "expire": expire},
        email_reset: null
      }, '*')
      .then(()=>{
        res.send(result);
      });

    }
  });

});

router.get('/', (req, res, next) => {
  knex('users')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {
  knex('users')
    .select()
    .where('id', req.params.id)
    .first()
    .then((user) => {
      if (!user) {
        return next();
      }

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  var salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
  var hash = bcrypt.hashSync(process.env.SALT_PASSWORD + req.body.password, salt);
  var key = nanoid();
  var value = nanoid();
  var email_confirm = nanoid() + nanoid();


  knex('users')
  .insert({
    name: req.body.name,
    email: req.body.email,
    hashed_password: hash,
    is_admin: req.body.is_admin,
    user_avatar_url: req.body.user_avatar_url,
    associates: req.body.associates,
    security: { "key": key, "value": value },
    email_reset: { "initialize_account": email_confirm, "confirm": false}
  }, '*')
  .then((result) => {
    // console.log(bcrypt.compareSync(myPlaintextPassword, hash)); //true
    // console.log(bcrypt.compareSync(someOtherPlaintextPassword, hash)); //false
    // console.log(bcrypt.compareSync(myPlaintextPassword, '$2a$12$mrJJzYrcDZYJR8OSfBsRLumSdtlafr6yz.TuwsXmYmih6UGQTuuBm')); // true
    res.status(200).send(result);
  })
  .catch((err) => {
    next(err);
  });
});



router.post('/logout',(req,res,next) => {
  req.session = null;

  res.send({session:'cleared'});
});

router.patch('/resetsecurity/:id', (req, res, next)=>{

  var key = nanoid();
  var value = nanoid();
  knex('users')
  .where('id', req.params.id)
  .update({
    security: { "key": key, "value": value }
  }, '*' )
  .then((results)=>{
     res.status(200).send(results[0]);
  })
  .catch((err) => {
    next(err);
  });
});

router.patch('/newuser/:id', (req, res, next)=>{
  knex('users')
  .where('id', req.params.id)
  .update({
    email_reset: req.body.email_reset
  }, '*')
  .then(results=>{
    req.session.userId = results.id;
    res.status(200).send(results[0]);
  })
  .catch((err) => {
    next(err);
  });
});

router.patch('/passwordchange/:id', (req, res, next)=>{
  var salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
  var hash = bcrypt.hashSync(process.env.SALT_PASSWORD + req.body.password, salt);
  knex('users')
  .where('id', req.params.id)
  .update({
    hashed_password: hash,
  }, '*')
    .then((results)=>{
       res.status(200).send(results[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/:id', (req, res, next) => {
  var hashed_password = '';
  if (!req.session.isChanged) {
    if (req.body.password) {
      var salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
      var hash = bcrypt.hashSync(process.env.SALT_PASSWORD + req.body.password, salt);
      knex('users')
      .where('id', req.params.id)
      .update({
        name: req.body.name,
        email: req.body.email,
        hashed_password: hash,
        is_admin: req.body.is_admin,
        user_avatar_url: req.body.user_avatar_url,
        associates: req.body.associates,
        security: req.body.security,
        email_reset: req.body.email_reset
      }, '*')
        .then((results)=>{
           res.status(200).send(results[0]);
        })
        .catch((err) => {
          next(err);
        });
    } else {
      knex('users')
      .where('id', req.params.id)
      .update({
        name: req.body.name,
        email: req.body.email,
        is_admin: req.body.is_admin,
        user_avatar_url: req.body.user_avatar_url,
        associates: req.body.associates,
        security: req.body.security,
        email_reset: req.body.email_reset
      }, '*')
        .then((results)=>{
           res.status(200).send(results[0]);
        })
        .catch((err) => {
          next(err);
        });
      }
    } else {
      res.sendStatus(403);
    }
});

router.delete('/:id', (req, res, next) => {
    let record;
    if ((req.session !== null) && (!req.session.isChanged)) {
      knex('users')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('users')
            .del()
            .where('id', req.params.id);
        })
        .then(() => {
          var holder = record.id;
          delete record.id;

          var obj = {
            id: holder,
            name: record.name,
            email: record.email,
            is_admin: record.is_admin,
            user_avatar_url: record.user_avatar_url,
            associates: req.body.associates,
            created_at: record.created_at,
            updated_at: record.updated_at
          };

          res.send(obj);
        })
        .catch((err) => {
          next(err);
        });
      } else {
        res.sendStatus(403);
      }
    });




module.exports = router;
