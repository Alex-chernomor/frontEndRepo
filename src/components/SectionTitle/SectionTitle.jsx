import React from 'react'

export default function SectionTitle({ children, className = '' }) {
  return (
    <h2 className={`${styles.title} ${className}`}>
      {children}
    </h2>
  );
}
