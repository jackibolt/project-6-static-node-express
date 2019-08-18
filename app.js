
// requires dependencies and JSON data
const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data.json');
const projects = data.projects;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

// sets static route and pug engine
app.use('/static', express.static(__dirname+'/public'));
app.set('view engine', 'pug');

// sets index route
app.get('/', (req, res) => {
    res.render('index', {projects});
});

// sets about route
app.get('/about', (req, res) => {
    res.render('about');
})


// sets dynamic projects route
app.get('/project/:id', (req, res) => {
    const projectId = req.params.id;
    const currentProject = projects[projectId];
    res.render('project', {currentProject});
})

// handles errors
app.use((req, res, next) => {
    const err = new Error("Shucks. There's been an error.");
    err.status = 404;
    next(err);
})

// renders error page
app.use(( err, req, res, next ) => {
    res.locals.error = err;
    res.status = err.status;
    if (res.status === undefined) {
        err.status = 500;
    }
    res.render('error');
  });

// starts the local server
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});