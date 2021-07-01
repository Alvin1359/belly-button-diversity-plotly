// Function to initialise page plots
function init() {
    // Read json data
    d3.json("../../data/samples.json").then((data) => {
        
        // Select drop down menu
        var dropDownMenu = d3.select("#selDataset");

        // Get id names to menu
        data.names.forEach(function (name) {
            dropDownMenu.append("option").text(name).property("value");
        });
        
        // Call functions to plot graphs and subject info
        plots(data.names[0]);
        demographicInfo(data.names[0]);
    });
}


// Function to create plots
function plots(subjectId){ 
    // Read json data
    d3.json("../../data/samples.json").then(data => {
        console.log(data);

        // Grab values from the data json object to build the plots
        var sample_values = data.samples[0].sample_values.slice(0,10).reverse();
        var otu_ids = data.samples[0].otu_ids.slice(0,10).reverse();
        var otu_labels = data.samples[0].otu_labels.slice(0,10);
        var otu_id_label = otu_ids.map(x => "OTU " + x);
        
        
        // Create the trace for bar plot
        var traceBar = {
            x: sample_values,
            y: otu_id_label,
            text: otu_labels,
            type: "bar",
            orientation: "h"
        };
        
        // Create the data array for the bar plot
        var dataBar = [traceBar];
        
        // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar", dataBar);
        
        

        // Create trace for bubble plot
        var traceBubble = {
            x: data.samples[0].otu_ids,
            y: data.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: data.samples[0].sample_values,
                color: data.samples[0].otu_ids
            },
            text: data.samples[0].otu_labels
        };

        // Create the data array for the plot
        var dataBubble = [traceBubble];
        
        // Create layout
        var layoutBubble = {
            xaxis:{title: "OTU ID"}
        }

        // Plot the chart to a div tag with id "bubble"
        Plotly.newPlot("bubble", dataBubble, layoutBubble);
    });
}


// Function to get demographic information table
function demographicInfo(subjectId) {
    // read the json file to get data
        d3.json("../../data/samples.json").then((data)=> {

            // get the metadata info for the demographic panel
            var metadata = data.metadata;
    
            // filter meta data info by id
            var result = metadata.filter(meta => meta.id.toString() === subjectId)[0];
            
            // select demographic panel to put data
            var demographicInfo = d3.select("#sample-metadata");
            
            // empty the demographic info panel each time before getting new id info
            demographicInfo.html("");
    
            // grab the necessary demographic data data for the id and append the info to the panel
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").append("strong").text(key[0].toLowerCase() + ": " + key[1] + "\n");    
            });
        });
    }


// Function to change plots
function changePlot(subjectId){
    plots(subjectId);
    demographicInfo(subjectId);
}


// Initialise page
init();