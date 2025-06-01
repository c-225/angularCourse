const grade = require('../model/grade');
let Grade = require('../model/grade');

// Récupérer tous les grades (GET)
function getGrades(req, res) {
    Grade.find((err, grades) => {
        if (err) {
            res.send(err)
        }
        res.send(grades);
    });
}

// Récupérer un grade par son id (GET)
function getGrade(req, res) {
    let gradeId = req.params.id;

    Grade.findOne({ id: gradeId }, (err, grade) => {
        if (err) { res.send(err) }
        res.json(grade);
    })
}

// Ajout d'un grade (POST)
function postGrade(req, res) {
    let grade = new Grade();
    grade.id = req.body.id;
    grade.name = req.body.name;
    grade.dueDate = req.body.dueDate;
    grade.submitted = req.body.submitted;

    console.log("POST grade reçu :");
    console.log(grade)

    grade.save((err) => {
        if (err) {
            res.send('cant post grade ', err);
        }
        res.json({ message: `${grade.name} saved!` })
    })
}

// Update d'un grade (PUT)
function updateGrade(req, res) {
    console.log("UPDATE recu grade : ");
    console.log(req.body);
    Grade.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, grade) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({ message: 'updated' })
        }
        // console.log('updated ', grade)
    });

}

// suppression d'un grade (DELETE)
function deleteGrade(req, res) {
    Grade.findOneAndDelete({ id: req.params.id }, (err, grade) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!grade) {
            return res.status(404).send('Grade not found');
        }
        res.json(`${grade.name} deleted`);
    });
}

module.exports = { getGrades, postGrade, getGrade, updateGrade, deleteGrade };
