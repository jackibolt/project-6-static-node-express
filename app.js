
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

// set index route
app.get('/', (req, res) => {
    res.render('index', {projects});
});

// sets about route
app.get('/about', (req, res) => {
    res.render('about');
})


// sets dynamic projects route
app.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const currentProject = projects[projectId];
    res.render('project', {currentProject});
})

// handles 404 error
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    console.log(`Uh oh! ${err.status} Error. ${err.message}`);
    next(err);
})

app.use(( err, req, res, next ) => {
    res.locals.error = err;
    res.render('error');
  });

// starts the local server
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});