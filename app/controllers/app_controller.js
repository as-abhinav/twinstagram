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