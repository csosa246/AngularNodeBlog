
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path');

var app = express();

// Configuration

app.configure(function(){
    app.set('port',process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', {
        layout: false
    });
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser('secret'));
    app.use(express.session());
    app.use(express.methodOverride());
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname,'public')));
    app.use(app.router);
});


app.configure('development',function(){
    app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API

//Where I get the posts
app.get('/api/posts', api.posts);
//Where I get 1 specific post
app.get('/api/post/:id', api.post);
//Where I post a new post
app.post('/api/post', api.addPost);
//Where I edit a post
app.put('/api/post/:id', api.editPost);
//Where I delete a post
app.delete('/api/post/:id', api.deletePost);

// redirect all others to the index's here
app.get('*', routes.index);

// Start server

http.createServer(app).listen(app.get('port'),function(){
    console.log("Express server listening on port: " + app.get('port'));
})
