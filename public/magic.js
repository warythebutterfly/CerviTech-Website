
console.log("the script is properly referenced");
 $("#contactForm").submit(function (e) {
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

            console.log("i am hereytghugyu ty t yhgh");
            console.log(dataObject);

            // $.ajax({
            //     url: "/",
            //     data: dataObject,
            //     type: "POST",
            //     dataType: "json",
            //     success: function (response) {
            //         console.log("i ggott here");
            //         //form_loading($("#forgot-password-form"));
            //         console.log(response)
            //     }
            //         error: function(){
            //             console.log("you wish bleh");
            //         }
            //     });

});
