import fs from 'fs';
import { getLinksFromText } from 'js-string-helper';
import pdf from 'pdf-parse';
import _ from 'underscore';




const dictionary = {
  titles: {
    objective: ['objective', 'objectives'],
    summary: ['summary'],
    technology: ['technology', 'technologies'],
    experience: ['experience'],
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




function restoreTextByRows(rowNum:any, allRows: any) {
  rowNum = rowNum - 1;
  var rows = [];

  do {
    rows.push(allRows[rowNum]);
    rowNum++;
  } while (rowNum < allRows.length);

  return rows.join("\n");
}
function countWords(str: string) {
  return str.split(' ').length;
}
function parseDictionaryTitles(Resume:any, rows: string[], rowIdx: number) {
  var allTitles = _.flatten(_.toArray(dictionary.titles)).join('|'),
    searchExpression = '',
    row = cleanStr(rows[rowIdx]),
    ruleExpression,
    isRuleFound,
    result;
  console.log("allTitles: ", allTitles)

  _.forEach(dictionary.titles, function (expressions, key) {
    expressions = expressions || [];
    // means, that titled row is less than 5 words
    if (countWords(row) <= 15) {
      _.forEach(expressions, function (expression) {
        ruleExpression = new RegExp(expression);
        isRuleFound = ruleExpression.test(row);

        if (isRuleFound) {
          allTitles = _.without(allTitles.split('|'), key).join('|');
          searchExpression = '(?:' + expression + ')((.*\n)+?)(?:' + allTitles + '|{end})';
          // restore remaining text to search in relevant part of text
          result = new RegExp(searchExpression, 'gm').exec(restoreTextByRows(rowIdx, rows));

          if (result) {
            Resume[key] = result[1]
            console.log("result", result)
          }
        }
      });
    }
  });
}


function cleanStr(str: string) {
  return str.replace(/\r?\n|\r|\t|\n/g, ' ').trim();
}
function cleanTextByRows(data: string) {
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

function parseDictionaryRegular(data:string) {
  const output: any = {}
  var regularDictionary = dictionary.regular,
    find;

  _.forEach(regularDictionary, function (expressions, key: string) {
    _.forEach(expressions, function (expression) {
      find = new RegExp(expression).exec(data);
      if (find) {
        output[key.toLowerCase()] = find[0]
      }
    });
  });
  return output
}


export default async (req: any, res: any) => {

  const { text='', error, data, json } = await getDataFromCV();

  return res.json({ text, error, data, json });
};

const getDataFromCV = async (fileLocalPath = '/public/test.pdf') => {


  let dataBuffer = fs.readFileSync(fileLocalPath);
 



  const { text, error } = await new Promise(resolve => {

    pdf(dataBuffer).then(function(data) {
    
      // number of pages
      console.log(data.numpages);
      // number of rendered pages
      console.log(data.numrender);
      // PDF info
      console.log(data.info);
      // PDF metadata
      console.log(data.metadata); 
      // PDF.js version
      // check https://mozilla.github.io/pdf.js/getting_started/
      console.log(data.version);
      // PDF text
      console.log(data.text);
      resolve({ text: data.text, error:'' })
      
    })
    .catch(function(error){
        // handle exceptions
        resolve({ text:'', error })
    })

  })

  fs.unlinkSync(fileLocalPath);
  const data = cleanTextByRows(text.toLowerCase());

  const rows = text.toLowerCase().split("\n")
  const json = parseDictionaryRegular(data);
  const cleaned = cleanStr(data)
  const urls = getLinksFromText(cleaned)

  if ((urls || []).length > 0) json.urls = urls

  for (var i = 0; i < rows.length; i++) {

    parseDictionaryTitles(json, rows, i);

  }
  return { text, error, data, json }
}
export { getDataFromCV };
