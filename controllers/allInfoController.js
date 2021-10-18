const Student = require('../models/student');
const Company = require('../models/company');
const objectToCSV = require('objects-to-csv');
const fs = require('fs');

module.exports.fetchInfo = (req,res)=>{
    Student.find({})
    .populate({
        path:'interviews',
        populate:{
            path:'compony'
        }
    })
    .exec((err,student)=>{
        res.render('allInfo',{students:student});
    })
}
// const obj = {
//     name:student.name,
//     email:student.email,
//     batch:student.batch,
// }
// const finalObject =

module.exports.download = (req,res)=>{
    Student.find({})
    .populate({
        path:'interviews',
        populate:{
            path:'compony'
        }
    })
    .exec(async (err,student)=>{
        const finalObject = []
        for(std of student){
            const obj = {
                name:std.name,
                email:std.email,
                batch:std.batch,
            };
            let c = 'compony';
            let count = 1;
            // console.log(std)
            for(int of std.interviews){
                obj[c+count] = int.compony.name;
                obj[c+count+'result'] = int.result
                // console.log(int);
                count++;
            }
            finalObject.push(obj);
        }
        const csv = new objectToCSV(finalObject);
        await csv.toDisk('./test.csv');
        console.log(await csv.toString());
        console.log(finalObject);
        return res.download('./test.csv',()=>{
            fs.unlinkSync('./test.csv');
        });
        // res.redirect('back');
    })
}


