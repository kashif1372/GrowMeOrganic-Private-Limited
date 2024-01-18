import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import Loader from "../Loader/Loader";

interface Data {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Component1: React.FC = () => {
  const [table, setTable] = useState<Data[]>([]); // Changed to an array
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setTable(response?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "userId", headerName: "UserID", width: 100 },
    { field: "title", headerName: "Title", width: 400 },
    { field: "body", headerName: "Description", width: 700 },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h1 style={{ display: "flex", justifyContent: "center" }}>Component-1</h1>
      {table.length > 0 && (
        <div style={{ height: "70vh", width: "100%" }}>
          <DataGrid rows={table} columns={columns} />
        </div>
      )}
    </>
  );
};

export default Component1;
