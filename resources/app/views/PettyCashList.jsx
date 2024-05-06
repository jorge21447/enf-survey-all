import useSWR from "swr";
import clienteAxios from "../config/axios";
import Loader from "../components/Loader";
import PettyCashTable from "../components/PettyCashTable";

const PettyCashList = () => {
  const token = localStorage.getItem("AUTH_TOKEN");
  const fetcher = () =>
    clienteAxios("/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data.data);

  const { data, error, isLoading } = useSWR("/api/users", fetcher, {
    refreshInterval: 1000,
  });

  const handleDelete = (name, id) => {
    deleteUser(name, id);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="md:py-6">
          <PettyCashTable users={data?.data} handleDelete={handleDelete} />
        </div>
      )}
    </>
  );
};

export default PettyCashList;

