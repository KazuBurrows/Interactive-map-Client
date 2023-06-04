import React, {useRef} from "react";

import { ForceGraph2D } from 'react-force-graph';



export default function MapCanvas(props) {
    const {
        mapNodeTopo,
        mapPathTopo,
        onSelectNode,
        onBestRouteClick
    } = props;

    let myData = {'nodes': mapNodeTopo, 'links': mapPathTopo}
    const fgRef = useRef();
    return (
        <div class='mapCanvas'>
            <button onClick={onBestRouteClick}>Find route</button>
             <ForceGraph2D
                ref={fgRef}
                id='forceGraph'
                graphData={myData}
                onNodeClick={onSelectNode}
                onRenderFramePost={() => {
                    if (fgRef.current) {
                        fgRef.current.zoomToFit(0,100)
                    }
                }}
             />

        </div>
    )
}

