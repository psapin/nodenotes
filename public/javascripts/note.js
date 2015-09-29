
window.onload = function() {
var converter = new showdown.Converter(),
    html      = converter.makeHtml(note.text);
document.getElementById('notetext').append(html);
};