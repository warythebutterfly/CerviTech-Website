
console.log("the script is properly referenced");

// $(document).ready(function(){
    
//   (function($) {
//       "use strict";
//       jQuery.validator.addMethod('answercheck', function (value, element) { 
//         return this.optional(element) || /^\bcat\b$/.test(value);
//       }, "Type the correct answer");
      
//       // validate contactForm form
//       $(function() {
//           $('#contactForm').validate({
//               rules: {
//                   name: {
//                       required: true,
//                       minlength: 2
//                   },
//                   subject: {
//                       required: true,
//                       minlength: 4
//                   },
//                   // number: {
//                   //     required: true,
//                   //     minlength: 5
//                   // },
//                   email: {
//                       required: true,
//                       email: true
//                   },
//                   message: {
//                       required: true,
//                       minlength: 20
//                   }
//               },
//               messages: {
//                   name: {
//                       required: "come on, you have a name, don't you?",
//                       minlength: "your name must consist of at least 2 characters"
//                   },
//                   subject: {
//                       required: "come on, you have a subject, don't you?",
//                       minlength: "your subject must consist of at least 4 characters"
//                   },
//                   // number: {
//                   //     required: "come on, you have a number, don't you?",
//                   //     minlength: "your Number must consist of at least 5 characters"
//                   // },
//                   email: {
//                       required: "no email, no message"
//                   },
//                   message: {
//                       required: "um...yea, you have to write something to send this form.",
//                       minlength: "thats all? really?"
//                   }
//               }
//             });
//           });
//     });
// });

 $("#submitButton").click(function (e) {
            e.preventDefault();
            var form = $('#contactForm'); // contact form
            //form.validate();
            var submit = $('#submitButton'); // submit button
            var alert = $('.alert-msg'); // alert div for show alert message


            name = $("#name").val();
            console.log(name);
            email = $("#email").val();
            subject = $("#subject").val();
            message = $("#message").val();

            var dataObject = {
                name: name,
                email: email,
                subject:subject,
                message:message
            };

            // console.log("i am hereytghugyu ty t yhgh");
            $.ajax({
              url: '/', // form action url
              type: 'POST', // form submit method get/post
              dataType: 'json', // request type html/json/xml
              data: dataObject, // serialize form data
              
              beforeSend: function() {
                  alert.fadeOut();
                  submit.html('Sending...'); // change submit button text
                  console.log("i got to before send...")
              },
             success: function(response) {
                console.log("i got to success");
                console.log(response);
                $('#contactForm :input').attr('disabled', 'disabled');
                        $('#contactForm').fadeTo( "slow", 1, function() {
                            $('#contactForm').find(':input').attr('disabled', 'disabled');
                            $('#contactForm').find('label').css('cursor','default');
                            $('#success').fadeIn()
                            $('.modal').modal('hide');
                            $('#modal-success-content').html(response.responseText);
		                	$('#success').modal('show');
                        });
                
                 // fade in response data
                  //form.trigger('reset'); // reset form
                
                  //submit.html("Send Message");// reset submit button text
              
                 //alert.html(response).fadeIn(); 
                  console.log("i'm still in success...");
              },
              error: function(response) {
               console.log("didn't get to ajax")
                console.log(response);
                
                $('#contactForm').fadeTo( "slow", 1, function() {
                    $('#error').fadeIn()
                    $('.modal').modal('hide');
                   
                    $('#error').modal('show');
                    submit.html("Send Message");
                    //form.trigger('reset');
                })
                  //console.log(e)
              }
          });
                
});

//            function updateDiv()
// { 
//     $( "#here" ).load(window.location.href + " #here" );
// }
// //             $.post(“/“, dataObject, () => {
// //    Console.log(“data received”)
// // });
// });


// var slideIndex = 1;
// showSlides(slideIndex);


// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }


// function screenPlusSlides(n) {
//     showSlides(slideIndex += n);
//   }
// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
// //   var dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {slideIndex = 1}    
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";  
//   }
// //   for (i = 0; i < dots.length; i++) {
// //       dots[i].className = dots[i].className.replace(" active", "");
// //   }
//   slides[slideIndex-1].style.display = "block";  
// //   dots[slideIndex-1].className += " active";
// }