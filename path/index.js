
const path = require("path");

// ---------------------- show path seperator -------------------------
//console.log(path.sep);

// ----------------------- show delemeter ----------------------------
//console.log(path.delimiter);

// ----------------- check computer environment -----------------------
//console.log(process.env.path);

// -------------- check where index.js file exists -------------------
const curentFilePath = __filename;
//console.log(curentFilePath);

// ----------------- if i want only directory name --------------------
//console.log(__dirname);

// ------------------------- find base path --------------------------
let basename = path.basename(curentFilePath);
//console.log(basename);

// ----------- if i want only filename without extension -------------
let basenameWithoutExt = path.basename(curentFilePath,'.js');
//console.log(basenameWithoutExt);

// ------------- if i wan known directory name of file ---------------
let Dirname = path.dirname(curentFilePath);
//console.log(Dirname);

// --------------------- check extension of file ---------------------
//console.log(path.extname(curentFilePath));

// --- if folder and file both difference then how to combine both ---
let pathToFile = path.format({
    dir:'\\public_html\\html\\home',
    base:'index.html'
});

//console.log(pathToFile);

// ----------------------- check absolute path ----------------------
// console.log(path.isAbsolute(curentFilePath));  //true
// console.log(path.isAbsolute('/index.js'));     //true
// console.log(path.isAbsolute('./index.js'));    //false
// console.log(path.isAbsolute('../index.js'));   //false

// -------- agar tukado multiple path ko combine karna ho to --------
let pathToDir = path.join('/home','js','dist','index.js');
//console.log(pathToDir);

// -------- agar hame file path ko break/split karna hai to ----------
// console.log(path.parse(curentFilePath));

// hamne jo upar print kiya usne hame object me ans provide kiya ab hame diye gaye object me se name print karana hai
let parsename = path.parse(curentFilePath);
//console.log(parsename.name);

// agar hame relative path nikalana ho ki yah kisi hierarchy me blong karta hai 
//console.log(path.relative('/home/user/config','/home/user/js'));

// ------- __dirname ke jaisa path.resolve() method bhi h -------------
console.log(__dirname);       // D:\IT\nodejs\pwskill-nodejs\path
console.log(path.resolve()); //  D:\IT\nodejs\pwskill-nodejs  yha ek difference h

// manlo agar path multiple '//'(slash) ho to use normalize kaise karenge ?
console.log(path.normalize('/home//user//js///index.js'));  // ans: \home\user\js\index.js

