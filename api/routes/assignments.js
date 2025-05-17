const assignment = require('../model/assignment');
let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res) {
    Assignment.find((err, assignments) => {
        if (err) {
            res.send(err)
        }
        res.send(assignments);
    });
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
    let assignmentId = req.params.id;

    Assignment.findOne({ id: assignmentId }, (err, assignment) => {
        if (err) { res.send(err) }
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.name = req.body.name;
    assignment.dueDate = req.body.dueDate;
    assignment.submitted = req.body.submitted;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save((err) => {
        if (err) {
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.name} saved!` })
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({ message: 'updated' })
        }
        // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    Assignment.findOneAndDelete({ id: req.params.id }, (err, assignment) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!assignment) {
            return res.status(404).send('Assignment not found');
        }
        res.json(`${assignment.name} deleted`);
    });
}

module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
