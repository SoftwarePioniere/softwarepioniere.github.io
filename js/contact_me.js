$(function () {
    $("#contactForm input,#contactForm textarea").jqBootstrapValidation(
        {
            preventSubmit: true,
            submitError: function ($form, event, errors) { },
            submitSuccess: function ($form, event) {
                event.preventDefault(); var name = $("input#name").val();
                var email = $("input#email").val(); var phone = $("input#phone").val();
                var message = $("textarea#message").val();
                var firstName = name; if (firstName.indexOf(' ') >= 0) {
                    firstName = name.split(' ').slice(0, -1).join(' ');
                }
                $.ajax({ url: "https://formspree.io/info@softwarepioniere.de", method: "POST", dataType: "json", data: { name: name, phone: phone, email: email, message: message }, cache: false, success: function () { $('#success').html("<div class='alert alert-success'>"); $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>"); $('#success > .alert-success').append("<strong>Ihre Nachricht wurde erfolgreich an uns versendet. Wir werden diese schnellstmöglich bearbeiten.</strong>"); $('#success > .alert-success').append('</div>'); $('#contactForm').trigger("reset"); }, error: function () { $('#success').html("<div class='alert alert-danger'>"); $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>"); $('#success > .alert-danger').append("<strong>Ihre Nachricht konnte leider nicht an uns versendet werden. Probieren Sie es bitte später noch einmal."); $('#success > .alert-danger').append('</div>'); $('#contactForm').trigger("reset"); }, })
            }, filter: function () { return $(this).is(":visible"); },
        });
    $("#mc-embedded-subscribe-form input,#mc-embedded-subscribe-form textarea").jqBootstrapValidation({
        preventSubmit: true, submitError: function ($form, event, errors) { },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var email = $("input#subscribe-email").val();
            $.ajax({
                url: "https://softwarepioniere-functions.azurewebsites.net/api/NewsletterAnmeldung?code=wybtF1irV0OagSTOC2Fe8H4vWgl6Wkf678If5nUiPfALEQdViJlnMg", method: "POST", dataType: "json", data: { "email": email, "status": "pending", "merge_fields": { "FNAME": "", "LNAME": "" } }, cache: false,
                success: function () { 
                    $('#success-newsletter').html("<div class='alert alert-success'>"); 
                    $('#success-newsletter > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>"); $('#success-newsletter > .alert-success').append("<strong>Ihre E-Mail Adresse wurde erfolgreich für unseren Newsletter eingetragen.</strong>"); $('#success-newsletter > .alert-success').append('</div>'); $('#mc-embedded-subscribe-form').trigger("reset"); }, error: function () { $('#success-newsletter').html("<div class='alert alert-danger'>"); $('#success-newsletter > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>"); $('#success-newsletter > .alert-danger').append("<strong>Ihre Eintragung zum Newsletter konnte nicht durchgeführt werden. Probieren Sie es bitte später noch einmal.</strong>"); $('#success-newsletter > .alert-danger').append('</div>'); $('#mc-embedded-subscribe-form').trigger("reset"); },
            })
        }, filter: function () { return $(this).is(":visible"); },
    }); $("a[data-toggle=\"tab\"]").click(function (e) { e.preventDefault(); $(this).tab("show"); });
}); $('#name').focus(function () { $('#success').html(''); });