import { MagnifyingGlass } from "react-loader-spinner";
const Spinner = () => {
  return (
    <MagnifyingGlass
      visible={true}
      height="80"
      width="80"
      ariaLabel="magnifying-glass-loading"
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
        borderRadius: "10px",
      }}
      wrapperClass="magnifying-glass-wrapper"
      glassColor="#c0efff"
      color="#e15b64"
    />
  );
};

export default Spinner;
