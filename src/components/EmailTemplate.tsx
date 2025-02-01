import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div style={styles.container}>
    <h1 style={styles.heading}>Contact Information</h1>
    <p style={styles.label}>Name:</p>
    <p style={styles.text}>{name}</p>
    <p style={styles.label}>Email:</p>
    <p style={styles.text}>{email}</p>
    <p style={styles.label}>Message:</p>
    <p style={styles.text}>{message}</p>
  </div>
);

const styles = {
  container: {
    backgroundColor: '#2E2E2E',
    color: '#FFFFFF',
    fontFamily: "'Times New Roman', Times, serif",
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '600px',
    margin: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  } as React.CSSProperties,
  heading: {
    fontSize: '24px',
    borderBottom: '2px solid #444',
    paddingBottom: '10px',
    marginBottom: '20px',
  } as React.CSSProperties,
  label: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0 5px',
  } as React.CSSProperties,
  text: {
    fontSize: '16px',
    margin: '0 0 20px',
  } as React.CSSProperties,
};
