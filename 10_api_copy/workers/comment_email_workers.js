const queue = require('../config/kue');

const commentMailer = require('../mailers/comments_mailer');

//Every worker has ( process function do ->  tell the worker when new task come you need to work added into queue
// you need to run this code

//data is comment

queue.process('emails', function(job, done) {

    console.log('emails worker is processing a job', job.data);

    commentMailer.newComment(job.data);

    done();
})