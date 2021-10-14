import React from 'react'

const SummeryLine = ({rootUrl,depth,childrens}) => {

    return (
        <div className="summeryLine">
            <div className="headers">
                <span>Root Url</span>
                <span>Total Childrens</span>
                <span>Depth</span>
            </div>
            <div className="values">
                <span>{rootUrl}</span>
                <span>{childrens}</span>
                <span>{depth}</span>
            </div>
        </div>
    )
}

export default SummeryLine
