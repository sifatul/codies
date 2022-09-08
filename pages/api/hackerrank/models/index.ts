import { isEmail } from 'js-string-helper';
import { model, models, Schema } from 'mongoose';
import { hackerRankDataType } from '../../../../store/platforms/hackerrank';
// interface

const HackerrankDataSchema = new Schema<hackerRankDataType>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    linkedin_url: {
      type: String,
      required: false,
      unique: true,
    },
    github_url: {
      type: String,
      required: false,
      unique: true,
    },
    country: {
      type: String,
      required: false,
      unique: true,
    },
    languages: {
      type: [String],
      required: false,
      unique: true,
    },
    avatar: {
      type: String,
      required: false,
      unique: true,
    },
    school: {
      type: String,
      required: false,
      unique: true,
    },
    level: {
      type: Number,
      required: false,
      unique: true,
    },
    website: {
      type: String,
      required: false,
      unique: true,
    },
    short_bio: {
      type: String,
      required: false,
      unique: true,
    },
    personal_first_name: {
      type: String,
      required: false,
      unique: true,
    },
    personal_last_name: {
      type: String,
      required: false,
      unique: true,
    },
    company: {
      type: String,
      required: false,
      unique: true,
    },
    local_language: {
      type: String,
      required: false,
      unique: true,
    },
    job_title: {
      type: String,
      required: false,
      unique: true,
    },

    jobs_headline: {
      type: String,
      required: false,
      unique: true,
    },
    followers_count: {
      type: Number,
      required: false,
      unique: true,
    },
    submissionHistory: {
      type: {String: String },
      required: false,
      unique: true,
    },
  },
  { timestamps: true }
);

const HackerRankData = models.hackerrank || model<hackerRankDataType>('hackerrank', HackerrankDataSchema);

export default HackerRankData;
