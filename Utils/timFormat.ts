const DateString=(time: string)=>{
  
  var options:Intl.DateTimeFormatOptions = {  year: 'numeric', month: 'long'};
var today  = new Date(time);
 

return today.toLocaleDateString("en-US", options)
}
export {DateString}