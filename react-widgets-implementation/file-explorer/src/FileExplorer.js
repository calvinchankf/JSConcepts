import { useState } from 'react';

const addIsExpand = nodes => {
    const result = []
    for (const node of nodes) {
        const updatedChildren = node.children !== undefined
            ? addIsExpand(node.children)
            : undefined

        result.push({
            id: node.id,
            name: node.name,
            children: updatedChildren,
            isExpanded: false
        })
    }
    return result
}

const rebuildTree = (nodes, targetToToggle, isExpandedOverride) => {
    const result = []
    for (const node of nodes) {

        // Only when the parent closes expansion, all children will close expansion
        let nextIsExpanded = isExpandedOverride === false ? isExpandedOverride : node.isExpanded

        if (node.id === targetToToggle) {
            nextIsExpanded = !node.isExpanded
        }

        const updatedChildren = node.children !== undefined
            ? rebuildTree(node.children, targetToToggle, nextIsExpanded)
            : undefined

        result.push({
            id: node.id,
            name: node.name,
            children: updatedChildren,
            isExpanded: nextIsExpanded
        })
    }
    return result
}

export default function FileExplorer({ data }) {

    const [tree, setTree] = useState(addIsExpand(data))

    const toggleNodeVisibility = (nodeId) => {
        setTree((prev) => rebuildTree(prev, nodeId))
    }

    console.log(tree)

    const renderTree = (nodes, depth = 0) => {
        return nodes.map((node) => {
            
            let expansionIndicator = null
            if (node.children) {
                if (node.isExpanded) {
                    expansionIndicator = <span>[-]</span>
                } else {
                    expansionIndicator = <span>[+]</span>
                }
            }

            return (
                <div key={node.id} style={{ paddingLeft: depth * 12 }}>
                    <div
                        onClick={() => toggleNodeVisibility(node.id)}
                    >
                        <span>{node.name}</span>
                        {expansionIndicator}
                    </div>
                    {node.children && node.isExpanded ? renderTree(node.children, depth + 1) : null}
                </div>
            )
        })
    }

    return (
        <div>
            {renderTree(tree)}
        </div>
    );
}
