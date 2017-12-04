$(document).ready(function () {
    $.get("list", function (resp) {
        var container = $(".container");
        for (var i = 0; i < resp.length && i < 7; i++) {
            var files = resp[i]["children"];
            if (files) {
                container.append("<div class='name'>" + resp[i]["name"] + "</div><div id='" + resp[i]["name"] + "' class='files'></div>");
                for (var j = 0; j < files.length; j++) {
                    var path = "data/" + resp[i]["name"] + "/" + files[j]["name"];
                    var src = "img/logo.png";
                    if (is_pic(files[j]["name"])) src = path;
                    $("#" + resp[i]["name"]).append("<a href='" + path + "' target='_blank'><img src='" + src + "'/></a>");
                }
            }
        }
    });
    $('#upload-file').fileupload({
        done: function () {
            location.reload();
        }
    });
    $('#upload-btn').click(function () {
        $('#upload-file').click();
    });
});

function is_pic(f) {
    return f.endsWith(".jpeg") || f.endsWith(".bmp") || f.endsWith(".jpg") || f.endsWith(".png") || f.endsWith(".gif");
}