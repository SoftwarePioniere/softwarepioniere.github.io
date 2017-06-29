$(function () {

    // $("input,textarea").jqBootstrapValidation({
    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "https://formspree.io/info@softwarepioniere.de",
                method: "POST",
                dataType: "json",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function () {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Ihre Nachricht wurde erfolgreich an uns versendet. Wir werden diese schnellstmöglich bearbeiten.</strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function () {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Ihre Nachricht konnte leider nicht an uns versendet werden. Probieren Sie es bitte später noch einmal.");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("#mc-embedded-subscribe-form input,#mc-embedded-subscribe-form textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var email = $("input#subscribe-email").val();
            $.ajax({

                //url: "http://softwarepioniere.us15.list-manage.com/subscribe/post?u=73a36ff784828d42a0acf27e0&amp;id=90389308b6",
                url: "https://us15.api.mailchimp.com//3.0/lists/90389308b6/members/",
                method: "POST",
                dataType: "json",
                data: {
                    "email_address": email,
                    "status": "pending",
                    "merge_fields": {
                        "FNAME": "Urist",
                        "LNAME": "McVankab"
                    }
                },
                cache: false,
                success: function () {
                    // Success message
                    $('#success-newsletter').html("<div class='alert alert-success'>");
                    $('#success-newsletter > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success-newsletter > .alert-success')
                        .append("<strong>Ihre E-Mail Adresse wurde erfolgreich für unseren Newsletter eingetragen.</strong>");
                    $('#success-newsletter > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#mc-embedded-subscribe-form').trigger("reset");
                },
                error: function () {
                    // Fail message
                    $('#success-newsletter').html("<div class='alert alert-danger'>");
                    $('#success-newsletter > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success-newsletter > .alert-danger').append("<strong>Ihre Eintragung zum Newsletter konnte nicht durchgeführt werden. Probieren Sie es bitte später noch einmal.</strong>");
                    $('#success-newsletter > .alert-danger').append('</div>');
                    //clear all fields
                    $('#mc-embedded-subscribe-form').trigger("reset");
                },
            })
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function () {
    $('#success').html('');
});