export function currentPage(pageID) { //receive page id from app
    $.get(`pages/${pageID}.html`, function(data) { //get the page from the pages directory using the "get" function
        $("#app").html(data) //pass the html data into the app div
    })
}