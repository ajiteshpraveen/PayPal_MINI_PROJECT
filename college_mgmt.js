//for express.js
var express = require("Express");
//file and functions for checking wheteher the entries in the form are of correct format
var c_r = require("./check_registration");
// file for updating registration form entries in excel sheet
var e_s_f = require("./excel_sheet_functions");
var app = express();

//get the current logged in user name and register number
var current_user_name = "";
var current_user_regno = "";
var flag_logged_in = false;

//login details of user and their passwords
var login_details = [{Registration_Number : "15MIS1104", Password : "Pranshugupta56"}, 
{Registration_Number : "15MIS1107", Password : "Mansij56"},
{Registration_Number : "15MIS1031", Password : "Amit89"},
{Registration_Number : "15MIS1085", Password : "Abhiraj45"},
{Registration_Number : "15MIS1111", Password : "User11111"},
{Registration_Number : "15MIS2222", Password : "User222222"}];

//Details of course names and students registered under them
var student_courses = [{course_name : "BigData", Students : "15MIS1104,15MIS1107,15MIS1031"},
{course_name : "WebTechnology", Students : "15MIS1104,15MIS1107"},
{course_name : "DataMining", Students : "15MIS2222,15MIS1107,15MIS1031"},
{course_name : "MachineLearning", Students : "15MIS1111,15MIS1085,15MIS1104"},
{course_name : "CyberSecurity", Students : "15MIS1104,15MIS1107,15MIS1031"},
{course_name : "DeepLearning", Students : "15MIS1111,15MIS1085,15MIS1031"}];

//Details of the students registered
var registration_details = [{Name : "AjiteshPraveen", Registration_Number : "15MIS1104", Email : "ajipra1996@gmail.com", Password : "Pranshugupta56"},
{Name : "MansijTrivedi", Registration_Number : "15MIS1107", Email : "mansij1996@gmail.com", Password : "Mansij56"},
{Name : "AmitJangir", Registration_Number : "15MIS1031", Email : "amit1996@gmail.com", Password : "Amit89"},
{Name : "AbhirajKumar", Registration_Number : "15MIS1085", Email : "abhiraj1996@gmail.com", Password : "Abhiraj45"},
{Name : "User1", Registration_Number : "15MIS1111", Email : "user11996@gmail.com", Password : "User11111"},
{Name : "User2", Registration_Number : "15MIS2222", Email : "user21996@gmail.com", Password : "User222222"}];

//Setting up a psuedo date
var dt = new Date("December 30, 2018 11:20:25");

//Details of courses along with their starting and ending dates
var courses = [{course_name : "BigData", StartDate : dt.setDate( dt.getDate() - 10 ), EndDate : dt.setDate( dt.getDate() + 30 )},
{course_name : "WebTechnology", StartDate : dt.setDate( dt.getDate() + 10 ), EndDate : dt.setDate( dt.getDate() + 40 )},
{course_name : "DataMining", StartDate : dt.setDate( dt.getDate() + 12 ), EndDate : dt.setDate( dt.getDate() + 50 )},
{course_name : "MachineLearning", StartDate : dt.setDate( dt.getDate() + 12 ), EndDate : dt.setDate( dt.getDate() + 50 )},
{course_name : "CyberSecurity", StartDate : dt.setDate( dt.getDate() + 30 ), EndDate : dt.setDate( dt.getDate() + 70 )},
{course_name : "DeepLearning", StartDate : dt.setDate( dt.getDate() + 30 ), EndDate : dt.setDate( dt.getDate() + 70 )}];

app.set('views', './views');
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true}));

//opening registration form
app.get("/register_button", function(req, res){
    res.render("register");
});

//getting values of the registration form and updating them
app.post("/registration_form", function(req, res){
    console.log(req.body.name);
    console.log(req.body.registration_no);
    console.log(req.body.email_id);
    console.log(req.body.password);
    //getting the result of the entries if "Successful" all the entries were correct else appropriate result to be shown back to  the user 
    var result = c_r.check_registration(req.body.name, req.body.registration_no, req.body.email_id, req.body.password);
    if(result === "Successful"){
        console.log("Regsitration form elements are OK");
        if(e_s_f.check_if_user_exists(login_details, req.body.registration_no) == "User Present")
        {
            res.render("register", {message: "You are already registered go to login page"});
        }
        else{
            registration_details.push({Name : req.body.name, Registration_Number : req.body.registration_no, Email : req.body.email_id, Password : req.body.password});
            login_details.push({Registration_Number : req.body.registration_no, Password : req.body.password});
            //console.log("Data has been added to registration details");
            //console.log("The updated reg array is");
            //console.log(registration_details);
        }
    }
    else{
        res.render("register", {message: result});
    }
});

// The first page of the system
app.get("/cllg_mgmt", function(req, res){
    if(flag_logged_in === false)
    {res.render("index");
}
});

//Getting the values of the login form and checking if the user if valid or not
app.post("/login", function(req, res){
    var na = (req.body.name1).trim();
    var regno = (req.body.name).trim();
    var password = (req.body.pass).trim();
    var r = e_s_f.checking_login(login_details, regno, password);
    //console.log(r);
    if(r == "Success")
    {
        flag_logged_in = true;
        current_user_name = na;
        current_user_regno = regno;
        if(flag_logged_in){
            res.render("home", {name: current_user_name, rno: current_user_regno});
        }
        else{
            ren.render("index");
        }
        
    }
    else{
        res.render("index", {message: "Email ID or password is incorrect"});
    }
});

