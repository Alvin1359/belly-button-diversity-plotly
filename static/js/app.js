// function plots(id){ 
    // Read json
    d3.json("../../data/samples.json").then(data => {
        // console.log(data);

        // Grab values from the data json object to build the plots
        var sample_values = data.samples[0].sample_values.slice(0,10).reverse();
        var otu_ids = data.samples[0].otu_ids.slice(0,10).reverse();
        var otu_labels = data.samples[0].otu_labels.slice(0,10);
        // console.log(otu_ids);


        var otu_id_label = otu_ids.map(x => "OTU " + x);
        // Create the trace for bar plot
        var trace1 = {
            x: sample_values,
            y: otu_id_label,
            text: otu_labels,
            type: "bar",
            orientation: "h"
        };
        
        // Create the data array for the plot
        var data1 = [trace1];
        
        // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar", data1);
        
        
        // Create trace for bubble plot
        var trace2 = {
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
        var data2 = [trace2];
        
        // Create layout
        var layout2 = {
            xaxis:{title: "OTU ID"}
        }

        // Plot the chart to a div tag with id "bubble"
        Plotly.newPlot("bubble", data2, layout2);
    });
// }

// https://waustralia.bootcampcontent.com/the-university-of-western-australia/waus-perth-virt-data-pt-03-2021-u-c/-/tree/master/02-Homework/15-Interactive-Visualizations-and-Dashboards/Instructions
// https://github.com/v33na/Belly-Button-Biodiversity/blob/master/static/js/app.js