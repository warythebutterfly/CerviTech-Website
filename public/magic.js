
console.log("the script is properly referenced");


//  $("#submitButton").click(function (e) {
//             e.preventDefault();
//             name = $("#name").val();
//             console.log(name);
//             email = $("#email").val();
//             subject = $("#subject").val();

//             message = $("#message").val();

//             var dataObject = {
//                 name: name,
//                 email: email,
//                 subject:subject,
//                 message:message
//             };

//             // console.log("i am hereytghugyu ty t yhgh");
//             console.log(dataObject);
//             // alert("message sent!");
//            swal.fire({
//             title: 'Thank You!',
//             text: 'Your messsage has been received.',
//             imageUrl: 'https://firebasestorage.googleapis.com/v0/b/cervitech-e4465.appspot.com/o/72PX2.png?alt=media&token=9fbc8074-7ab4-4629-97fb-d2b653dc6af6"',
            
                
// });

//            function updateDiv()
// { 
//     $( "#here" ).load(window.location.href + " #here" );
// }
// //             $.post(“/“, dataObject, () => {
// //    Console.log(“data received”)
// // });
// });


var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
//   var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
//   for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(" active", "");
//   }
  slides[slideIndex-1].style.display = "block";  
//   dots[slideIndex-1].className += " active";
}