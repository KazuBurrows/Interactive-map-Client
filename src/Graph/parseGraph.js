const { AdjacencyMatrix } = require("./AdjacentMatrix.js");

/** DATA COMES FROM API AS JSON e.g
  Nodes [
    {key:'A', highlight:false, x_coord:0, y_coord:0},
    {key:'B', highlight:false, x_coord:0, y_coord:0}
  ]
  Paths [
    {key:'AB', highlight:false, x_coord:0, y_coord:0},
    {key:'BD', highlight:false, x_coord:0, y_coord:0}
  ]

  API will provide this data for BEST PATH as well,
    rely on REACT to update only changed data.
/*



/**
 * Construct an ajacency matrix
 * @param {json} json_AdjMatrix 
 * @returns {AdjacencyMatrix}
 */
export function constructAdjMatrix(json_AdjMatrix) {

    let graph_v = json_AdjMatrix[0].v;
    let graph_u = json_AdjMatrix[0].u;
    var myGraph = new AdjacencyMatrix(graph_v, graph_u);
    let graph_x, graph_y, graph_w;
    for (let i=1; i<json_AdjMatrix.length; i++) {
      graph_x = json_AdjMatrix[i].x;
      graph_y = json_AdjMatrix[i].y;
      graph_w = json_AdjMatrix[i].w;
    
      myGraph.addWeightedEdge(graph_x,graph_y,graph_w);
    
    }
    
    // console.log(myGraph)

    return myGraph;
}


/**
 * 
 * @param {AdjacencyMatrix} adjMatrix 
 * @returns {Array} "Array of 'node' objects."
 */
export function extractNodes(adjMatrix) {
    // is it directed?
    let allNodes = [];

    let V = adjMatrix.Vl
    for (let i=0; i<V; i++) {
      allNodes.push(adjMatrix[i]);
    }

}



// export default constructAdjMatrix;