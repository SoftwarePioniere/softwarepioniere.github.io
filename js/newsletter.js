// function newsletteranmelden() {

//     var check = document.getElementById('b_73a36ff784828d42a0acf27e0_90389308b6').value;
//     if (check == "") {
//         var email = document.getElementById('subscribe-email').value;
//         console.log(':: email: ', email);

//         var url = 'https://softwarepioniere-functions.azurewebsites.net/api/NewsletterAnmeldung?code=wybtF1irV0OagSTOC2Fe8H4vWgl6Wkf678If5nUiPfALEQdViJlnMg==&email=' + email;
//         console.log(': :url: ', url);

//         var xhr = new XMLHttpRequest();
//         xhr.open('POST', url, true);

//         xhr.onreadystatechange = function () {

//             if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
//                 console.log(':: erfolgreich angemeldet');
//                 console.log(xhr.response);
//                 document.getElementById("success-newsletter").innerHTML = xhr.responseText;
//                 document.getElementById("error-newsletter").innerHTML = "";
//             }

//             if (xhr.readyState == XMLHttpRequest.DONE && xhr.status != 200) {
//                 console.log(':: nicht erfolgreich angemeldet');
//                 console.log(':: grund: ', xhr.response);
//                 document.getElementById("error-newsletter").innerHTML = xhr.responseText;
//                 document.getElementById("success-newsletter").innerHTML = "";
//             }
//         }

//         xhr.send(url);
//     }
// }