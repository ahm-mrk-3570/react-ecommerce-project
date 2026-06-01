export default function SizePLM({ type, title, count }) {
  return (
    <li>
      <div className="size-container-plm">
        <input type="checkbox" id={`checkbox-${type}`} />
        <label htmlFor={`checkbox-${type}`}>{title}</label>
      </div>
      <span>{`(${count})`}</span>
    </li>
  )
}
