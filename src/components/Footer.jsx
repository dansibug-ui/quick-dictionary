function Footer() {
  return (
    <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb' }}>
      <p style={{ margin: 0 }}>Dictionary Explorer © 2026</p>

      <a
        href="https://github.com/dansibug-ui/quick-dictionary"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit GitHub repository"
        style={{ color: 'inherit', display: 'inline-flex', alignItems: 'center' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.085 1.838 1.237 1.838 1.237 1.07 1.833 2.809 1.304 3.495.997.108-.775.418-1.304.762-1.604-2.665-.305-5.466-1.334-5.466-5.94 0-1.31.469-2.381 1.235-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 3.003-.404c1.02 0 2.047.137 3.003.404 2.292-1.552 3.3-1.23 3.3-1.23.653 1.653.241 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.614-2.804 5.633-5.475 5.93.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .321.216.694.825.576C20.565 22.092 24 17.596 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      </a>
    </footer>
  );
}

export default Footer;