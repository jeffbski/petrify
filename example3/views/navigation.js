// returns a unique list of values from an array
var unique = function(arr){
    return Object.keys(arr.reduce(function(a, x){a[x] = null; return a;}, {}));
};

function compareString(a, b){
  return a.localeCompare(b);
}


exports.run = function(view, context){

    // partials is an object for storing processed templates
    // and data for later use. The partials object is shared by all views.
    var partials = context.partials;

    // extract a unique list of 4-digit years from the data
    partials.files = context.data.map(function(a){
      return a.filename.replace(/\.md$/, '');
    }).sort(compareString);

    // extract a unique list of tags from the data
    partials.tags = unique(context.data.reduce(function(a, d){
        return a.concat((d.metadata.tags) ? d.metadata.tags.split(', ') : []);
    }, [])).sort(compareString);

    // render the naviagtion template and store in context.partials for later
    // use in other views
    partials.navigation = context.templates['nav.jsont'].expand({
        files: partials.files,
        tags: partials.tags
    });

    // note: this view did not emit anything, but generated some HTML and data
    // for including in other templates.
    view.done();

};
