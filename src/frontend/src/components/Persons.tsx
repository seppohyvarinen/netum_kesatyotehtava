import { useEffect } from "react";
import axios from "axios";

export const Persons: React.FunctionComponent<{}> = () => {
  const fetchAll = async () => {
    try {
      var response = await axios.get("/persons");

      console.log(response.data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchAll();
  }, []);
  return <div className="PersonList">Here are the persons</div>;
};
