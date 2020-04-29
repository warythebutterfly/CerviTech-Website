
console.log("the script is properly referenced");

import swal from 'sweetalert';
 $("#submitButton").click(function (e) {
            e.preventDefault();
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
            console.log(dataObject);
            // alert("message sent!");
           swal.fire({
            title: 'Thank You!',
            text: 'Your messsage has been received.',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/cervitech-e4465.appspot.com/o/72PX2.png?alt=media&token=9fbc8074-7ab4-4629-97fb-d2b653dc6af6"',
            
                
});
//             $.post(“/“, dataObject, () => {
//    Console.log(“data received”)
// });
});
