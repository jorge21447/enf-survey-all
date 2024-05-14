import { useEffect, useState } from "react";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import Loader from "../components/Loader";
import PettyCashTable from "../components/PettyCashTable";
import useSurvey from "../hooks/useSurvey";

const PettyCashList = () => {
  const { deletePettyCashBox, modalPettyCash } = useSurvey();
  const [pettycashboxes, setPettyCashBoxes] = useState([]); 
  const token = localStorage.getItem("AUTH_TOKEN");
  const fetcher = () =>
    clienteAxios("/api/pettycashbox/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data.data);

  const { data, error, isLoading, mutate } = useSWR(
    "/api/pettycashbox/all",
    fetcher,
    {
      revalidateIfStale: true, // Revalidar si los datos están desactualizados 
      revalidateOnFocus: false, 
      revalidateOnReconnect: false, 
    }
  );

  const handleDelete = (id) => {
    deletePettyCashBox(id,() => {
      mutate();
    });
  };

  useEffect(() => {
    mutate();
  }, []);

  useEffect(() => {
    mutate();
  }, [modalPettyCash]);


  useEffect(() => {
    if (!isLoading && data) {
      setPettyCashBoxes(data);
    }
  }, [isLoading, data]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="md:py-6">
          <PettyCashTable pettycashboxes={pettycashboxes} handleDelete={handleDelete} />
        </div>
      )}
    </>
  );
};

export default PettyCashList;
