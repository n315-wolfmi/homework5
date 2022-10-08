import * as MODEL from "./model.js"

//routing page content
function route() {
    let hashtagLink = window.location.hash //get page from hashtag in url 
    let pageID = hashtagLink.replace("#", "")

    //if there is nothing in the URL, default to the home page, otherwise pass the hash page in
    if(pageID == "" || pageID == "home") {
        MODEL.currentPage("home")
    } else if (pageID == "account") {
        MODEL.currentPage(pageID, signupListener, signInListener, signOutListener)
    } else if(pageID == "blogintro") {
        MODEL.currentPage(pageID, loginAlertListener)
    } else {
        MODEL.currentPage(pageID)
    }
}

function signupListener() {
    $("#signBtn").on("click", function(e) {
        //store values
        let fn = $("#fName").val()
        let ln = $("#lName").val()
        let em = $("#email").val()
        let pw = $("#pass").val()
        let valArray = [fn, ln, em, pw]

        //check for too long of an input
        for(let i=0; i<4; i++) {
            if(valArray[i].length > 15) {
                console.log(valArray[i].length)
                console.log(valArray[i])
                alert(valArray[i] + " is too long, must be under 15 characters.")
                return
            }
        }
        
        if(fn == "") {
            alert("Enter First Name")
        } else if(ln == "") {
            alert("Enter Last Name")
        } else if(em == "") {
            alert("Enter Email")
        } else if(pw == "") {
            alert("Enter Password")
        } else {
            //create object
            let userObj = {
                firstName: fn,
                lastName: ln,
                email: em,
                password: pw,
            }

            //send JSON object
            MODEL.setLoginData(userObj) 
            MODEL.setLoginStatus(2)

            //clear input fields
            $("#fName").val("")
            $("#lName").val("")
            $("#email").val("")
            $("#pass").val("")

            //confirm to user that they are logged in
            $("#myAccount p").html("Logged In")
            $("#myAccount p").css("color", "#45af3b")
            $("#myAccount p").css("font-weight", "bold")
        }
    })
}

function signInListener() {
    $("#logBtn").on("click", function(e) {
        //store values
        let logem = $("#logEM").val()
        let logpw = $("#logPW").val()
        
        if(logem == "") {
            alert("Enter Email")
        } else if(logpw == "") {
            alert("Enter Password")
        } if(logem != MODEL.testLoginData.email) {
            alert("Wrong Email")
        } else if(logpw != MODEL.testLoginData.password) {
            alert("Wrong Password")
        } else {
            //set login status
            MODEL.setLoginStatus(2)

            //clear input fields
            $("#logEM").val("")
            $("#logPW").val("")
            
            //confirm to user that they are logged in
            $("#myAccount p").html("Logged In")
            $("#myAccount p").css("color", "#45af3b")
            $("#myAccount p").css("font-weight", "bold")
        }
    })
}

function signOutListener() {
    $("#myAccount").on("click", () => {
        MODEL.setLoginStatus(1)
        $("#myAccount p").html("Account")
        $("#myAccount p").css("color", "#000")
        $("#myAccount p").css("font-weight", "normal")
    })
}

//function to tell what pages a user can access and displaying modal messages
function loginAlertListener() {
    //if the login status is 1
    if(MODEL.loginStatus === 1) {
        //display the alert to sign in on a blog or cart click
        $(".modalPopUp").on("mousedown", () => {
            $("#alertSystem").css("visibility", "visible")
        })
        //when accepting the dialogue to login, hide the prompt
        $("#loginAlertAccept").on("click", () => {
            $("#alertSystem").css("visibility", "hidden")
        })
        //make the alert invisible on the cancel button click
        $("#loginAlertCancel").on("click", () => {
            $("#alertSystem").css("visibility", "hidden")
        })
    }
}

//listen for hashtag change in the URL, call route function
function initApp() {
    $(window).on("hashchange", route)
    route()
}

//when the document has been read (all html elements are known), call the functions inside
$(document).ready(function () {
    initApp()
})