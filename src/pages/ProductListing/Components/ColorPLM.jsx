export default function ColorPLM({ title, count }) {
  return (
    <li>
      <div className="color-container-plm">
        <span style={{
          display: 'flex',
          backgroundColor : title.toLowerCase(),
          width: 24,
          height: 24,
          borderRadius: 5
        }} className="color-PLM"></span>
        <label>{title}</label>
      </div>
      <span>{`(${count})`}</span>
    </li>
  )
}
