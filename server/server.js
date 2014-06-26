
Meteor.startup(function () {
	Students.remove({});
	if (Students.find().count() === 0) {
      var names = ["Lawrence Ng",
                   "Santiago Fonseca",
                   "Farrah Wong",
                   "Sabrina On",
                   "Simran Kumar"];
      for (var i = 0; i < names.length; i++)
        Students.insert({name: names[i]});
    }
});

