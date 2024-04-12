import UserTable from "../components/UserTable";
import useSurvey from "../hooks/useSurvey";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import Loader from "../components/Loader";

const Users = () => {
  const { deleteUser } = useSurvey();
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
          <UserTable users={data?.data} handleDelete={handleDelete} />
        </div>
      )}
    </>
  );
};

export default Users;
