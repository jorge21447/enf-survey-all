import PuffLoader from "react-spinners/PuffLoader";

const Loader = () => {
  return (
    <>
      <div className="z-[700] m-auto absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2">
        <PuffLoader color={"#1242bf"} loading={true} size={100} />
      </div>
    </>
  );
};

export default Loader;
