import { useSearchParams } from "react-router-dom";

export default function ColorPLM({ title, count, filterOpen }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const color = searchParams.get("color");

  const handleFilter = () => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (color === title) {
        params.delete("colors");
      } else {
        params.set("colors", title);
      }

      return params;
    });
  };

  return (
    <li
      onClick={handleFilter}
      style={{
        display: filterOpen === 2 ? "flex" : "none",
        backgroundColor: color === title && "var(--shadow)",
        borderRadius: "0.5rem",
      }}
    >
      <div className="color-container-plm">
        <span
          style={{
            display: "flex",
            backgroundColor: title.toLowerCase(),
            width: 24,
            height: 24,
            borderRadius: 5,
          }}
          className="color-PLM"
        ></span>
        <label>{title}</label>
      </div>
      <span>{`(${count})`}</span>
    </li>
  );
}
