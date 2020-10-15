import axios from "axios";
import {useState, useEffect} from "react";

export const useResource = baseUrl => {
  // console.log(baseUrl);
  const [resource, setResource] = useState([]);
  useEffect(() => {
    const initResource = async baseUrl => {
      try {
        console.log(`in initialize, making request to ${baseUrl}`);
        const response = await axios.get(baseUrl);
        console.log(response.data);
        setResource(response.data);
      } catch (e) {
        console.error(e.message);
      }
    };
    console.log(`about to init request to ${baseUrl}`);
    initResource(baseUrl);
  }, [baseUrl]);
  const create = async resource => {
    try {
      const response = await axios.post(baseUrl, resource);

      setResource(prevResources => prevResources.concat(response.data));
    } catch (error) {
      console.error(error);
    }
  };
  const resourceService = {create};
  console.log(resource);
  return [resource, resourceService];
};
