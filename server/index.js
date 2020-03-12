const express = require('express');
const session = require('express-session');
const path = require('path');
var bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const app = express();
app.use(session({ secret: 'my-secret' }));
let userSession;

app.use(express.static(DIST_DIR));
app.use(bodyParser.json());

app.listen(port, function() {
    console.log('App listening on port: ' + port);
});

app.get('/signin', (req, res) => {
    res.sendFile(HTML_FILE);
});
app.get('/signup', (req, res) => {
    res.sendFile(HTML_FILE);
});
app.get('/allposts', (req, res) => {
    res.sendFile(HTML_FILE);
});
app.get('/logout', (req, res) => {
    req.session.destroy();
    userSession = null;
    res.redirect('/signin');
});

verifyRequest = (req, res) => {
    if (userSession && userSession.username) {
        res.sendFile(HTML_FILE);
    } else {
        res.redirect('/signin');
    }
};
app.get('/', verifyRequest);
app.get('/home', verifyRequest);
app.get('/post', verifyRequest);
app.get('/profile', verifyRequest);

/****************************  Start of Rest APIs  ***********************/

const user = require('./services/user');
const post = require('./services/post');

app.post('/ds/signin', function(req, res) {
    userSession = req.session;
    var user_name = req.body.email;
    var password = req.body.password;
    user.validateSignIn(user_name, password, function(result) {
        if (result) {
            userSession.username = user_name;
            userSession.userId = result._id;
            res.send('success');
        }
    });
});

app.post('/ds/signup', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    if (name && email && password) {
        user.signup(name, email, password);
    } else {
        res.send('Failure');
    }
});

function redirectIfNotLoggedIn(req, res) {
    if (!userSession || !userSession.username) {
        res.redirect(401, '/signin');
        return true;
    }
    return false;
}

app.post('/ds/addPost', function(req, res) {
    var title = req.body.title;
    var description = req.body.description;
    var id = req.body.id;
    if (redirectIfNotLoggedIn(req, res)) {
        return;
    }
    if (id == '' || id == undefined) {
        post.addPost(userSession.username, title, description, function(
            result
        ) {
            res.send(result);
        });
    } else {
        // TODO: Also check the user logged in should update only their posts
        console.log('update', title, description);
        post.updatePost(id, title, description, function(result) {
            res.send(result);
        });
    }
});

app.post('/ds/updateProfile', function(req, res) {
    if (redirectIfNotLoggedIn(req, res)) {
        return;
    }
    // TODO: Also check the user logged in should update only their profile
    var name = req.body.name;
    var password = req.body.password;
    user.updateProfile(name, password, userSession.username, function(result) {
        res.send(result);
    });
});

app.post('/ds/getPost', function(req, res) {
    if (redirectIfNotLoggedIn(req, res)) {
        return;
    }
    // TODO: Also check the user logged in should only view his/her posts in this method

    post.getPost(userSession.username, function(result) {
        res.send(result);
    });
});

app.post('/ds/getAllPosts', function(req, res) {
    post.getAllPosts(function(result) {
        res.send(result);
    });
});

app.post('/ds/deletePost', function(req, res) {
    if (redirectIfNotLoggedIn(req, res)) {
        return;
    }
    // TODO: Also check that the post is created by the logged in person.
    var id = req.body.id;
    post.deletePost(id, function(result) {
        res.send(result);
    });
});

app.post('/ds/getProfile', function(req, res) {
    if (redirectIfNotLoggedIn(req, res)) {
        return;
    }
    user.getUserInfo(userSession.username, function(result) {
        res.send(result);
    });
});

app.post('/ds/getPostWithId', function(req, res) {
    var id = req.body.id;
    post.getPostWithId(id, function(result) {
        res.send(result);
    });
});

app.post('/ds/logout', function(req, res) {
    req.session.destroy();
    userSession = null;
    console.log('destroyed session');
    res.send(true);
});
