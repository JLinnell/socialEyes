////   O P E N  /  C L O S E  M O D A L    ////
function openModal() {
    $('[data-popup-open]').on('click', function (event) {
        event.preventDefault();
        let targeted_popup_class = $(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(200);
    });
}

openModal();


function closeModal() {
    $('[data-popup-close]').on('click', function (event) {
        event.preventDefault();
        let targeted_popup_class = $(this).attr('data-popup-close');
        $(this).closest('form').find("input[type=text], input[type=password]").val("");
        $(this).closest('.popup-inner').find("input[type=text], input[type=password]").val("");
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(200);
    });
}

closeModal();


//   T A B   F U N C T I O N A L I T Y   //
$('.signup-tab').css('background', '#f0f8ff');
$('.login-form').hide();
$('.login-tab').css('background', '#bab3b3');

$('.login-tab').click(event => {
    event.preventDefault();
    $('.register-form').hide();
    $('.login-form').show();
    $('.signup-tab').css('background', '#bab3b3');
    $('.login-tab').css('background', '#f0f8ff');
});


$('.signup-tab').click(event => {
    event.preventDefault();
    $('.register-form').show();
    $('.login-form').hide();
    $('.login-tab').css('background', '#bab3b3');
    $('.signup-tab').css('background', '#f0f8ff');
});


/// S I G N  U P  A N D  L O G I N  U S E R  ///

function createUser() {
    $('.create-user-btn').on('click', event => {
        event.preventDefault();
        let userData = {
            'name': $('.js-register-form .inputName').val(),
            'email': $('.js-register-form .inputEmail').val(),
            'password': $('.js-register-form .inputPass').val()
        }
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: '/users/register',
            data: JSON.stringify(userData)
        })
            .done(function (result) {
                toastr.success('You\'re all set! Have fun!')
                $('.input').val("");
                closeModal();
            })
    })
}


createUser();

function loginUser() {
    $('.login-btn').on('click', event => {
        event.preventDefault();
        let userData = {
            'email': $('.js-login-form .inputEmail').val(),
            'password': $('.js-login-form .inputPass').val()
        }
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: '/users/login',
            data: JSON.stringify(userData)
        })
            .done(function (result) {
                toastr.success(`Welcome back, ${result.data.email}!`)
                $('.input').val("");
                localStorage.setItem('token', result.data.token);
                localStorage.setItem('email', result.data.email);
                localStorage.setItem('userID', result.data.id);
                window.location.pathname = 'home.html';

            })
    })
}

loginUser();

function categorySearch() {
    $('.category-btn').on('click', event => {
        event.preventDefault();

        $(".js-category-results").html('');

        $.ajax({
            type: "GET",
            contentType: 'application/json',
            url: `/meetingPoint/findByCategory/${$('.js-query').val()}`,
        })
            .done(function (response) {
                if (response.data.length === 0) {
                    $(".js-category-results").append(renderNoResults());
                }
                if (response.data.length > 0) {
                    $(".steps-container").hide();
                }
                toastr.success('You\'re on your way!')
                for (let i = 0; i < response.data.length; i++) {
                    $(".js-category-results").append(renderCheckins(response.data[i]));
                    $('.js-query').val("");
                }
            })
    })
}

categorySearch();

function locationSearch() {
    $('.location-btn').on('click', event => {
        event.preventDefault();

        $(".js-category-results").html('');

        $.ajax({
            type: "GET",
            contentType: 'application/json',
            url: `/meetingPoint/findByLocation/${$('.js-query-location').val()}`,
        })
            .done(function (response) {
                if (response.data.length === 0) {
                    $(".js-category-results").append(renderNoResults());
                }
                if (response.data.length > 0) {
                    $(".steps-container").hide();
                }
                toastr.success('You\'re on your way!')
                for (let i = 0; i < response.data.length; i++) {
                    $(".js-category-results").append(renderCheckins(response.data[i]));
                    $('.js-query-location').val("");
                }
            })
    })
}

locationSearch();

function renderNoResults() {
    return(`
        <div class="no-results">
        <article class="results">
          <a><img class="cat-img" src="../assets/sadcat.jpg" alt="no results">
          <p>No results were found with your query, try again.</p></a></article>
        </div>
    `)
}

function renderCheckins(checkin) {
    return (`
    <div class="meetingPointsList">
        <article class="results">
        <span="description">${checkin.title}</span>
        <a class="js-result-category" href="*"><span="description">${checkin.category}</span></a>
        <a class="js-result-description"><span="description">${checkin.description}</span></a></article>
    </div>`
    )

}
