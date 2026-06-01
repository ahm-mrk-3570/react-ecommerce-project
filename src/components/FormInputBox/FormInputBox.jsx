import './FormInputBox.css';

export default function FormInputBox({ title, placeHolder, color }) {
  return (
    <div className="box-container">
      <label htmlFor="box-input">{title}</label>
      <input style={{
        border : color ? `1px solid ${color}` : "1px solid var(--border-color)",
      }} placeholder={placeHolder ? `Enter ${placeHolder}` : ''} type="text" id='box-input' />
    </div>
  )
}
