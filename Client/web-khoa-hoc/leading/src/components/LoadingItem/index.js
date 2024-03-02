import ClipLoader from "react-spinners/ScaleLoader";

export default function LoadingItem({ height }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "100px 0px",
        height: `${height}px`,
      }}
    >
      <ClipLoader color={"#404bda"} loading={true} size={150} />
    </div>
  );
}
