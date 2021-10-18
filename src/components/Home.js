import React, { useEffect, useState } from 'react';
import { getCrawlingStatus, runCrawler } from '../services/crawlerService';
import DataBlock from './DataBlock';
import SummeryLine from './SummeryLine';

const Home = () => {
    const [tree, setTree] = useState([]);
    const [rootUrl, setRootUrl] = useState('');
    const [maxDepth, setMaxDepth] = useState('');
    const [maxTotalPages, setMaxTotalPages] = useState('');
    const [QueueUrl, setQueueUrl] = useState('');

    // const [currentDepth, setCurrentDepth] = useState('');
    // const [currentChildrens, setCurrentChildrens] = useState('');
    const [crawlerRunning, setCrawlerRunning] = useState(false);
    

    const submitForm=(e)=>{
        e.preventDefault();
        if(parseInt(maxDepth)>0)
            runCrawler({rootUrl,maxDepth,maxTotalPages}).then((res)=>{
                if(!!res.QueueUrl){
                    console.log('crwaler running!',res)
                    setQueueUrl(res.QueueUrl)
                    setCrawlerRunning(true)
                }
            }).catch(e=>console.log(e))
    }

    useEffect(() => {
        if(crawlerRunning){
            const intervalID= setInterval(() => {
                console.log(crawlerRunning)
                getCrawlingStatus(QueueUrl).then(res=>{
                    console.log('checking',res)
                    if(!!res?.tree){
                        console.log(res.tree)
                        clearInterval(intervalID)
                        for(let i=0;i< res.tree.length;i++)
                           res.tree[i]=JSON.parse(res.tree[i])
                        setTree(res.tree)
                        setCrawlerRunning(false)
                        // setCurrentDepth(res.currentDepth||1)
                        // setCurrentChildrens(res.currentChildrens||20)
                    }
                }).catch(e=>console.log(e))
            }, 5000);
        }
    }, [crawlerRunning,QueueUrl]);
    
    
    return (
        <div className="home">
            <h1>Crawler</h1>
            <form onSubmit={submitForm} className="crawler-form">
                <input disabled={!!crawlerRunning} type="text" placeholder="root url" value={rootUrl} onChange={(e)=>setRootUrl(e.target.value)}/>
                <input className={parseInt(maxDepth)<1?'input-error':''} disabled={!!crawlerRunning} type="number" name="maxDepth" placeholder="max depth" value={maxDepth} onChange={(e)=>setMaxDepth(e.target.value)}/>
                <input className={parseInt(maxTotalPages)<1?'input-error':''} disabled={!!crawlerRunning} type="number" name="maxTotalPages" placeholder="max total pages" value={maxTotalPages} onChange={(e)=>setMaxTotalPages(e.target.value)}/>
                <button disabled={crawlerRunning}>Run Worker !</button>
            </form>
            {
                tree.length>0&&
                <>
                    <SummeryLine rootUrl={rootUrl} depth={tree[tree.length-1].depth} childrens={tree.length}/>
                    {
                        tree.map((node,i)=>(
                            <DataBlock key={node} dataBlock={node} i={i}/>
                        ))
                    }
                </>
                
            }
        </div>
    )
}

export default Home
