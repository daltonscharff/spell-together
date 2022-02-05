import { FC } from "react";

const Loader: FC = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: ".3rem solid #f3f3f3",
          borderTop: ".3rem solid rgb(250 204 21)",
          borderRadius: "50%",
          width: "3rem",
          height: "3rem",
          animation: "spin 1.5s linear infinite",
        }}
      />
    </div>
  );
};

export default Loader;
