//Load data
var friends = require("../data/friends");

//Routing
module.exports = function(app){
    app.get("/api/friends", function(request, response){
        response.json(friends);
    });

    app.post("/api/friends", function(request, response){
        //handle incoming survey results
        for(i=0; i<request.body.scores.length; i++){
            request.body.scores[i] = parseInt(request.body.scores[i].slice(0, 1));
        }
        
        //compatibility logic
        var differenceArray = [];
        for(i=0; i<friends.length; i++){
            var totalDifference = 0;
            for(j=0; j<friends[i].scores.length; j++){
                totalDifference += Math.abs(request.body.scores[j] - friends[i].scores[j]);
            }
            differenceArray.push(totalDifference);
        }

        var smallestDifferenceIndex;
        var smallestDifference = 0;
        for(i=0; i<differenceArray.length; i++){
            if(differenceArray[i] < smallestDifference || i === 0){
                smallestDifferenceIndex = i;
                smallestDifference = differenceArray[i];
            }
        }

        response.json(friends[smallestDifferenceIndex]);

        friends.push(request.body);
    });
}
