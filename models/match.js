var mongoose = require('mongoose');

var MatchSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  matchnumber: {
    type: String,
    required: true,
  },
  alliance: {
    type: String,
    required: true,
  },
  teamnumber: {
    type: String,
    required: true,
  },
  teamname: {
    type: String,
    required: true,
  },
  autoscore: {
    type: String,
    required: true,
  },
  driverscore: {
    type: String,
    required: true,
  },
  endscore: {
    type: String,
    required: true,
  },
  totalscore: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  }
});

MatchSchema.statics.getData = function (username, matchnumber, alliance, callback) {
  Match.findOne({ username: username, matchnumber: matchnumber, alliance:alliance})
    .exec(function (err, match) {
      if (err) {
        return callback(err)
      } else if (!match) {
        var err = new Error('Data not found.');
        err.status = 401;
        return callback(err);
      }
      return callback(null,match);
  });
}

var Match = mongoose.model('Matches', MatchSchema);
module.exports = Match;