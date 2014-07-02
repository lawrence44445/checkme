Template.newCourses.events({
  'click .attendence-tracker': function () {
    Session.set("view_tracker", true);
  }
})

Template.newCourses.events({
  'click input.new_Course': function() {
    var new_course=document.getElementById("new_course_name").value;
    Courses.insert({name: new_course});
    var allCourses = Courses.find({}).fetch();
    console.log(allCourses);
  }
})

Template.newCourses.courses = function () {
  console.log(Courses.find({}));
  return Courses.find({});
}


Template.newCourses.isTrackerTrue = function () {
  var checkTracker = Session.get("view_tracker");
  return checkTracker;
}

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
    var sessionCheck = Meetings.find({name: "Mobile Dev Class # 2"}).fetch();
    console.log(sessionCheck);
    if (sessionCheck[0]) {
      console.log(sessionCheck[0]._id);

    var newStudent = {
      name: Students.findOne(Session.get("selected_student")).name,
      studentnumber: Students.findOne(Session.get("selected_student"))._id,
      attendance: "here"
    };


     Meetings.update(
                      {_id: sessionCheck[0]._id},
                      {$addToSet:
                        { studentsArray: newStudent
                        }
                       });

     var doubleCheck = Meetings.find({name: "Mobile Dev Class # 2"}).fetch();
    console.log(doubleCheck);
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
                course: "_id" }),    //link to document in course collection...
        studentsArray: [
                        {
                          name: Students.findOne(Session.get("selected_student")).name,
                          studentnumber: Students.findOne(Session.get("selected_student"))._id,
                          attendance: "here"
                        }
                      ]
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


