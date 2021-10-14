import React from 'react'

const DataBlock = ({dataBlock}) => {

    //data block should consist url and depth

    const dataBlockClicked=()=>{
        console.log('data block clicked')
    }

    return (
        <div className="dataBlock" onClick={dataBlockClicked}>
           <span>{dataBlock}</span>
        </div>
    )
}

export default DataBlock
