
Template.leaderboard.students = function () {
  return Students.find({});
};

Template.leaderboard.selected_name = function () {
  var student = Students.findOne(Session.get("selected_student"));
  return student && student.name;
};

Template.student.selected = function () {
  return Session.equals("selected_student", this._id) ? "selected" : '';
};

Template.leaderboard.events({
  'click input.inc': function () {
    Students.update(Session.get("selected_student"), {$inc: {score: 5}});
  },
  'mouseup input.remove': function () {
    console.log('i felt that');
    Students.remove(Session.get("selected_student"));
  }
});

Template.student.events({
  'click': function () {
    Session.set("selected_student", this._id);
  },
  'click input.present': function () {
    Students.update({_id: Session.get("selected_student")},
                    {$set:
                      { attendance: "yes"}
                    });
    var students = Students.find(Session.get("selected_student")).fetch();
    console.log(students);
  },
  'click input.not_here': function() {

  },
  'click input.late': function() {

  }
});