app.post("/signout", function(req, res){
    flag = false;
    res.render("index");
});


//Displaying all the courses
app.post("/all_courses", function(req, res){
    
    var to_send_table = "<html><body><center><table border = '1'><tr><th>Course Name</th><th>Start date</th><th>End Date</th>";
    courses.forEach(function(item){
        var cn = item.course_name;
        var s = new Date(item.StartDate);
        var e = new Date(item.EndDate);
        to_send_table = to_send_table + "<tr><td>" + cn + "</td><td>" + s + "</td><td>" + e + "</td><td><form action = '/enroll_course/:" + cn + "' method = 'post'><button type = 'submit'>ENROLL</button></form></td></tr>"; 
    })
    to_send_table = to_send_table + "</tr></table></center></body></html>";
    res.send(to_send_table);
});

//Enrolling the course
app.post('/enroll_course/:foo', function(req, res){
    //Getting current time
    var time = new Date();
    //getting parameters passed on by the url
    var a = req.params;
    var c = a.foo;
    var count = 0;
    //iterating through courses to check the date
    courses.forEach(function(item){
        var temp = ":" + item.course_name;
        if(c.toString() === temp.toString()){
            var st = new Date(item.StartDate);
            // checking if the course has already started or not
            if(time < st)
            {
                student_courses.forEach(function(element){
                    var temp1 = ":" + element.course_name;
                    if(temp1.toString() === c){
                        var str = (element.Students).toString();
                        str = str + "," + current_user_regno;
                        //adding the users regno to the course 
                        element.Students = str;
                        count++;
                        console.log("Course Added" + element.course_name);
                    }
                })
            }
        }
    })
    //checking if nay ammendments have been made if yes then __>
    if(count > 0)
    {
        res.render("message", {msg : "YOU ARE ENROLLED"});
    }
    else{
        res.render("message", {msg : "Sorry this course has already started"});
    }
});

//Displaying all the ongoing courses
app.post('/ongoing_courses', function(req, res){
    //creating the table that has to be passed
    var msg = "<html><body><center><h1>ONGOING COURSES</h1><br><br><table border = '1'><tr><th>Ongoing Courses</th>";
    var time = new Date();
    var count = 0;
    //console.log("Current User : " + current_user_regno);
    //console.log("Current time : " + time);

    //temporary array to store all the courses that the user has enrolled in
    var courses_in = [];
    for(var i = 0; i<student_courses.length; i++){
        var str = student_courses[i].Students;
        var s = str.toString().trim().split(",");
        for(var j = 0; j<s.length; j++)
        {
            if(s[j].toString() === current_user_regno.toString()){
                courses_in.push(student_courses[i].course_name.toString());
                break;
            }
        }
    }
    //Displaying the ongoing courses on the basis of present time ---- course start date ----- course end date
    //console.log("The courses user is registred in : " + courses_in);
    for(var i = 0; i<courses_in.length; i++){
        for(var j = 0; j<courses.length; j++){
            if(courses_in[i] === courses[j].course_name.toString()){
                //console.log("Course Found");
                var st = new Date(courses[j].StartDate);
                var et = new Date(courses[j].EndDate);
                //console.log("Start Date : " + st);
                //console.log("End date + " + et);
                if(time >= st && time < et){
                    //console.log("date validated");
                    count++;
                    msg = msg + "<tr><td>" + courses_in[i] + "</td></tr>";
                }
            }
        }
    }
    //checking if any courses available to show if there are show the table else say sorry 
    msg = msg + "</tr></table></center></body></html>";
    if(count > 0){
        res.send(msg);
    }
    else{
        res.send("<html><body><center><h1>YOU DONOT HAVE ANY ONGOING COURSES</h1></center></body></html>");
    }
    
});


//Displaying the completed courses same comcept as ongoing courses 
app.post('/completed_courses', function(req, res){
    var msg = "<html><body><center><h1>COMPLETED COURSES</h1><br><br><table border = '1'><tr><th>Completed Courses</th>";
    var time = new Date();
    var count = 0;
    //console.log("Current User : " + current_user_regno);
    //console.log("Current time : " + time);
    //populating a temp array to store the registered coureses
    var courses_in = [];
    for(var i = 0; i<student_courses.length; i++){
        var str = student_courses[i].Students;
        var s = str.toString().trim().split(",");
        for(var j = 0; j<s.length; j++)
        {
            if(s[j].toString() === current_user_regno.toString()){
                courses_in.push(student_courses[i].course_name.toString());
                break;
            }
        }
    }

    //Displaying completed ones
    //console.log("The courses user is registred in : " + courses_in);
    for(var i = 0; i<courses_in.length; i++){
        for(var j = 0; j<courses.length; j++){
            if(courses_in[i] === courses[j].course_name.toString()){
                //console.log("Course Found");
                var st = new Date(courses[j].StartDate);
                var et = new Date(courses[j].EndDate);
                //console.log("Start Date : " + st);
                //console.log("End date + " + et);
                if(time >= st && time >= et){
                    //console.log("date validated");
                    msg = msg + "<tr><td>" + courses_in[i] + "</td></tr>";
                    count++;
                }
            }
        }
    }
    msg = msg + "</tr></table></center></body></html>";
    if(count > 0){
        res.send(msg);
    }
    else{
        res.send("<html><body><center><h1>SORRY YOU HAVE NOT COMPLETED ANY COURSES</h1></center></body></html>");
    }
    
});

app.listen(3000);