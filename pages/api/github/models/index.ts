import { model, models, Schema } from 'mongoose';
import { GithubUserInfoType } from "../../../../store/platforms/github";
 
 

const GithubDataSchema = new Schema<GithubUserInfoType>(
    {
      username: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        
        blog: {
          type: String,
          required: true,
          unique: true,
          index: true,
      },
      
      email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    
    avatar_url: {
      type: String,
      required: true,
      unique: true,
      index: true,
  },
      
  html_url: {
    type: String,
    required: true,
    unique: true,
    index: true,
},
    
repos: {
  type: [{
    language: String,
    url:  String,
    html_url: String,
    description: String,
    homepage: String,
    stargazers_count: Number,
    visibility: String,
    updated_at: String,
  }],
  required: true,
  unique: true,
  index: true,
},
  
         
    },
    { timestamps: true }
);

const CodepenData = models.users || model<GithubUserInfoType>('codepen', GithubDataSchema);

export default CodepenData;
