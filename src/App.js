import React, { useState, useEffect } from 'react';
import './App.css';
import MapCanvas from './MapCanvas';

import { getMapTopology, getBestRoute } from './apiController'




function App() {
  const [mapNodeTopo, setMapNodeTopo] = useState([]);
  const [mapPathTopo, setMapPathTopo] = useState([]);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [selectedFromStart, setSelectFromStart] = useState(true);    // Determines if user is selecting starting node or end node.



  /**
   * 
   */
  function handleFindRoute() {
    // if starting and/ or ending node has not been selected.
    if (startNode == null || endNode == null) {
      return;
    }
    // if start node is same as end node.
    if (startNode.id === endNode.id) {
      return;
    }
    // Make a prompt for error ^^^

    
    (async function() {
      try {
        let bestMapData = await getBestRoute(startNode.id, endNode.id);
        console.log("best links -->", bestMapData.links);

        let [updatedMapNodes, updatedMapPaths] = updateMapState(bestMapData.nodes, bestMapData.links)
        // console.log("updated nodes", updatedMapNodes);


        //now change the map highlighted nodes and...
        //  either update it manually through function
        // or 
        //  change state and use a 'useEffect'     <-----------
        setMapNodeTopo(updatedMapNodes);
        setMapPathTopo(updatedMapPaths);
      } catch (error) {
        console.log("getBestRoute ERROR --->", error)
      }
    })();


  }



  /**
   * Helper function to second 'handleFindRouteI()'
   * @param {*} bestNodes 
   * @param {*} bestPaths 
   * @returns 
   */
  function updateMapState(bestNodes, bestPaths) {
    let nodes = [...mapNodeTopo];
    let paths = [...mapPathTopo];


    let tempNodes = nodes.map(node => {
      if (!bestNodes.find(best => best.id === node.id)) {
        node.highlight = false;

      } else {
        node.highlight = true;
      }

      return node;
    })

    
    let tempPaths = paths.map(path => {
      //  "|| (best.id[1]+best.id[0]) === path.id)"
      //  Un-directional graphs only require 1 link between nodes.
      //  Un-directional graphs are set up so link.id="46" exists but link.id="64" does not.
      //  Depending on the traversal of best path in API, id could be "46" or "64".
      if (bestPaths.find(best => best.id === path.id || (best.id[1]+best.id[0]) === path.id)) {
        path.highlight = true;

      } else {
        path.highlight = false;
      }

      return path;
    })
    
    

    return [tempNodes, tempPaths]
  }



  /**
   * Triggered when user selects starting and ending node.
   * @param {} e 
   */
  function handleNodeSelection(node) {
    // console.log("handling node selection -->", node.id)
    let prev_node;


    // If user changed the starting node.
    if (selectedFromStart) {
      if (startNode !== node) {       // Do not bother changing colours if node was already selected previously/ already.
        if (endNode === node) {       // If selected startNode is previous best route endNode
          setEndNode(null)
        }
        prev_node = startNode;
        setStartNode(node);
      }

    } else {
      if (endNode !== node) {           // Do not bother changing colours if node was already selected previously/ already.
        if (startNode === node) {       // If selected endNode is previous best route startNode
          setStartNode(null);
        }
        prev_node = endNode;
        setEndNode(node);
      }

    }

    setSelectFromStart(!selectedFromStart);
    
    node.selected = true;              // Change json value.

    // Reset preveious selected node
    if (prev_node != null) {
      prev_node.selected = false;     // Change json value.
      
    }

    changeNodeColour(node, prev_node);
  }


  /**
   * Helper function to 'handleNodeSelection()'
   * @param {*} node_key 
   */
  function changeNodeColour(node, prev_node) {
    if (prev_node!=null) {
      prev_node.color = "green";
    }

    // Negation on 'selectedFromStart' isn't needed since the page hasn't rendered after 'setSelectFromStart'
    if (selectedFromStart) {
      node.color = "red";
    } else {
      node.color = "yellow";
    }

  }


  

  // Initial get map(do once)
  useEffect(() => {
    // fetch. '(async functino() {' ussed as a work around for 'Promise' returned from 'fetch'.
    (async function() {
      try {
        const mapPromise = await getMapTopology();
        // console.log("test", mapPromise)
        let apiNodes = mapPromise.nodes;
        let apiPaths = mapPromise.links;

        // then
        // populate 'mapNodeTopo' & 'mapPathTopo'
        setMapNodeTopo(apiNodes);
        setMapPathTopo(apiPaths);
      } catch (error) {
        console.log("getMapTopo ERROR --->", error)
      }
    })();
    
   }, []);



  useEffect(() => {
    // js to change colours
    mapNodeTopo.forEach(node => {
      if (node.selected) {
        node.color = (node===startNode) ? "red": "yellow";
        // console.log("color test node:", node.id)
      } else if (node.highlight) {
        node.color = "green";
      } else{
        node.color = null;
      }
    })

    mapPathTopo.forEach(path => {
      if (path.highlight) {
        path.color = "green";
        // console.log("color path -->", path.source.id, "to", path.target.id, "color is:", path.color)
      } else {
        path.color = "grey";
        // console.log("NO color path -->", path.source.id, "to", path.target.id, "color is:", path.color)
      }

    })

    

    
  }, [mapNodeTopo ,mapPathTopo])



  return (
    <>
      <MapCanvas 
        mapNodeTopo={mapNodeTopo}
        mapPathTopo={mapPathTopo}
        onSelectNode={handleNodeSelection}
        onBestRouteClick={handleFindRoute}
      /> 
    </>
  );
}

export default App;
