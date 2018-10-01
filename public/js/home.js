if (!localStorage.getItem('token')) {
    window.location.pathname = '/';
}

function signOut() {
    $('.signout').click(function () {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('userID');
        window.location.pathname = '/';
    })
}
signOut();

function createCheckIn() {
    $('.checkIn-btn').click(function () {
        $('button').removeClass("selected");
        $(this).addClass("selected");
    });
    $('.checkIn-form').submit(function (event) {
        event.preventDefault();
        let checkInData = {
            'title': $('.checkIn-form .title').val(),
            'category': $('.checkIn-form .cat').val(),
            'description': $('.checkIn-form .des').val(),
            'userId': localStorage.getItem('userID')
        }
        let token = localStorage.getItem('token');
        $.ajax({
                type: "POST",
                contentType: 'application/json',
                url: `/meetingPoint/create/${token}`,
                data: JSON.stringify(checkInData)
            })
            .done(function (checkIn) {
                toastr.success('Yay! You\'re here!')
                $('.js-checkIn').val("");
                $(".js-meeting-points").append(renderCheckins(checkIn.data));
            })
    });
}
createCheckIn();

function fetchUserCheckIns() {
    let userid = localStorage.getItem('userID');
    let token = localStorage.getItem('token');
    $.ajax({
            type: "GET",
            contentType: 'application/json',
            url: `/meetingPoint/fetchAllByUser/${userid}/${token}`,
        })
        .done(function (response) {
            toastr.success('Cool!')
            for (let i = 0; i < response.data.length; i++) {
                $(".js-meeting-points").append(renderCheckins(response.data[i]));
            }
        })
}
fetchUserCheckIns();

function renderCheckins(checkIn) {
    return (`
 <div class="checkIn-list">
 <article class="results">
 <button class="remove-checkIn" value="${checkIn._id}"><img src="../assets/delete.png" /></button>
<a class="js-result-location" href="*" target="_blank"><span class="title">I am in ${checkIn.title}</span></a>
<a class="js-result-category" href="*" target="_blank">And I am<span class="categoryLink"> ${checkIn.category}</span></a>
<a class="js-result-description"><span class="description">${checkIn.description}</span></a></article>
 </div>
 </br>`);
}

function deleteCheckIn() {
    $('body').on("click", ".remove-checkIn", function (event) {
        $(event.currentTarget).removeClass("selected");
        $(event.currentTarget).addClass("selected");
        let id = $(event.currentTarget).val();

        $.ajax({
                type: "DELETE",
                url: `/meetingPoint/delete/${id}`,
            })
            .done(function (checkIn) {
                toastr.success('SEE YA!!!')
                $(event.currentTarget).parent().parent().remove();
            });
    });
}
deleteCheckIn();