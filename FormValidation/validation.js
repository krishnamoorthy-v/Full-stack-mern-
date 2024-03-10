

function validate(){
    event.preventDefault()
  
    let name = document.getElementById("name").value 
    let dob = document.getElementById("dob").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let male = document.getElementById("male").checked 
    let female = document.getElementById("female").checked 
    let degree = document.getElementById("degree").value

    
   

    if(checkName(name) == false)
    {
 
    const parse = document.createElement("p")
    parse.innerHTML = "Name field is required"

    document.getElementById("nameerr").appendChild(parse)
   
    }

    else if(checkDOB(dob) == false)
    {
        const parse = document.createElement("p")
        parse.innerHTML = "DOB field data is invallid"

        document.getElementById("doberr").appendChild(parse)
    }

    else if(gender(male, female) == false)
    {
        
        const parse = document.createElement("p")
        parse.innerHTML = "Gender field data is not selected"
    
        document.getElementById("gendererr").appendChild(parse)
       
    }
    else if(checkDegree(degree) == false)
    {
      
        const parse = document.createElement("p")
        parse.innerHTML = "Degree field option is not selected."

        document.getElementById("degeerr").appendChild(parse)
       
    }

    else if(checkEmail(email) == false)
    {
   
        const parse = document.createElement("p")
        parse.innerHTML = "Email field data is invalid"
  
        document.getElementById("emailerr").appendChild(parse)
       
    }
    else if(checkPassword(password) == false)
    {

        const parse = document.createElement("p")
        parse.innerHTML = "Password length must be greater than or equal to the 6."
   
        document.getElementById("passworderr").appendChild(parse)
       
    }
    
    return true
    
}







function empty(data){
    if (data.trim() == "")
        return true
}



function checkName(name) {
    if(empty(name))
        return false
    return true
}

function checkDOB(dob) {
    var curyear = new Date()
    
   
    if(dob == "")
        return false
    var dob = new Date(dob)
    if( (curyear.getFullYear() - dob.getFullYear()) <18)
        return false
    return true
}

function checkEmail(email)
{
    const emailregex = /^[a-zA-Z0-9^@]+@[a-zA-Z0-9^@]+\.[a-zA-Z0-9^@]{2,4}$/
    if(emailregex.test(email))
        return true
    return false
}

function checkPassword(password){
    
    if(password == "")
        return false

    else if(password.length <=6)
        return false
    else
        return true

}

function gender(male, female)
{
    if(male || female)
        return true
    else
        return false
}

function checkDegree(degree)
{
    if(degree == "option")
    {
        return false
    }
    return true
}





