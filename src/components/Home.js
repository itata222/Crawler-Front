import React, { useEffect, useState } from "react";
import { getCrawlingStatus, runCrawler } from "../services/crawlerService";
import { containerStyles, list_to_tree, renderForeignObjectNode, useCenteredTree } from "../utils/treeCreation";
import Tree from "react-d3-tree";
import SummeryLine from "./SummeryLine";
import Spinner from "./Spinner";

const Home = () => {
  const [tree, setTree] = useState(null);
  const [depthResult, setdepthResult] = useState(0);
  const [totalPagesResult, setTotalPagesResult] = useState(0);
  const [rootUrl, setRootUrl] = useState("");
  const [maxDepth, setMaxDepth] = useState("");
  const [maxTotalPages, setMaxTotalPages] = useState("");
  const [QueueUrl, setQueueUrl] = useState("");
  const [workID, setWorkID] = useState(null);
  const [crawlerRunning, setCrawlerRunning] = useState(false);

  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 200, y: 200 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 1 };

  const submitForm = (e) => {
    e.preventDefault();
    if (parseInt(maxDepth) > 0)
      runCrawler({ rootUrl, maxDepth, maxTotalPages })
        .then((res) => {
          if (!!res.QueueUrl) {
            console.log("crwaler running!", res);
            setQueueUrl(res.QueueUrl);
            setWorkID(res.workID);
            setCrawlerRunning(true);
          }
        })
        .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (crawlerRunning) {
      const intervalID = setInterval(() => {
        console.log(crawlerRunning);
        getCrawlingStatus(QueueUrl, workID, maxDepth, maxTotalPages)
          .then((res) => {
            console.log("checking", res);
            if (!!res?.isfinished === true) {
              clearInterval(intervalID);
              setCrawlerRunning(false);
            }
            let highest = 0,
              total = 0;
            for (let i = 0; i < res.tree.length; i++) {
              res.tree[i] = JSON.parse(res.tree[i]);
              total++;
              if (res.tree[i].depth > highest) highest = res.tree[i].depth;
            }
            const sortedTree = res.tree.sort(function (a, b) {
              return a.position - b.position;
            });
            console.log(sortedTree);
            const treeStructure = list_to_tree(sortedTree);
            console.log(treeStructure[0], "treeStructure");
            setdepthResult(highest);
            setTotalPagesResult(total);
            setTree(treeStructure[0]);
          })
          .catch((e) => console.log(e));
      }, 5000);
    }
  }, [crawlerRunning, QueueUrl, maxTotalPages, workID]);

  return (
    <>
      {crawlerRunning && <Spinner />}
      <div className='home'>
        <h1>Crawler</h1>
        <form onSubmit={submitForm} className='crawler-form'>
          <input disabled={!!crawlerRunning} type='text' placeholder='root url' value={rootUrl} onChange={(e) => setRootUrl(e.target.value)} />
          <input
            className={parseInt(maxDepth) < 1 ? "input-error" : ""}
            disabled={!!crawlerRunning}
            type='number'
            name='maxDepth'
            placeholder='max depth'
            value={maxDepth}
            onChange={(e) => setMaxDepth(e.target.value)}
          />
          <input
            className={parseInt(maxTotalPages) < 1 ? "input-error" : ""}
            disabled={!!crawlerRunning}
            type='number'
            name='maxTotalPages'
            placeholder='max total pages'
            value={maxTotalPages}
            onChange={(e) => setMaxTotalPages(e.target.value)}
          />
          <button disabled={crawlerRunning}>Run Worker !</button>
        </form>
        {tree != null && (
          <>
            <SummeryLine rootUrl={rootUrl} depth={depthResult} childrens={totalPagesResult} />
            <div style={containerStyles} ref={containerRef}>
              <Tree
                data={tree}
                translate={translate}
                renderCustomNodeElement={(rd3tProps) => renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })}
                orientation='vertical'
                nodeSize={nodeSize}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
