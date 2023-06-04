

class AdjacencyMatrix {
    /**
     * 
     * @param {int} V "Number of verticies in graph."
     * @param {Boolean} undirected "Is the graph undirected."
     */
    constructor (V, undirected=true) {
        // this.GRAPH = new Array(V).fill(Array(V).fill(0));
        this.GRAPH = [];
        this.IsUndirected = undirected;
        for (let i=0; i<V; i++) {
            this.GRAPH.push(
                Array(V).fill(0)
            )
        }
    }



    /**
     * Add a new edge along x & y nodes in the graph. 
     * @param {Int} x 
     * @param {Int} y 
     * @param {Int} weight 
     */
    addWeightedEdge(x, y, weight=0) {
        if (this.IsUndirected) {
            this.GRAPH[x][y] = weight;
            this.GRAPH[y][x] = weight;

        } else {
            this.GRAPH[x][y] = weight;
        }
        
    }



    printGraph() {
        // Traverse the Adj[][]
        for (let i=0; i<this.GRAPH.length; i++) {
            let graphLine = "";
            for (let j=0; j<this.GRAPH[i].length; j++) {

                graphLine += this.GRAPH[i][j];
            }
            console.log(graphLine);
            
    }
    
}


}


exports.AdjacencyMatrix = AdjacencyMatrix;



// a = [[0,0,0],
//      [1,0,0],
//      [0,0,3]]

//      console.log(a)

//      a[2][2] = 8
//      console.log(a)





// a = new AdjacencyMatrix(3, false);
// a.addWeightedEdge(0,1,5);
// a.addWeightedEdge(1,0,4);
// a.addWeightedEdge(2,1,7);

// console.log(a.GRAPH)

// for (let i=0; i<a.GRAPH.length; i++) {
//     console.log(i)
//     console.log("test", a.GRAPH[i])
// }

// a.printGraph();