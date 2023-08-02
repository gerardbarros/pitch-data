const singlePitchButton = $("#single-pitch-data")
const multiPitchButton = $("#multi-pitch-data")

getPlayString = function(play) {
    let inning = "Top";
    if (play.inning_half === 1) {
        inning = "Bot";
}

    return ` 
        <strong>Pitcher:</strong> ${play.pitcher_name} 
        <br>
        <strong>Pitch Name:</strong> ${play.pitch_name} 
        <br>
        <strong>Pitch Type:</strong> ${play.pitch_type}
        <br> 
        <strong>Plate Speed:</strong> ${Math.round(play.plate_speed)}
        <br> 
        <strong>Initial Speed:</strong> ${Math.round(play.initial_speed)} MPH
        <br>`;
}



singlePitchButton.on("click", function() {
    $.ajax({
    type: "GET",
    url: "https://raw.githubusercontent.com/rd-astros/hiring-resources/master/pitches.json",
    data: [],
    success: function(res) {
        const json = $.parseJSON(res);
        const pitches = json.queryResults.row;
        // Following code is provided via the template
            for(let i = 0; i < pitches.length; i++) {
            let p = pitches[i];
            if(p.event_result !== "") {
                $(".single-pitch-events").append("<li>"+getPlayString(p)+"</li>")
            }
        }
        console.log(pitches[0].pitcher_name, pitches[0].pitch_number)
    }
	});
});

$("#hide-single-pitch-data").click(function(){
    $(".single-pitch-events").toggle();
});

multiPitchButton.on("click", function() {
    $.ajax({
    type: "GET",
    url: "https://raw.githubusercontent.com/rd-astros/hiring-resources/master/pitches.json",
    data: [],
    success: function(res) {
        const json = $.parseJSON(res);
        const pitches = json.queryResults.row;
        // Following code is provided via the template
            for(let i = 0; i < pitches.length; i++) {
            let p = pitches[i];
            if(p.event_result !== "") {
                $(".multi-pitch-events").append("<li>"+getPlayString(p)+"</li>")
            }
        }
        console.log(pitches[1].pitcher_name, pitches[1].pitch_number)
    }
	});
});

$("#hide-multi-pitch-data").click(function(){
    $(".multi-pitch-events").toggle();
});

// Search single list
$(document).ready(function(){
    $("#single-pitch-search").on("keyup", function() {
        let value = $(this).val().toLowerCase();
        $("#single-pitch-list li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

// Search multi list
$(document).ready(function(){
    $("#multi-pitch-search").on("keyup", function() {
        let value = $(this).val().toLowerCase();
        $("#multi-pitch-list li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});


