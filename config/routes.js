exports.routes = function (map) {
    map.root('app#index');
    
    map.resources('posts')
    map.get('homePage', 'app#index', {as: 'homePage'});
    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};