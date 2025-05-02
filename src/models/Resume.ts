import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  personalInfo: {
    name: String,
    title: String,
    email: String,
    phone: String,
    location: String,
    summary: String,
  },
  education: [{
    school: String,
    degree: String,
    field: String,
    startDate: String,
    endDate: String,
    description: String,
  }],
  experience: [{
    company: String,
    position: String,
    location: String,
    startDate: String,
    endDate: String,
    description: String,
  }],
  skills: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume; 