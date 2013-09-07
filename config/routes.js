exports.routes = function (map) {
    map.root('app#index');
    //map.get('*', 'app#index', {as: 'homePage'});
    map.resources('posts')
    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};