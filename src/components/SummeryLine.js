import React from 'react'

const SummeryLine = ({rootUrl,currentDepth,currentChildrens}) => {
    const rootTitle='google.com'
    const children=10
    const depth=2
    return (
        <div className="summeryLine">
            <div className="headers">
                <span>Root Url</span>
                <span>Current Childrens</span>
                <span>Current Depth</span>
            </div>
            <div className="values">
                <span>{rootUrl||rootTitle}</span>
                <span>{currentChildrens||children}</span>
                <span>{currentDepth||depth}</span>
            </div>
        </div>
    )
}

export default SummeryLine
