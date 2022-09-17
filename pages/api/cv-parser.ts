import textract from 'textract';
import _ from 'underscore';
import path from 'path';
import {getLinksFromText} from 'js-string-helper'
 

const dictionary = {
  titles: {
    objective: ['objective', 'objectives'],
    summary: ['summary'],
    technology: ['technology', 'technologies'],
    experience: ['experience', 'WORK EXPERIENCE'],
    education: ['education'],
    skills: ['skills', 'Skills & Expertise', 'technology', 'technologies'],
    languages: ['languages'],
    courses: ['courses'],
    projects: ['projects'],
    links: ['links'],
    contacts: ['contacts'],
    positions: ['positions', 'position'],
    profiles: ['profiles', 'social connect', 'social-profiles', 'social profiles'],
    awards: ['awards'],
    achievement: ['achievement', 'achievements'],
    honors: ['honors'],
    additional: ['additional'],
    certification: ['certification', 'certifications'],
    interests: ['interests']
  },
  profiles: [
    'github.com',
    'leetcode.com',
    'hackerrank.com',
    'codepen.io',
    'github.io',
    'linkedin.com',
    'facebook.com',
    'bitbucket.org',
    'stackoverflow.com'
  ],

  regular: {
    name: [
      /([A-Z][a-z]*)(\s[A-Z][a-z]*)/
    ],
    email: [
      /([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/
    ],
    phone: [
      /((?:\+?\d{1,3}[\s-])?\(?\d{2,3}\)?[\s.-]?\d{3}[\s.-]\d{4,5})/
    ]
  }
};

 
 

function restoreTextByRows(rowNum, allRows) {
  rowNum = rowNum - 1;
  var rows = [];

  do {
    rows.push(allRows[rowNum]);
    rowNum++;
  } while(rowNum < allRows.length);

  return rows.join("\n");
}
function countWords(str) {
  return str.split(' ').length;
}
function parseDictionaryTitles(Resume, rows: string[], rowIdx: number) {
  var allTitles = _.flatten(_.toArray(dictionary.titles)).join('|'),
    searchExpression = '',
    row = cleanStr(rows[rowIdx]),
    ruleExpression,
    isRuleFound,
    result;
    console.log("allTitles: ",allTitles)

  _.forEach(dictionary.titles, function(expressions, key) {
    expressions = expressions || [];
    // means, that titled row is less than 5 words
    if (countWords(row) <= 15) {
      _.forEach(expressions, function(expression) {
        ruleExpression = new RegExp(expression);
        isRuleFound = ruleExpression.test(row);

        if (isRuleFound) {
          allTitles = _.without(allTitles.split('|'), key).join('|');
          searchExpression = '(?:' + expression + ')((.*\n)+?)(?:'+allTitles+'|{end})';
          // restore remaining text to search in relevant part of text
          result = new RegExp(searchExpression, 'gm').exec(restoreTextByRows(rowIdx, rows));

          if (result) {
            Resume[key]=result[1]
            console.log("result",result)
          }
        }
      });
    }
  });
}

 
function cleanStr(str) {
  return str.replace(/\r?\n|\r|\t|\n/g, ' ').trim();
}
function cleanTextByRows(data) {
  var rows,
    clearRow,
    clearRows = [];

  rows = data.split("\n");
  for (var i = 0; i < rows.length; i++) {
    clearRow = cleanStr(rows[i]);
    if (clearRow) {
      clearRows.push(clearRow);
    }
  }

  return clearRows.join("\n") + "\n{end}";
}

function parseDictionaryRegular(data) {
  const output:any = {}
  var regularDictionary = dictionary.regular,
    find;

  _.forEach(regularDictionary, function(expressions, key:string) {
    _.forEach(expressions, function(expression) {
      find = new RegExp(expression).exec(data);
      if (find) {
        output[key.toLowerCase()] = find[0]
      }
    });
  });
  return output
}
 

export default async (req:any, res: any) => {
  // const { db } = await connectToDatabase();
  // if(!db) return res.json({error: "database connection failed"})

  // const movies = await db
  //   .collection("users")
  //   .find({})
  //   .sort({ metacritic: -1 })
  //   .limit(20)
  //   .toArray();

  // let url = 'https://firebasestorage.googleapis.com/v0/b/githubpage-fa457.appspot.com/o/CV_md_sifatul_islam_2020_11_24.pdf?alt=media&token=2d778a2f-cab2-428e-833c-e5f7056005f0'
  // let url = 'https://firebasestorage.googleapis.com/v0/b/githubpage-fa457.appspot.com/o/juaid-rakin-resume.pdf?alt=media&token=0ff0dffc-b0eb-42bc-b68c-750fb92043d2'
  // let url = 'https://www.dayjob.com/downloads/CV_examples/Web_Developer_Resume_1.pdf'
  // url = "https://firebasestorage.googleapis.com/v0/b/githubpage-fa457.appspot.com/o/Ruhul's%20Resume%20(1).pdf?alt=media&token=19357c65-de73-42c2-972a-c33a564577fa"
  const {text, error} = await new Promise(resolve=>{
     
      const filePath  = path.join(process.cwd(),'/public/test.pdf')
    textract.fromFileWithPath(filePath, function( error, text ) {
      resolve({text, error})
      // console.log()
    })
  })
  const data = cleanTextByRows(text.toLowerCase());

  const rows = text.toLowerCase().split("\n")
  const json = parseDictionaryRegular(data);
  const cleaned = cleanStr(data)
  const urls = getLinksFromText(cleaned)
 
  if((urls||[]).length>0) json.urls = urls
   
  for (var i = 0; i < rows.length; i++) {
 
    parseDictionaryTitles(json, rows, i);
    
  }

  return res.json({text, error, data, json});
};