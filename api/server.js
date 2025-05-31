let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let user = require('./routes/users');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'uri de connexion à votre propre base dans le cloud s
const uri = 'mongodb+srv://c225:zc108064@cluster0.wls5sqn.mongodb.net/assignmentsDB?retryWrites=true&w=majority&appName=Cluster0';
//faire cluster users pour remplacer le tableau

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options).then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("à url = " + uri);
    console.log("vérifiez avec http://localhost:8010/api/assignments que cela fonctionne")
    console.log("vérifiez avec http://localhost:8010/api/users que cela fonctionne")
  },
  err => {
    console.log('Erreur de connexion: ', err);
});



// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.route(prefix + '/assignments')
  .get(assignment.getAssignments);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);

app.route(prefix + '/assignments')
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);


app.route(prefix + '/users')
  .get(user.getUsers);

app.route(prefix + '/users/:id')
  .get(user.getUser)
  .delete(user.deleteUser);

app.route(prefix + '/users')
  .post(user.postUser)
  .put(user.updateUser);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


