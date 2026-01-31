const About = () => {
  return (
    <section className="section" style={{ paddingTop: '140px' }}>
      <h1 className="section-title"><span className="star">✦</span> About Us</h1>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '20px', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '60px' }}>
          Constellation Works is a nonprofit organization dedicated to creating dignified 
          housing solutions while restoring ecological balance. We believe that healing 
          people and healing the land go hand in hand.
        </p>
      </div>

      <div className="grid-3" style={{ marginBottom: '60px' }}>
        <div className="card">
          <h3 className="card-title">Our Vision</h3>
          <p className="card-text">
            A world where everyone has access to safe, dignified housing within 
            thriving, sustainable communities.
          </p>
        </div>
        <div className="card">
          <h3 className="card-title">Our Approach</h3>
          <p className="card-text">
            We combine innovative housing solutions with ecological restoration, 
            creating opportunities for personal and environmental transformation.
          </p>
        </div>
        <div className="card">
          <h3 className="card-title">Our Values</h3>
          <p className="card-text">
            Dignity, sustainability, community, and hope guide everything we do. 
            We believe in second chances and the power of constellation.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '40px', background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.2)' }}>
        <h3 style={{ color: 'var(--gold)', marginBottom: '20px', fontFamily: 'Cormorant Garamond, serif', fontSize: '28px' }}>
          Joshua Tramel Byers
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>Co-Founder</p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          📧 terranovare42@gmail.com<br />
          📱 (734) 351-8601
        </p>
      </div>
    </section>
  )
}

export default About
