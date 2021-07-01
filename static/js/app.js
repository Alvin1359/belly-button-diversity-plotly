// Function to create plots
function plots(subjectId){ 
    // Read json data
    d3.json("../../data/samples.json").then(data => {
        
        // Filter data according to id
        var filteredData = data.samples.filter(d => d.id == subjectId)
        console.log(filteredData);
        
        // Grab values from the data json object to build the plots
        var sample_values = filteredData[0].sample_values
        var otu_ids = filteredData[0].otu_ids
        var otu_labels = filteredData[0].otu_labels
        var otu_id_label = otu_ids.map(x => "OTU " + x);
        
        // =============================
        //          BAR CHART
        // =============================
        // Create the trace for bar plot
        var traceBar = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_id_label.slice(0,10).reverse(),
            text: otu_labels,
            type: "bar",
            orientation: "h"
        };
        
        // Create the data array for the bar plot
        var dataBar = [traceBar];
        
        // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar", dataBar);
        
        // =============================
        //          BUBBLE PLOT
        // =============================

        // Create trace for bubble plot
        var traceBubble = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids
            },
            text: otu_labels
        };

        // Create the data array for the plot
        var dataBubble = [traceBubble];
        
        // Create layout
        var layoutBubble = {
            xaxis:{
                title: "OTU ID"
            }
        }

        // Plot the chart to a div tag with id "bubble"
        Plotly.newPlot("bubble", dataBubble, layoutBubble);

        // =============================
        //          GAUGE CHART
        // =============================


    });
}


// Function to get demographic information table
function demographicInfo(subjectId) {
    // Read the json file to get data
        d3.json("../../data/samples.json").then((data)=> {

            // Metadata info for the demographic info
            var metadata = data.metadata;
    
            // Filter info by subjectId
            var result = metadata.filter(meta => meta.id.toString() == subjectId)[0];
            
            // Insert into sample-metadata
            var demographicInfo = d3.select("#sample-metadata");
            
            // Remove text from demographic info
            demographicInfo.html("");
    
            // Append info to panel
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toLowerCase() + ": " + key[1] + "\n");    
            });
        });
    }


// Function to initialise page plots
function init() {
    // Read json data
    d3.json("../../data/samples.json").then((data) => {
        
        // Select drop down menu
        var dropDownMenu = d3.select("#selDataset");

        // Get subjectId from dropdown
        data.names.forEach(function (name) {
            dropDownMenu.append("option").text(name).property("value");
        });
        
        // Call functions to plot graphs and show subject info
        plots(data.names[0]);
        demographicInfo(data.names[0]);
    });
}


// Function to change plots
function optionChanged(){
    // Select drop down menu
    var dropdownMenu = d3.select("#selDataset");

    // Assign the value of the dropdown menu option to a variable
    var subjectId = parseInt(dropdownMenu.property("value"));

    // Call back functions to update plots
    plots(subjectId);
    demographicInfo(subjectId);
}

// Initialise page
init();