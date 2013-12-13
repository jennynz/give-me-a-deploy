function SelectAll(id)
{
    document.getElementById(id).focus();
    document.getElementById(id).select();
}

// Create a YUI sandbox on your page.
YUI().use('node', 'event', function (Y) {
    // The Node and Event modules are loaded and ready to use.
    // Your code goes here!
});