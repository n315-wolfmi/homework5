import * as MODEL from "./model.js"

//routing page content
function route() {
    let hashtagLink = window.location.hash //get page from hashtag in url 
    let pageID = hashtagLink.replace("#", "")

    //if there is nothing in the URL, default to the home page, otherwise pass the hash page in
    if(pageID == "") {
        MODEL.currentPage("home")
    } else {
        MODEL.currentPage(pageID)
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