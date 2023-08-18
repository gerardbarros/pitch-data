const singlePitchButton = $("#single-pitch-data")
const multiPitchButton = $("#multi-pitch-data")

getSinglePlayString = function(play) {
    let inning = "Top";
    if (play.inning_half === 1) {
        inning = "Bot";
}
    return `
        <strong>Pitcher Name:</strong> ${play.pitcher_name} 
        <br>
        <strong>Pitch Name:</strong> ${play.pitch_name} 
        <br>
        <strong>Pitch Type:</strong> ${play.pitch_type}
        <br> 
        <strong>Plate Speed:</strong> ${Math.round(play.plate_speed)} MPH
        <br> 
        <strong>Initial Speed:</strong> ${Math.round(play.initial_speed)} MPH
        <br>`;
}

getMultiPlayString = function(play) {
    let inning = "Top";
    if (play.inning_half === 1) {
        inning = "Bot";
}
    return `
        <tbody id="myTable">    
            <tr>
                <td>${play.pitcher_name} </td>
                <td>${play.pitch_name}</td>
                <td>${play.pitch_type}</td>
                <td>${Math.round(play.plate_speed)}</td>
                <td>${Math.round(play.initial_speed)}</td>
            </tr>
        </tbody>`;
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
                $(".single-pitch-events").append("<li>"+getSinglePlayString(p)+"</li>")
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
                $(".multi-pitch-events").append("<tbody>"+getMultiPlayString(p)+"</tbody>")
            }
        }
        console.log(pitches[1].pitcher_name, pitches[1].pitch_number)
    }
	});
});

$("#hide-multi-pitch-data").click(function(){
    $(".multi-pitch-events").toggle();
});


// Search multi list
$(document).ready(function(){
    $("#multi-pitch-search").on("keyup", function() {
        let value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});


