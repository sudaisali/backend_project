const Queue = require('bull');
const { sendEmail } = require('./email');
const { Job } = require('../models/jobs');
const { failed } = require('../models/failed');
const emailJob = new Queue('Job');

const processEmailJob = async (job) => {
  
  try {
    await sendEmail(job.data);
    console.log(`process completed`);
  } catch (error) {
    await failed.create({
      jobid: job.id,
      email: job.data.email,
      message: job.data.subject,
      status: "failed"
    });
    console.error(`process failed with error: ${error.message}`);
    // Do not rethrow the error here
  }
};
emailJob.process(async (job) => {
  try {
    // Save job details to MongoDB
    const state = await job.getState()
    await Job.create({
      jobid: job.id,
      email:job.data.email,
      message:job.data.subject,
      status: state
    });
    await processEmailJob(job);
    console.log(`Job details saved to MongoDB`);
  } catch (error) {
    console.error(`Error saving job details to MongoDB  ${error.message}`);
    
  }
});
// Event handlers
emailJob
  .on('completed', async function (job, result) {
    console.log(`Job ${job.id} completed! Result: ${result}`);
    console.log(await job.getState())
    // Remove the job from the Bull queue
    console.log(job.state)
    await job.remove();
    const state = await job.getState();
    console.log(state);

    // Remove Job from MongoDB
    await Job.findOneAndDelete({ jobid: job.id });

    console.log(`Job removed from both Bull and MongoDB`);
  })
  .on('failed', function (job, err) {
    console.error(`Job ${job.id} failed with reason: ${err.message}`);
  })
  .on('paused', function () {
    console.log(`The queue has been paused.`);
  })
  .on('resumed', function (job) {
    console.log(`The queue has been resumed.`);
  })
  .on('cleaned', function (jobs, type) {
    console.log(`Old jobs have been cleaned from the queue. Type: ${type}`);
  })
  .on('drained', function () {
    console.log(`The queue has processed all waiting jobs.`);
  })
  .on('removed', function (job) {
    console.log(`Job ${job.id} successfully removed.`);
  });

module.exports = { emailJob };
