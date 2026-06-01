export default function CategoryPLM({ type, title }) {
  return (
    <li>
      <input type="checkbox" id={`checkbox-${type}`} />
      <label htmlFor={`checkbox-${type}`}>{title}</label>
    </li>
  )
}
