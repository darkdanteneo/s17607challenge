const router = require('express').Router();
let Team = require('../models/team.model');
router.route('/').get((req, res) =>{
    Team.find()
    .then(team=>res.json(team))
    .catch(err=> res.status(400).json('Error:' + err));
});

router.route('/add').post((req, res)=>{
    const team_name = req.body.team_name;
    const wins = Number(req.body.wins);
    const losses =Number(req.body.losses);
    const ties = Number(req.body.ties);
    const score = Number(req.body.score);
    const newTeam = new Team({team_name, wins, losses, ties, score});
    newTeam.save()
});
router.route('/update').post((req, res)=>{
    Team.findOne({ team_name: req.body.team_name})
    .then(team => {
        team.team_name = req.body.team_name;
        team.wins += req.body.wins;
        team.losses += team.losses + req.body.losses;
        team.ties += team.ties + req.body.ties;
        team.score += req.body.score;

        team.save()
        .then(() => res.json('Team Updated'))
        .catch(err => res.status(400).json('Error:'+ err));
    })
});

module.exports = router;