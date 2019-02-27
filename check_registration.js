//If any error is found in the entries then proper error is returned else a "Successful" string is returned
function check_reg(name, regno, email, password)
{
    var msg = "";
    console.log(name + "\n");
    console.log(regno + "\n");
    console.log(password + "\n");
    // Checking if any entry is null 
    if(name === " " || regno === " " || email === " " || password === " ")
    {
        msg = "Fields Cannot Be Empyty";
        return msg;
    }
    // Checkign the name if any digits or special characters are present(they are not allowed)
    if(/^[A-Za-z]+$/.test(name) === false)
    {
        msg = "Name should contain only letters";
        return msg;
    }
/*
    if(regno.length != 9)
    {
        msg = "Regsitration number is not of correct format eg.15MIS1104";
        return msg;
    }
*/
    // Email validation
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(re.test(email) === false)
    {
        msg = "Invalid Email ID";
        console.log(email);
        return msg;
    }
    /*
    if(password.length < 8)
    {
        msg = "Password length must be greater that 7";
        return msg;
    }
    */
    return "Successful";
}
module.exports.check_registration = check_reg;