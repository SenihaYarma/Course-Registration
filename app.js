const express = require("express");
const app = express();
const url = require('url');

var MongoClient = require('mongodb').MongoClient;
var urll = "mongodb+srv://seniha:seniha@cluster0.ovdtj.mongodb.net/<dbname>?retryWrites=true&w=majority";
app.get("/", (req, res) => {
    MongoClient.connect(urll, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("hw");
        res.writeHead(200, { "Content-Type": "text/html" });
        let query = url.parse(req.url, true).query;

        let search = query.search ? query.search : "";
        let filter = query.filter ? query.filter : "";  
    
        let html = '<!DOCTYPE html> <html lang="en"> <head> <title> Spring 2021 CSE Class Find </title></head><body><h1> Spring 2021 CSE Class Find </h1><br><form method="get" action ="/"><input type="text" name="search" value=""><b>in</b><select name="filter"><option value="allFields">All Fields</option><option value="courseName">Course Title</option><option value="courseNum">Course Num</option><option value="instructor">Instructor</option><option value="day">Day</option><option value="time">Time</option></select><input type="submit" values="Submit"><br> Example searches: 316, fodor, 2:30 PM, MW</form><br></br>';
        console.log(search);
        if (filter == ""){
            dbo.collection("Courses").find().toArray(function(err, result) {
                if(err) throw err;
                for (let item of result) {
                    html += "<button type='button' class='toggle'> CSE " + item.CRS + ' - ' + item.Title + ' - ' + item.Cmp + ' - Section ' + item.Sctn + '</button><pre>Days: ' + item.Days + '<br></br>Start Time: ' + item.StartTime + '<br></br>End Time:  ' + item.EndTime + '<br></br>Duration:  ' + item.Duration + '<br></br>Instruction Mode:  ' + item.InstructionMode + '<br></br>Building:  ' + item.Building + '<br></br>Room:  ' + item.Room + '<br></br>Instructor:  ' + item.Instr + '<br></br>Enrollment Cap:  ' + item.EnrlCap + '<br></br>Wait Cap:  ' + item.WaitCap + '<br></br>Combined Description:  ' + item.CmbndDescr + '<br></br>Combined Enrollment Cap:  ' + item.CmbndEnrlCap + '<form action="/schedule" method="get"><button name="add" value="' + item.Id + '"> Add Class </button></form> </pre>';
                }
                res.write(html + "\n\n</body>\n</html>");
                res.end();
                //db.close();
            });
        }
        else if (filter == "allFields"){
            var searchQuery= {$regex: search, $options: 'i'};
            dbo.collection("Courses").find({$or: [{CRS: searchQuery}, {Title: searchQuery}, {Instr: searchQuery},  {Days: searchQuery}, {StartTime: searchQuery},  {EndTime: searchQuery},  {Duration: searchQuery},  {InstructionMode: searchQuery},  {Building: searchQuery},  {Room: searchQuery},  {Instr: searchQuery},  {EnrlCap: searchQuery},  {WaitCap: searchQuery},  {CmbndDescr: searchQuery},  {CmbndEnrlCap: searchQuery}]}).toArray(function(err, result) {
                if(err) throw err;
                for (let item of result) {
                    html += "<button type='button' class='toggle'> CSE " + item.CRS + ' - ' + item.Title + ' - ' + item.Cmp + ' - Section ' + item.Sctn + '</button><pre>Days: ' + item.Days + '<br></br>Start Time: ' + item.StartTime + '<br></br>End Time:  ' + item.EndTime + '<br></br>Duration:  ' + item.Duration + '<br></br>Instruction Mode:  ' + item.InstructionMode + '<br></br>Building:  ' + item.Building + '<br></br>Room:  ' + item.Room + '<br></br>Instructor:  ' + item.Instr + '<br></br>Enrollment Cap:  ' + item.EnrlCap + '<br></br>Wait Cap:  ' + item.WaitCap + '<br></br>Combined Description:  ' + item.CmbndDescr + '<br></br>Combined Enrollment Cap:  ' + item.CmbndEnrlCap + '<form action="/schedule" method="get"><button name="add" value="' + item.Id + '"> Add Class </button></form> </pre>';
                }
                res.write(html + "\n\n</body>\n</html>");
                db.close();
                res.end();
            });
        }
        else if (filter == "courseNum"){
            var searchQuery= {$regex: search, $options: 'i'};
            dbo.collection("Courses").find({CRS: searchQuery}).toArray(function(err, result) {
                if(err) throw err;
                for (let item of result) {
                    html += "<button type='button' class='toggle'> CSE " + item.CRS + ' - ' + item.Title + ' - ' + item.Cmp + ' - Section ' + item.Sctn + '</button><pre>Days: ' + item.Days + '<br></br>Start Time: ' + item.StartTime + '<br></br>End Time:  ' + item.EndTime + '<br></br>Duration:  ' + item.Duration + '<br></br>Instruction Mode:  ' + item.InstructionMode + '<br></br>Building:  ' + item.Building + '<br></br>Room:  ' + item.Room + '<br></br>Instructor:  ' + item.Instr + '<br></br>Enrollment Cap:  ' + item.EnrlCap + '<br></br>Wait Cap:  ' + item.WaitCap + '<br></br>Combined Description:  ' + item.CmbndDescr + '<br></br>Combined Enrollment Cap:  ' + item.CmbndEnrlCap + '<form action="/schedule" method="get"><button name="add" value="' + item.Id + '"> Add Class </button></form> </pre>';
                }
                res.write(html + "\n\n</body>\n</html>");
                db.close();
                res.end();
            });
        }
        else if (filter == "courseName"){
            var searchQuery= {$regex: search, $options: 'i'};
            dbo.collection("Courses").find({Title: searchQuery}).toArray(function(err, result) {
                if(err) throw err;
                for (let item of result) {
                    html += "<button type='button' class='toggle'> CSE " + item.CRS + ' - ' + item.Title + ' - ' + item.Cmp + ' - Section ' + item.Sctn + '</button><pre>Days: ' + item.Days + '<br></br>Start Time: ' + item.StartTime + '<br></br>End Time:  ' + item.EndTime + '<br></br>Duration:  ' + item.Duration + '<br></br>Instruction Mode:  ' + item.InstructionMode + '<br></br>Building:  ' + item.Building + '<br></br>Room:  ' + item.Room + '<br></br>Instructor:  ' + item.Instr + '<br></br>Enrollment Cap:  ' + item.EnrlCap + '<br></br>Wait Cap:  ' + item.WaitCap + '<br></br>Combined Description:  ' + item.CmbndDescr + '<br></br>Combined Enrollment Cap:  ' + item.CmbndEnrlCap + '<form action="/schedule" method="get"><button name="add" value="' + item.Id + '"> Add Class </button></form> </pre>';
                }
                res.write(html + "\n\n</body>\n</html>");
                db.close();
                res.end();
            });
        }
        else if (filter == "instructor"){
            var searchQuery= {$regex: search, $options: 'i'};
            dbo.collection("Courses").find({Instr: searchQuery}).toArray(function(err, result) {
                if(err) throw err;
                for (let item of result) {
                    html += "<button type='button' class='toggle'> CSE " + item.CRS + ' - ' + item.Title + ' - ' + item.Cmp + ' - Section ' + item.Sctn + '</button><pre>Days: ' + item.Days + '<br></br>Start Time: ' + item.StartTime + '<br></br>End Time:  ' + item.EndTime + '<br></br>Duration:  ' + item.Duration + '<br></br>Instruction Mode:  ' + item.InstructionMode + '<br></br>Building:  ' + item.Building + '<br></br>Room:  ' + item.Room + '<br></br>Instructor:  ' + item.Instr + '<br></br>Enrollment Cap:  ' + item.EnrlCap + '<br></br>Wait Cap:  ' + item.WaitCap + '<br></br>Combined Description:  ' + item.CmbndDescr + '<br></br>Combined Enrollment Cap:  ' + item.CmbndEnrlCap + '<form action="/schedule" method="get"><button name="add" value="' + item.Id+ '"> Add Class </button></form> </pre>';
                }
                res.write(html + "\n\n</body>\n</html>");
                db.close();
                res.end();
            });
        }
        else if (filter == "day"){
            var searchQuery= {$regex: search, $options: 'i'};
            dbo.collection("Courses").find({Days: searchQuery}).toArray(function(err, result) {
                if(err) throw err;
                for (let item of result) {
                    html += "<button type='button' class='toggle'> CSE " + item.CRS + ' - ' + item.Title + ' - ' + item.Cmp + ' - Section ' + item.Sctn + '</button><pre>Days: ' + item.Days + '<br></br>Start Time: ' + item.StartTime + '<br></br>End Time:  ' + item.EndTime + '<br></br>Duration:  ' + item.Duration + '<br></br>Instruction Mode:  ' + item.InstructionMode + '<br></br>Building:  ' + item.Building + '<br></br>Room:  ' + item.Room + '<br></br>Instructor:  ' + item.Instr + '<br></br>Enrollment Cap:  ' + item.EnrlCap + '<br></br>Wait Cap:  ' + item.WaitCap + '<br></br>Combined Description:  ' + item.CmbndDescr + '<br></br>Combined Enrollment Cap:  ' + item.CmbndEnrlCap + '<form action="/schedule" method="get"><button name="add" value="' + item.Id + '"> Add Class </button></form> </pre>';
                }
                res.write(html + "\n\n</body>\n</html>");
                db.close();
                res.end();
            });
        }
        else if (filter == "time"){
            var searchQuery= {$regex: search, $options: 'i'};
            dbo.collection("Courses").find({$or: [{StartTime: searchQuery} , {EndTime: searchQuery}]}).toArray(function(err, result) {
                if(err) throw err;
                for (let item of result) {
                    html += "<button type='button' class='toggle'> CSE " + item.CRS + ' - ' + item.Title + ' - ' + item.Cmp + ' - Section ' + item.Sctn + '</button><pre>Days: ' + item.Days + '<br></br>Start Time: ' + item.StartTime + '<br></br>End Time:  ' + item.EndTime + '<br></br>Duration:  ' + item.Duration + '<br></br>Instruction Mode:  ' + item.InstructionMode + '<br></br>Building:  ' + item.Building + '<br></br>Room:  ' + item.Room + '<br></br>Instructor:  ' + item.Instr + '<br></br>Enrollment Cap:  ' + item.EnrlCap + '<br></br>Wait Cap:  ' + item.WaitCap + '<br></br>Combined Description:  ' + item.CmbndDescr + '<br></br>Combined Enrollment Cap:  ' + item.CmbndEnrlCap + '<form action="/schedule" method="get"><button name="add" value="' + item.Id + '"> Add Class </button></form> </pre>';
                }
                res.write(html + "\n\n</body>\n</html>");
                db.close();
                res.end();
            });
        };
    });
});


