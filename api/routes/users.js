const user = require('../model/user');
let User = require('../model/user');

// Récupérer tous les users (GET)
function getUsers(req, res) {
    User.find((err, users) => {
        if (err) {
            res.send(err)
        }
        res.send(users);
    });
}

// Récupérer un user par son id (GET)
function getUser(req, res) {
    let userId = req.params.id;

    User.findOne({ id: userId }, (err, user) => {
        if (err) { res.send(err) }
        res.json(user);
    })
}

// Ajout d'un user (POST)
function postUser(req, res) {
    let user = new User();
    user.id = req.body.id;
    user.name = req.body.name;
    user.dueDate = req.body.dueDate;
    user.submitted = req.body.submitted;

    console.log("POST user reçu :");
    console.log(user)

    user.save((err) => {
        if (err) {
            res.send('cant post user ', err);
        }
        res.json({ message: `${user.name} saved!` })
    })
}

// Update d'un user (PUT)
function updateUser(req, res) {
    console.log("UPDATE recu user : ");
    console.log(req.body);
    User.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, user) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({ message: 'updated' })
        }
        // console.log('updated ', user)
    });

}

// suppression d'un user (DELETE)
function deleteUser(req, res) {
    User.findOneAndDelete({ id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(`${user.name} deleted`);
    });
}

module.exports = { getUsers, postUser, getUser, updateUser, deleteUser };
