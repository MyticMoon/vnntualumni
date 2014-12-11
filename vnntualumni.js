if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);
  Session.setDefault("input_name", false);
  Session.setDefault("question_done", false);
//   var myjson = {};
//   myjson = JSON.parse(Assets.getText("doc.json"));
//   Session.setDefault("doc", myjson);

  Template.nameinput.helpers({
    counter: function () {
      return Session.get("counter");
    },
    input_name: function() {
      return Session.get("input_name");
    },
    calculate_result: function() {
      Meteor.call('getDocJson', function (error, result) {
        var name = Session.get("input_name");
        var tmp = "";
        var temp = result.forEach(function(re){
          if(re.Name.toUpperCase() === name.toUpperCase()) {
            console.log("successful");
            console.log(re.Class);
            tmp = re.Class;
            Session.set("finalResult", re.Class);
          }
        });
        return temp;
      });
      
    },
    print_result: function() {
      return Session.get("finalResult");
    }
  });
  
  Template.nameinput.ifThereIsNoName = function() {
    return !Session.get("input_name");
  }
  
  Template.nameinput.questionNotDone = function () {
    return !Session.get("question_done");
  }

  Template.nameinput.events({
    'click button.redo': function () {
      // increment the counter when button is clicked
      Session.set("input_name", false);
      Session.set("input_name", false);
      Session.set("question_done", false);
      Session.set("finalResult", "Your are wierd, please contact the organizer!")
    },
    'keypress input.name': function (evt, template) {
      if (evt.which === 13) {
        var input_name = template.find(".name").value;
        Session.set("input_name", input_name);
      }
    },
    
    'click button.finish': function() {
      Session.set("question_done", true);
    }
  });
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    //     myobject = HTTP.get("http://localhost:3000/doc.json").data;
    //     Session.set("doc", myobject);
    Meteor.methods({
      
      getDocJson: function() {
        var myjson = {};
        myjson = JSON.parse(Assets.getText("pdoc.json"));
        return myjson;
      },
      
      getCurrentTime: function () {
        console.log('on server, getCurrentTime called');
        return new Date();
      },

      welcome: function (name) {
        console.log('on server, welcome called with name: ', name);
        if(name==undefined || name.length<=0) {
          throw new Meteor.Error(404, "Please enter your name");
        }
        return "Welcome " + name;
      }
    });
    
  });
  
  //Session.setDefault("doc", myjson);
}
