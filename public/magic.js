
console.log("the script is properly referenced");

jQuery.validator.addMethod('answercheck', function (value, element) {
    return this.optional(element) || /^\bcat\b$/.test(value)
}, "type the correct answer -_-");

// // validate contactForm form
// $(function() {
//     $('#contactForm').validate({
//         rules: {
//             name: {
//                 required: true,
//                 minlength: 2
//             },
//             subject: {
//                 required: true,
//                 minlength: 4
//             },
//             number: {
//                 required: true,
//                 minlength: 5
//             },
//             email: {
//                 required: true,
//                 email: true
//             },
//             message: {
//                 required: true,
//                 minlength: 20
//             }
//         },
//         messages: {
//             name: {
//                 required: "come on, you have a name, don't you?",
//                 minlength: "your name must consist of at least 2 characters"
//             },
//             subject: {
//                 required: "come on, you have a subject, don't you?",
//                 minlength: "your subject must consist of at least 4 characters"
//             },
//             email: {
//                 required: "no email, no message"
//             },
//             message: {
//                 required: "um...yea, you have to write something to send this form.",
//                 minlength: "thats all? really?"
//             }
//         }

//     })
// })
var alert = $('#alert-msg'); // alert div for show alert message
var alertName = $('#alert-name-msg'); // alert div for show alert message
var alertEmail = $('#alert-email-msg'); // alert div for show alert message
var alertSubject = $('#alert-subject-msg'); // alert div for show alert message
var alertMessage = $('#alert-message-msg'); // alert div for show alert message

// Validation
// $("#contactForm").validate({
//     rules: {


//         email: {
//             required: true,
//             email: true
//         },
//         name: {
//             required: true,

//         },
//         subject: {
//             required: true,

//         },
//         message: {
//             required: true,

//         }


//     },
//     errorClass: "form-invalid",

// });

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validateForm() {

    $("#email").on('keyup', function () {

        validateEmail(email);
    });

    var w = document.forms["contactForm"]["name"].value;
    var x = document.forms["contactForm"]["email"].value;
    var y = document.forms["contactForm"]["subject"].value;
    var z = document.forms["contactForm"]["message"].value;

    // if ((w === "" || w === null) && (x === "" || x === null) && (y === "" || y === null) && (z === "" || z === null)) {
    //     alert.html("<p style='text-align:center'>Please fill out all the fields.");
    // }

    if (w === "" || w === null) {
        alertName.html("<small style='float:right'>Your name is required</small>").fadeIn("slow");
        alert.html("<p style='text-align:center' class='alert alert-danger'>Please fill in all the fields. All fields are required.")
    }
    if (x === "" || x === null) {
        alertEmail.html("<small style='float:right'>Your email is required</small>").fadeIn("slow")
        alert.html("<p style='text-align:center' class='alert alert-danger'>Please fill in all the fields. All fields are required.")
    }
    if (y === "" || y === null) {

        alertSubject.html("<small style='float:right'>Your subject is required</small>").fadeIn("slow")
        alert.html("<p style='text-align:center' class='alert alert-danger'>Please fill in all the fields. All fields are required.");
    }
    if (z === "" || z === null) {

        alertMessage.html("<small style='float:right'>Your message is required</small>").fadeIn("slow")
        alert.html("<p style='text-align:center' class='alert alert-danger'>Please fill in all the fields. All fields are required.");
    }

    $("#email").on('keyup', function () {

        validateEmail(email);
        alertEmail.fadeOut("slow");

    });

    $("#name").keyup(function () {

        alertName.fadeOut("slow");

    });
    $("#subject").on('keyup', function () {

        alertSubject.fadeOut("slow")
    });
    $("#message").on('keyup', function () {

        alertMessage.fadeOut("slow");
    });

}



$("#submitButton").click(function (e) {
    e.preventDefault();
    var form = $('#contactForm'); // contact form

    var submit = $('#submitButton'); // submit button



    name = $("#name").val();
    console.log(name);
    email = $("#email").val();
    console.log(email);
    subject = $("#subject").val();
    console.log(subject);
    message = $("#message").val();
    console.log(message);

    validateForm();



    var dataObject = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };




    if (name !== "" && email !== "" && subject !== "" && message !== "") {
        $('#alert-msg').hide();
        //alert.html("<p style='text-align:center'>Please fill out all the fields. All fields are required.");
        console.log("enter the ajax");
        $.ajax({
            url: '/sendmail', // form action url
            type: 'POST', // form submit method get/post
            dataType: 'json', // request type html/json/xml
            data: dataObject, // serialize form data

            beforeSend: function () {
                alert.fadeOut();
                submit.html('Sending...'); // change submit button text
                console.log("i got to before send...")
            },
            success: function (response) {
                console.log("i got to success");
                console.log(response);
                submit.html("<i class = 'fa fa-spinner fa-spin'></i> Sending...");
                $('#contactForm :input').attr('disabled', 'disabled');
                $('#contactForm').fadeTo("slow", 1, function () {
                    $('#contactForm').find(':input').attr('disabled', true);
                    $('#contactForm').find('label').css('cursor', 'default');
                    $('#success').fadeIn()
                    $('.modal').modal('hide');
                    $('#modal-success-header').html(response.responseHeader);
                    $('#modal-success-content').html(response.responseText);

                    $('#success').modal('show');
                    form.trigger('reset'); // reset form

                    submit.html("Send Message");// reset submit button text
                    $('#contactForm').find(':input').attr('disabled', false);
                });

                // fade in response data



                //alert.html(response).fadeIn(); 
                console.log("i'm still in success...");
            },
            error: function (response) {
                console.log("didn't get to ajax")
                console.log(response);

                $('#contactForm').fadeTo("slow", 1, function () {
                    $('#error').fadeIn()
                    $('.modal').modal('hide');

                    $('#error').modal('show');
                    submit.html("Send Message");
                    //form.trigger('reset');
                })
                //console.log(e)
            }
        });
    }

    alert.html("<p style='text-align:center' class='alert alert-danger'>Please fill in all the fields. All fields are required.");
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