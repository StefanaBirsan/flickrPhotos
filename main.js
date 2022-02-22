
// Adds images and makes sure that getFlickrData() function is not called multiple times. 
var adaugaImagini = false;
var nrPag = 1;

/*Takes the input from the search bar and does a searching based on the category that the user had chosen.
Clears the div and the pageNumber and makes another search.
*/
function searchTag() {
    nrPag = 1;
    document.getElementById("zonaGalerie").innerHTML = "";
    tag = document.getElementById("myText").value;

    getFlickrData();
}

async function getFlickrData() {
    adaugaImagini = true;
    
    /*
     Performs an image search according to the chosen category and takes the search information needed to find the source of the image.
     */
    const url = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=236225ca659be5ceeb9e3b3d71a8d815&tags=" + tag + "&privacy_filter=1&format=json&nojsoncallback=1&page=" + nrPag;
    try {
        var response = await fetch(url);
        var data = await response.json();
        console.log(data);
        var photos = data.photos.photo;
        //console.log(photos);

        // Create an individual page div that contains photos from each resulting page.
        
        var galleryPage = document.createElement("div");
        galleryPage.id = "page" + nrPag;
        galleryPage.className = "pages";
        document.getElementById("zonaGalerie").appendChild(galleryPage);

        /*
         Search through the resulting image information and retrieve the source URL of the photo.
        Create images and add src ul to div page.
         */
        for (var i = 0; i < photos.length; i++) {
            var img = document.createElement("img");
            currPhoto = photos[i];
            img.src = "https://farm" + currPhoto.farm + ".staticflickr.com/" + currPhoto.server + "/" + currPhoto.id + "_" + currPhoto.secret + "_c.jpg"

            // The title of the image is returned and added as a paragraph.
            var imgText = document.createElement("P");
            imgText.innerHTML = photos[i].title;

            // The image and the paragraph are added in the same div.
            var imagine = document.createElement("div");
            imagine.className = "imagine";
            imagine.id = photos[i].id;

            document.getElementById(galleryPage.id).appendChild(imagine)
            document.getElementById(imagine.id).appendChild(img);

            if (!imgText.innerHTML == "") {
                document.getElementById(imagine.id).appendChild(imgText);
            }

        };
    } catch (e) {
        alert("Whops! Something went wrong: " + e.message + "\nPlease try again with another search")
    }

    // Add a divider after each page as long as it is not empty.
    
    if (!document.getElementById("zonaGalerie").innerHTML == "") {
        nrPag++;
        var pageDivider = document.createElement("P");
        pageDivider.innerHTML = "Page " + nrPag;
        pageDivider.className = "divider";
        document.getElementById("zonaGalerie").appendChild(pageDivider);
    }
    adaugaImagini = false;
}

/* 
Check how far the user is and open a new page if the user is nearing the end of the first one.
The while and boolean loop was added in order to ensure that only one page is added while getFlickrData () resumes.

*/
window.onscroll = function () {
    infiniteScroll()
}
function infiniteScroll() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            while (adaugaImagini == false) {
                getFlickrData();
            }
      };

}

