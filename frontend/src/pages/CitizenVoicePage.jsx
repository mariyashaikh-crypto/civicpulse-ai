import CitizenFeedback from '../components/CitizenFeedback.jsx'

const STEPS = [
  {
    title: 'Speak or type',
    text: 'Describe the issue in English, Hindi or Marathi — voice input converts your speech into editable text.',
  },
  {
    title: 'Automatic analysis',
    text: 'The analytics engine classifies the category, assesses severity and detects the language instantly.',
  },
  {
    title: 'Priority routing',
    text: 'Your request is scored against regional infrastructure context and routed into district planning.',
  },
]

export default function CitizenVoicePage() {
  return (
    <>
      <section className="voice-hero anim-rise" aria-label="Citizen voice introduction">
        <span className="overline">Public Participation Channel</span>
        <h2 className="voice-hero-title">Your voice shapes district priorities.</h2>
        <p className="page-subtitle" style={{ marginTop: 10, maxWidth: '68ch' }}>
          Report water, roads, healthcare, education or connectivity issues in your own words — in your own
          language. Every submission is analyzed and fed into the same intelligence that guides investment
          decisions.
        </p>
        <div className="voice-hero-chips">
          <span className="chip neutral">English</span>
          <span className="chip neutral">हिन्दी</span>
          <span className="chip neutral">मराठी</span>
          <span className="chip neutral">Voice enabled</span>
        </div>
      </section>

      <CitizenFeedback />

      <div className="steps-grid anim-rise">
        {STEPS.map((s, i) => (
          <article key={s.title} className="step-card">
            <span className="action-bullet">{i + 1}</span>
            <h3 className="step-title">{s.title}</h3>
            <p className="step-text">{s.text}</p>
          </article>
        ))}
      </div>
    </>
  )
}
