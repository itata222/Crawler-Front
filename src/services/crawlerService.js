import Axios from "axios";

const developmentDB = process.env.REACT_APP_DB;

export const runCrawler = async (parameters) => {
  try {
    const res = await Axios.post(developmentDB + "/start-api", parameters);
    return res.data;
  } catch (err) {
    return err.response.data.message;
  }
};

export const getCrawlingStatus = async (QueueUrl, workID, maxDepth, maxTotalPages) => {
  try {
    const res = await Axios.get(
      developmentDB +
        `/get-crawling-status?QueueUrl=${QueueUrl}&workID=${workID}&maxDepth=${parseInt(maxDepth)}&maxTotalPages=${parseInt(maxTotalPages)}`
    );
    return res.data;
  } catch (err) {
    return err.response.data.message;
  }
};
