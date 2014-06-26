
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
    var sessionCheck = Meetings.find({name: "Mobile Dev Class # 2"}).fetch();;
    console.log(sessionCheck);
    if (sessionCheck[0]) {
      console.log(sessionCheck[0]._id);
      Meetings.update({_id: sessionCheck[0]._id},
                    {$set:
                      { students:
                        {
                          name: "Lawrence",
                          studentnumber: 5,
                          attendance: "not here"
                        }
                      }
                    });
      var students = Students.find(Session.get("selected_student")).fetch();
      console.log(students);
      console.log('session exists');
    } else  {
      Meetings.insert(
      {
        date: Date(),
        name: "Mobile Dev Class # 2",
        number: 3,
        course: Meetings.insert( {
                courses: "_id"}),    //link to document in course collection...
        students: {
          name: "Tyson",
          studentnumber: 4,
          attendance: "here"
        }
      })
      console.log("need to insert Meetings");
    }
  },
  'click input.not_here': function() {
    Students.update({_id: Session.get("selected_student")},
        {$set:
          { attendance: "not here"}
        });
    var students=Students.find(Session.get("selected_student")).fetch();
    console.log(students);
  },
  'click input.late': function() {
      Students.update({_id: Session.get("selected_student")},
        {$set:
          { attendance:"late"}
        });
      var students=Students.find(Session.get("selected_student")).fetch();
    console.log(students);
  }
});

