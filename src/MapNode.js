import React from "react";
import $ from 'jquery';

export default function MapNode(props) {
    const {
        node,
        onSelectNode
    } = props;



    return (
        <div id={node.key} class='mapNode' onClick={onSelectNode}>{node.key} </div>
    )
}