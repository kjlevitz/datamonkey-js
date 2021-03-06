$(document).ready(function(){
  if(!in_progress()) {
    initialize_cluster_network_graphs();
  }
});

function in_progress() {
  return $('.progress').length > 0;
}

var initialize_cluster_network_graphs = function () {

  var network_container     = '#network_tag',
      network_status_string = '#network_status_string',
      network_warning       = '#main-warning',
      histogram_tag         = '#histogram_tag',
      histogram_label       = '#histogram_label',
      button_bar_prefix     = 'network_ui_bar',
      csvexport_label       = '#csvexport',
      fasta_export_label    = '#fasta-export',
      filter_edges_toggle   = '#network_ui_bar_toggle_filter_edges',
      graph_summary_tag     = '#graph_summary_table',
      cluster_table         = '#cluster_table',
      parent_container      = '#trace-results',
      node_table            = '#node_table';

  //Initialize clusternetworkgraph with json url
  var json_url = $("#hiv-cluster-report").data('hivtraceid') + '/trace_results';
  
  d3.json(json_url, function(data) {

    var graph = data.trace_results;

    d3.json (window.location.href + "/attributes", function (error, attributes) {

          var user_graph = new hivtrace.clusterNetwork(graph, network_container, network_status_string, network_warning, button_bar_prefix, attributes, filter_edges_toggle, cluster_table, node_table, parent_container, {"no_cdc" : true});
          hivtrace.histogramDistances(graph, histogram_tag, histogram_label);
          hivtrace.graphSummary(graph, graph_summary_tag);

          d3.select ("#graph-tab").classed ("disabled", false);
          d3.select ("#clusters-tab").classed ("disabled", false);
          d3.select ("#nodes-tab").classed ("disabled", false);
          d3.select ("#attributes-tab").classed ("disabled", false);

          hivtrace.misc.export_table_to_text ("#cluster-table-export", cluster_table);
          hivtrace.misc.export_table_to_text ("#node-table-export", node_table);

          $("#main-tab a[data-toggle='tab']").on ("shown.bs.tab", function (e) {
                if (user_graph.needs_an_update) {
                    user_graph.update(false, 0.5);
                }
          });
          $("#clusters-tab a[data-toggle='tab']").on ("shown.bs.tab", function (e) {
                user_graph.update_volatile_elements (d3.select (cluster_table));
          });
          $("#nodes-tab a[data-toggle='tab']").on ("shown.bs.tab", function (e) {
                user_graph.update_volatile_elements (d3.select (node_table));
          });

          if($('#lanl-trace-results').length > 0) {

            // Only if the comparison was done
            var lanl_network_container     = '#lanl-network_tag',
                lanl_network_status_string = '#lanl-network_status_string',
                lanl_network_warning       = '#lanl-main-warning',
                lanl_histogram_tag         = '#lanl-histogram_tag',
                lanl_histogram_label       = '#lanl-histogram_label',
                lanl_csvexport_label       = '#lanl-csvexport',
                lanl_button_bar_prefix     = 'lanl_network_ui_bar';

            var lanl_graph = data.lanl_trace_results;
            var lanl_graph_rendered = new hivtrace.clusterNetwork(lanl_graph, lanl_network_container, lanl_network_status_string, lanl_network_warning, lanl_button_bar_prefix, attributes, filter_edges_toggle, null, null, parent_container);
            //datamonkey.hivtrace.histogram(lanl_graph, lanl_histogram_tag, lanl_histogram_label);
          }

      });


      
    // TODO: Missing explanations parameter
    //d3.json (window.location.href + "/settings", function (error, settings) {
    //      datamonkey.hivtrace.analysis_settings (settings);
    //  });
  });

}
