import React from 'react'

const DataBlock = ({dataBlock,i}) => {
    console.log(dataBlock)
    //data block should consist url and depth

    const dataBlockClicked=()=>{
        console.log('data block clicked')
    }

    return (
        <div className="dataBlock" onClick={dataBlockClicked} style={{transform:`translatex(${i*5}px)`}}>
           <span>{dataBlock.myAddress}</span>
        </div>
    )
}

export default DataBlock
