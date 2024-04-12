import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import Loader from "../components/Loader";
import UserCertificateTable from "./UserCertificateTable";
const UsersCertificate = () => {
  const { id } = useParams();
  const token = localStorage.getItem("AUTH_TOKEN");
  const fetcher = () =>
    clienteAxios(`/api/users/certificates/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data.data);

  const { data, error, isLoading } = useSWR(
    id ? `/api/users/certificates/${id}` : null,
    fetcher
  );
  console.log(data, 'aqui');
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="md:py-6">
          <UserCertificateTable users={data} />
        </div>
      )}
    </>
  );
};

export default UsersCertificate;
