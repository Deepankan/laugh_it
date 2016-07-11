window.fbAsyncInit = function() {
    FB.init({
        appId:  '204373803296127',
        status: true,
        cookie: true,
        xfbml: true
    });
};

(function(d, debug){var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];if   (d.getElementById(id)) {return;}js = d.createElement('script'); js.id = id; js.async = true;js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";ref.parentNode.insertBefore(js, ref);}(document, /*debug*/ false));

function postToFeed(title, desc, url, image) {
    var obj = {method: 'feed',link: url, picture: image,name: title,description: desc};
    function callback(response) {}
    FB.ui(obj, callback);
}
/*
var fbShareBtn = document.querySelector('.fb_share');
fbShareBtn.addEventListener('click', function(e) {
    e.preventDefault();
    var title = fbShareBtn.getAttribute('data-title'),
        desc = fbShareBtn.getAttribute('data-desc'),
        url = fbShareBtn.getAttribute('href'),
        image = fbShareBtn.getAttribute('data-image');
    postToFeed(title, desc, url, image);

    return false;
});*/