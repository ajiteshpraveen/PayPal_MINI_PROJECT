//checking if the data is present already if not then update_ data function is executed
function checking_data(login_details, regno)
{ 
    msg1 = "User Present";
    msg2 = "User Not Present";
    var flag = false;
    login_details.forEach(function(item){
        if(item.Registration_Number === regno)
        {
            flag = true;
        }
    })
    if(flag){
        return msg1;
    }
    else{
        return msg2;
    }
}

function check_login(login_details, reg_no, password)
{
    // the flag variable is by default flase if the user exists flag= true and rendered to the main page
    // else the proper message is rendered back to the user
    var flag = false;  
    var msg1 = "Success";
    var msg2 = "NO";
    console.log("E N : " + reg_no + " " + "E p : " + " "  + password + " " + "E_n lenght: " + reg_no.length + " " + "E_p length: " + password.length);
    login_details.forEach(function(item){
        //console.log("Reg : " + item.Registration_Number + " " + "Pass : " + item.Password + "");
        //console.log(item.Registration_Number.length + " " + item.Password.length);
        if(item.Registration_Number.toString().trim() === reg_no.toString().trim() && item.Password.toString().trim() === password.toString().trim()){
            flag = true;;
        }
    })
    if(flag)
    {
        return msg1;
    }
    else{
        return msg2;
    }
    
}

module.exports.checking_login = check_login;
module.exports.check_if_user_exists = checking_data;