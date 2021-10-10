import React from 'react'

const DataBlock = ({dataBlock}) => {

    const dataBlockClicked=()=>{
        console.log('data block clicked')
    }

    return (
        <div className="dataBlock" onClick={dataBlockClicked}>
           <span>{dataBlock.url}</span>
        </div>
    )
}

export default DataBlock
