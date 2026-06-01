export default function TimerContainer({ count, title }) {
  return (
    <div className="timer-container-box">
      <h2>{count}</h2>
      <h4>{title}</h4>
    </div>
  )
}
