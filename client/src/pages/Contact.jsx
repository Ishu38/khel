import { useState } from 'react';
import { Link } from 'react-router-dom';

const CONTACT_INFO = {
  name: 'Neil Shankar Ray',
  address: 'C/o Mrs. Chinu Ray, 55/1 Jubilee Park, Tollygunge, Kolkata-33',
  email: 'roychinu45@gmail.com',
  phone: '+91 7001406831',
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link to="/" style={styles.backLink}>← Back to Home</Link>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>We'd love to hear from you</p>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Get in Touch</h2>
          
          <div style={styles.infoItem}>
            <span style={styles.infoIcon}>📍</span>
            <div>
              <h3 style={styles.infoLabel}>Address</h3>
              <p style={styles.infoValue}>{CONTACT_INFO.address}</p>
            </div>
          </div>

          <div style={styles.infoItem}>
            <span style={styles.infoIcon}>👤</span>
            <div>
              <h3 style={styles.infoLabel}>Contact Person</h3>
              <p style={styles.infoValue}>{CONTACT_INFO.name}</p>
            </div>
          </div>

          <div style={styles.infoItem}>
            <span style={styles.infoIcon}>📧</span>
            <div>
              <h3 style={styles.infoLabel}>Email</h3>
              <p style={styles.infoValue}>{CONTACT_INFO.email}</p>
            </div>
          </div>

          <div style={styles.infoItem}>
            <span style={styles.infoIcon}>📱</span>
            <div>
              <h3 style={styles.infoLabel}>Phone</h3>
              <p style={styles.infoValue}>{CONTACT_INFO.phone}</p>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Send a Message</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={styles.textarea}
                rows="5"
                required
              />
            </div>
            <button type="submit" style={styles.button}>
              {submitted ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <div style={styles.mapSection}>
        <h2 style={styles.mapTitle}>Find Us</h2>
        <div style={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.8877134562186!2d88.36753687368026!3d22.49840213567431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0272b888c4e1db%3A0x1c8a2e1d5c8f5c8e!2s55%2F1%20Jubilee%20Park%2C%20Tollygunge%2C%20Kolkata%2C%20West%20Bengal%20700033!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  backLink: {
    color: '#6366f1',
    textDecoration: 'none',
    fontSize: '14px',
    display: 'inline-block',
    marginBottom: '20px',
  },
  title: {
    fontSize: '42px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 12px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#6b7280',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
    marginBottom: '50px',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid #e5e7eb',
  },
  cardTitle: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 24px',
  },
  infoItem: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
  },
  infoIcon: {
    fontSize: '24px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f3f4f6',
    borderRadius: '10px',
  },
  infoLabel: {
    fontSize: '12px',
    color: '#6b7280',
    margin: '0 0 4px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  infoValue: {
    fontSize: '15px',
    color: '#1f2937',
    margin: 0,
    fontWeight: '500',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '10px',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  textarea: {
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '10px',
    fontSize: '15px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  button: {
    padding: '14px 24px',
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  mapSection: {
    marginTop: '40px',
  },
  mapTitle: {
    fontSize: '28px',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '24px',
    color: '#1f2937',
  },
  mapContainer: {
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
};