import { ReactNode } from "react";

type DialogProps = {
  onClose: () => void;
  size?: "small" | "medium" | "large" | "extraLarge" | "largeMedium";
  title?: string;
  children?: ReactNode;
};

const ATMDialog = ({
  onClose,
  size = "medium",
  title,
  children,
}: DialogProps) => {
  const sizeStyles: Record<string, React.CSSProperties> = {
    small: { width: "100%", maxWidth: "20rem", height: "10rem" },
    medium: { width: "100%", maxWidth: "28rem", height: "15rem" },
    large: { width: "100%", maxWidth: "40rem", height: "35rem" },
    largeMedium: { width: "100%", maxWidth: "35rem", height: "25rem" },
    extraLarge: { width: "100%", maxWidth: "64rem", height: "45rem" },
  };


  return (
    <div
    style={{
      position: "fixed",
      inset: 0,
      display: "flex",
      alignItems: "center",
      height:'100%',
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex:50,
    }}
  >
    <div
      style={{
        backgroundColor: "white",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        ...sizeStyles[size],
      }}
    >
      <div style={{ display: "flex", justifyContent: "end", padding: "8px" , position:'absolute' , top:'-10px', right:'-5px' }}>
        <button
          onClick={onClose}
          style={{
            color: "red",
            fontSize: "14px",
            border: "none",
            background: "none",
            cursor: "pointer",
            padding: "5px",
            fontWeight:500 ,
          }}
        >
          Close
        </button>
      </div>
      {title && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0px 0px 12px 0px",
            marginTop:'20px'
          }}
        >
          <div style={{ fontSize: "1.125rem", fontWeight: "bold" }}>{title}</div>
        </div>
      )}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>{children}</div>
    </div>
  </div>
  );
};

export default ATMDialog;