app.get("/schedule", (req, res) => {
    MongoClient.connect(urll, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("hw");
    let query = url.parse(req.url, true).query;
    var Query = { Id: query.add };
    let html = ' <!DOCTYPE html> <html><head><title>Schedule  </title><style type = text/css> table, tr, th, td { border: 1px solid black;height: 50px;vertical-align: bottom;padding: 15px;text-align: left;}</style></head><body><h1> Schedule </h1><br><a href="/"><b>Return to Search</b></a><br></br><table><tr><th> Mon </th><th> Tue </th><th> Wed </th><th> Thu </th><th> Fri </th></tr><tr><td> Mon </td><td> Tue </td><td> Wed </td><td> Thu </td><td> Fri </td></tr></table></body>   </html>';

    dbo.collection("Courses").find(Query).toArray(function(err, result) {
        if(err) throw err;
        for (let item of result) {
            var doc = { 
                _id: item._id,
                Id: item.Id,
                Subj: item.Subj,
                CRS: item.CRS,
                Title: item.Title,
                Cmp: item.Cmp,
                Sctn: item.Sctn,
                Days: item.Days,
                StartTime: item.StartTime,
                EndTime: item.EndTime,
                MtgStartDate: item.MtgStartDate,
                MtgEndDate: item.MtgEndDate,
                Duration: item.Duration,
                InstructionMode: item.InstructionMode,
                Building: item.Building,
                Room: item.Room,
                Instr: item.Instr,
                EnrlCap: item.EnrlCap,
                WaitCap: item.WaitCap,
                CmbndDescr: item.CmbndDescr,
                CmbndEnrlCap: item.CmbndEnrlCap
            };
        }
        dbo.collection("Schdl").insertOne(doc, function(err) {if(err) throw err; console.log("inserted")});
    });
    
        var searchQuery= {$regex: "M", $options: 'i'};
        dbo.collection("Schdl").find({Days: searchQuery}).sort({ StartTime : -1 }).toArray(function(err, result) {
            if (err) throw err;
            html = html.replace('<td> Mon </td>', getDay(result, "MON"));
        var searchQuery= {$regex: "TU", $options: 'i'};
        dbo.collection("Schdl").find({Days: searchQuery}).toArray(function(err, result) {
            if (err) throw err;
            html = html.replace('<td> Tue </td>', getDay(result, "TUE"));
        var searchQuery= {$regex: "W", $options: 'i'};
        dbo.collection("Schdl").find({Days: searchQuery}).toArray(function(err, result) {
            if (err) throw err;
            html = html.replace('<td> Wed </td>', getDay(result, "WED"));
        var searchQuery= {$regex: "TH", $options: 'i'};
        dbo.collection("Schdl").find({Days: searchQuery}).toArray(function(err, result) {
            if (err) throw err;
            html = html.replace('<td> Thu </td>', getDay(result, "THU"));
        var searchQuery= {$regex: "F", $options: 'i'};
        dbo.collection("Schdl").find({Days: searchQuery}).toArray(function(err, result) {
            if (err) throw err;
            html = html.replace('<td> Fri </td>', getDay(result, "FRI"));
        res.write(html);
        res.end();
        });
    });
});
});
});
});


//db.close();
});

port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server started!");
});

function getDay(SQLResult, tableHeader) {
    let retStr = "<td>";
    for (let item of SQLResult) {
        retStr += "\n   <br> " + item.StartTime + " - " +
                                item.EndTime + " <br><br>" +
                                item.Subj + " " +
                                item.CRS + "-" +
                                item.Sctn + " </b> <p>" +
                                item.Title + " <br><br>" +
                                item.Instr + " <br><br>" +
                                "<br/><br/>";
    }
    return retStr + "</td>";
}