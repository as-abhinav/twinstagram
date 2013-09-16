load('application');

// before(loadApp, {
//     only: ['show', 'edit', 'update', 'destroy']
// });

action(function index() {
    this.title = 'TWINSTagram App';
    render();
});

action(function lists(){
	this.title = "Lists";
	render();
});

action(function show(){
	this.title = "Show";
	this.id = params.id;
	console.log(params.id);
	render();
});
