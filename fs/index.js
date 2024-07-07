
let fs = require('fs');
//console.log(fs); // fs hame kitne object provide karata h vah check karne ke liye 

// ---------------------------- Asynchronous way to read file -----------------------------------
// fs.readFile('input.txt',function(err,data){
//     if(err){
//         console.log('Error :',err);
//         return err;
//     }
//    // console.log("Data :",data);  // buffer data
//    console.log("Data :",data.toString());
//    console.log("READ END");
//    console.log("Data :",data.length); // count length
//    return data;
// });
// console.log("other stuff"); // ye output sabse pahle aayega eske bad Asynchronous ka output aayega.


// ---------------------------- Synchronous way to read file -----------------------------------

// let data = fs.readFileSync('input.txt');
// console.log("Data :",data.toString());
// console.log("READ END");
// console.log("other stuff");

// ---------------------------- Read file with open + read ------------------------------------

// const buf = new Buffer(1024);
// console.log(buf.length);
// fs.open('input.txt','r+', function(err,fd){
    //     if (err) {
        //         console.log('Error in opening file : ',err);
        //     }
        //     console.log("File open successfully !");
        
        //     fs.read(fd,buf,0,buf.length,0,function(er,bytes){
            //         if(er){
                //             console.log('Error in Reading File');
                //         }
                //         //console.log('Data :',bytes);
                //         console.log('Data :',buf.slice(0,bytes).toString());
                //     });
                // });

// --------------------------------- Writing to a file --------------------------------------

// fs.writeFile('input2.txt','pw skills',function(err){
//     if(err){
//         console.log('error in writen file !');
//     }else{
//         console.log('successfully writen in file !');
//     }
// })

// yha agar file nhi bani h to new file create kar dega nhi to existing file me jo data h use remove kar ke new data ko writen kar dega

// --------------------------------- appending to a file --------------------------------------

//yha existing file ka data remove nhi hoga yha data append hoga 

// fs.appendFile('input2.txt',' -- ashutosh ','utf8',function(err){
    //     if(err){
        //         console.log('error in appending file !');
        //     }else{
            //         console.log('successfully appending file');
            //     }
            // });
            
            
// ------------------------ open + read file with close file  ---------------------------------

// const buf = new Buffer(1024);
// fs.open('text.txt','r+',function(err,fd){
    
//     if(err){
    //         console.log("error in opening file : ", err);
    //     }
    
    //     console.log("file opening sucessfully");
    
    //     fs.read(fd,buf,0,buf.length,0,function(er,bytes){
        
    //         if(er){
        //             console.log('error in reading file : ');
        //         }
        //         console.log('data : ',buf.slice(0,bytes).toString());
        //     });
        
        //     fs.close(fd,function(err){
            
        //         if(err){
            //             console.log('error in closing file');
            //         }else{
                //             console.log('successfully close file !');
                //         }
                //     });
                // });
                
// ---------------------------------- deleting file  --------------------------------------------

fs.unlink('del.txt',function(err){
    
    if(err){
        console.log('Error in unlink file : ',err);
    }else{
        console.log('File deleted successfully !');
    }
})