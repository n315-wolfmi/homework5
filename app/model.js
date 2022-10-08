var loginData = {}
export var testLoginData = {
    "email": "matt@gmail.com",
    "password":"1234"
}
export var loginStatus = 1

export function currentPage(pageID, callback, callback2, callback3) {
    //display home page  
    if(pageID == "" || pageID == "home") {
        $.get(`pages/home.html`, function(data) {
            $("#app").html(data) 
        })
    } else if(pageID == "account") { //account login page
        $.get(`pages/account.html`, function(data) {
            $("#app").html(data) 
            callback()
            callback2()
            callback3()
        })  
    } else if(pageID == "blogintro") { //blog page
        $.get(`pages/blogintro.html`, function(data) {
            $("#app").html(data) 
            callback()
        })
    } else {
        $.get(`pages/${pageID}.html`, function(data) {
            $("#app").html(data) 
        })
    }
} 

export function setLoginData(userObject) {
    loginData = userObject
    console.log(loginData)
}

export function setLoginStatus(status) {
    loginStatus = status
    console.log(loginStatus)
}