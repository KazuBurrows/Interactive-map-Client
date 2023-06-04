


var myHeaders = new Headers();
myHeaders.append('Access-Control-Allow-Origin', "*");
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const BASE_URL = "https://interactivemapapi.herokuapp.com/map";
// const TANGENT_URL = "/map";
// const TANGENT_BEST_URL = "/%${start}&%${end}";




/**
 * Fetches the map topology from the api.
 * @returns {Array} "Returns 2 arrays with json. [[json], [json]]"
 */
async function getMapTopology() {
    let json_nodes, json_paths;
    return await fetch(BASE_URL, requestOptions)
    .then(res => res.json())
    .then(data => {
        json_nodes = data.nodes;
        json_paths = data.links;


        // json_paths.forEach(path => {
        //     console.log(path.id)
        //     if (path.id === "64") {
        //         console.log("found path 64")
        //     }
        // });

        // console.log("json_nodes -->", json_nodes)
        // console.log("json_paths -->", json_paths)
        return {'nodes': json_nodes, 'links': json_paths};
    })
}



/**
 * Fetches best route from start node to end.
 * @param {*} start "Starting node."
 * @param {*} end "Ending node."
 * @returns {Array} "Best route nodes and paths. [[json], [json]]"
 */
async function getBestRoute(start, end) {
    let json_nodes, json_paths;
    const TANGENT_BEST_URL = `/${start}&${end}`;

    return await fetch(BASE_URL+TANGENT_BEST_URL, requestOptions)
    .then(res => res.json())
    .then(data => {
        json_nodes = data.nodes;
        json_paths = data.links;


        // json_paths.forEach(path => {
        //     console.log(path)
        // });

        // console.log("best links -->", json_paths[0].source)
        return {'nodes': json_nodes, 'links': json_paths};
    })
}


export { getMapTopology, getBestRoute }