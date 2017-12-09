
module.exports = function(str) {

var data = {}

// OFFICE SECTION
var re = /(.*OFFICE\s?)(.*)(\s?RESIDENCE.*)/;
var office_str = str.slice(0).replace(re, "$2");
console.log("OFFICE SECTION : " + office_str);

// RESIDENCE SECTION
var re = /(.*\s?RESIDENCE\s?)(.*)/;
var residence_str = str.slice(0).replace(re, "$2");
console.log("RESIDENCE SECTION : " + residence_str);

// Name
var re = /((.*Governing Council  2016-2017\s?)|(.*Directory of Members  2017\s?))(.*)(\s?OFFICE.*)/;
var newtext = str.slice(0).replace(re, "$4");
console.log("Name/Category : " + newtext);
data["name_category"] = newtext ? newtext : "-"

// Categories
var isACA = str.indexOf("ACA") != -1 ? true : false
var isFCA = str.indexOf("FCA") != -1 ? true : false
var isFMAAT = str.match(/[F]?(MAAT)/g).indexOf("FMAAT") != -1 ? true : false;
var isSAT = str.indexOf("SAT") != -1 ? true : false
var isMBA = str.indexOf("MBA") != -1 ? true : false
var isMAAT = str.match(/[F]?(MAAT)/g).indexOf("MAAT") != -1 ? true : false;
console.log("Categories: ")
console.log(`ACA : ${isACA}`)
console.log(`FCA : ${isFCA}`)
console.log(`FMAAT : ${isFMAAT}`)
console.log(`SAT : ${isSAT}`)
console.log(`MAAT : ${isMAAT}`)

// OFFICE flags
var isOfficeContent = office_str != "" ? true : false
var isOfficeTel = office_str.indexOf("Tel No:") != -1 ? true : false
var isOfficeFax = office_str.indexOf("Fax:") != -1 ? true : false
var isOfficeEmail = office_str.indexOf("E-Mail:") != -1 ? true : false

console.log(`isOfficeContent : ${isOfficeContent}`)
console.log(`isOfficeTel : ${isOfficeTel}`)
console.log(`isOfficeFax : ${isOfficeFax}`)
console.log(`isOfficeEmail : ${isOfficeEmail}`)

if (isOfficeContent) {

// OFFICE addr
var re = /(.*OFFICE\s?)(.*?)((\s?Tel No:.*)|(\s?Fax:.*)|(\s?E-Mail:.*)|(\s?RESIDENCE.*))/;
var newtext = str.slice(0).replace(re, "$2");
console.log("Office address : " + newtext);
data["office_addr"] = newtext ? newtext : "-"


// OFFICE tel
if (isOfficeTel) {
var re = /(.*Tel No:.\s?)(.*?)((\s?Fax:.*)|(\s?E-Mail:.*))/;
var newtext = office_str.slice(0).replace(re, "$2");
    console.log("Office Tel : " + newtext);
    data["office_tel"] = newtext ? newtext : "-"
} else {
    data["office_tel"] = "-"
}


// OFFICE fax
if (isOfficeFax) {
var re = /(.*Fax:.\s?)(.*?)(\s?E-Mail:.*)/;
var newtext = office_str.slice(0).replace(re, "$2");
console.log("Office Fax : " + newtext);
data["office_fax"] = newtext ? newtext : "-"
} else {
    data["office_fax"] = "-"
}


// OFFICE Email
if (isOfficeEmail) {
var re = /(.*E-Mail:.\s?)(.*?)/;
var newtext = office_str.slice(0).replace(re, "$2");
console.log("Office Email : " + newtext);
data["office_email"] = newtext ? newtext : "-"
} else {
    data["office_email"] = "-"
}

} else {

    data["office_addr"] = "-"
    data["office_fax"] = "-"
    data["office_tel"] = "-"
    data["office_email"] = "-"
}

// ===================================================

// Residence flags
var isResidenceContent = residence_str != "" ? true : false
var isResidenceTel = residence_str.indexOf("Tel No:") != -1 ? true : false
var isResidenceFax = residence_str.indexOf("Fax:") != -1 ? true : false
var isResidenceEmail = residence_str.indexOf("E-Mail:") != -1 ? true : false

console.log(`isResidenceContent : ${isResidenceContent}`)
console.log(`isResidenceTel : ${isResidenceTel}`)
console.log(`isResidenceFax : ${isResidenceFax}`)
console.log(`isResidenceEmail : ${isResidenceEmail}`)

// Residence addr
var re = /(.*RESIDENCE\s?)(.*?)((\s?Tel No:.*)|(\s?Fax:.*)|(\s?E-Mail:.*))/;
var newtext = str.slice(0).replace(re, "$2");
console.log("Residence address : " + newtext);
data["residence_addr"] = newtext ? newtext : "-"


if (isResidenceContent){

// Residence tel
if (isResidenceTel) {
var re = /(.*Tel No:.\s?)(.*?)((\s?Fax:.*)|(\s?E-Mail:.*))?/;
var newtext = residence_str.slice(0).replace(re, "$2");
console.log("Residence Tel : " + newtext);
    data["residence_tel"] = newtext ? newtext : "-"
} else {
    data["residence_tel"] = "-"
}

// Residence Email
if (isResidenceEmail) {
var re = /(.*E-Mail:.\s?)(.*?)/;
var newtext = residence_str.slice(0).replace(re, "$2");
console.log("Residence Email : " + newtext);
    data["residence_email"] = newtext ? newtext : "-"
} else {
    data["residence_email"] = "-"
}

} else {   
    data["residence_addr"] = "-"
    data["residence_tel"] = "-"
    data["residence_email"] = "-"
}


console.log(data)

return {
    isACA: () => {
        return isACA
    }, 
    isFCA: () => {
        return isFCA
    }, 
    isFMAAT: () => {
        return isFMAAT
    },
    isMAAT: () => {
        return isMAAT
    },
    isSAT: () => {
        return isSAT
    },
    isMBA: () => {
        return isMBA
    },
    getData:() => {
        return data
    }
}
}