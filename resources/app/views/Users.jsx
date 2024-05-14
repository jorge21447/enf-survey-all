import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import useSurvey from "../hooks/useSurvey";
import UserTable from "../components/UserTable";
import Loader from "../components/Loader";

const Users = () => {
  const navigate = useNavigate();
  const { deleteUser } = useSurvey();
  const token = localStorage.getItem("AUTH_TOKEN");
  const [error401, setError401] = useState(false);

  const fetcher = () =>
    clienteAxios("/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => data.data)
      .catch((error) => {
        if (error.response.status === 401) {
          setError401(true);
        }
      });

  const { data, isLoading } = useSWR("/api/users", fetcher, {
    refreshInterval: 1000,
  });

  const handleDelete = (name, id) => {
    deleteUser(name, id);
  };

  useEffect(() => {
    if (error401) {
      localStorage.removeItem("AUTH_TOKEN");
      localStorage.removeItem("user");
      navigate("/auth/login");
    }
  }, [error401]);

  if (isLoading) return <Loader />;

  return (
    <div className="md:py-6">
      <UserTable users={data?.data} handleDelete={handleDelete} />
    </div>
  );
};

export default Users;
