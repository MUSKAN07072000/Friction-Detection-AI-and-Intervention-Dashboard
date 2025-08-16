import React from 'react';

type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  logo: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
      <path d="M13 12.586 8.707 8.293a1 1 0 0 0-1.414 1.414L11.586 14l-4.293 4.293a1 1 0 0 0 1.414 1.414L13 15.414l4.293 4.293a1 1 0 0 0 1.414-1.414L14.414 14l4.293-4.293a1 1 0 0 0-1.414-1.414L13 12.586z"></path>
    </svg>
  ),
  simulation: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
      <line x1="9" y1="7" x2="15" y2="7"></line>
      <line x1="9" y1="12" x2="13" y2="12"></line>
      <line x1="9" y1="17" x2="15" y2="17"></line>
    </svg>
  ),
  dashboard: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
    </svg>
  ),
  chatbot: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.898 5.516 4.561 6.795-.091.353-.135.717-.142 1.085H6v2h.558c.24-1.125.862-2.131 1.74-2.895A8.995 8.995 0 0 0 12 20c5.514 0 10-3.589 10-8S17.514 2 12 2zm4 11h-8v-2h8v2z"></path>
    </svg>
  ),
  help: (props: IconProps) => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 16h-2v-2h2v2zm0-4h-2V6h2v8z"></path>
    </svg>
  ),
  offer: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.121 2.707a1.001 1.001 0 0 0-1.414 0L12 10.414 4.293 2.707a1 1 0 0 0-1.414 1.414L10.586 12l-7.707 7.707a1 1 0 0 0 1.414 1.414L12 13.414l7.707 7.707a1 1 0 0 0 1.414-1.414L13.414 12l7.707-7.707a1 1 0 0 0 0-1.586z"></path>
      <path d="m13.414 12 7.707-7.707a1 1 0 0 0-1.414-1.414L12 10.586 4.293 2.879a1 1 0 0 0-1.414 1.414L10.586 12l-7.707 7.707a1 1 0 0 0 1.414 1.414L12 13.414l7.707 7.707a1 1 0 0 0 1.414-1.414z"></path>
    </svg>
  ),
  close: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 10.586L6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 0 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 0 0-1.414-1.414L12 10.586z"></path>
    </svg>
  ),
  thumbUp: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M21 8h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2zM5 9H1v12h4V9z"></path></svg>
  ),
  thumbDown: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M3 16h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2zM19 5h4v12h-4z"></path></svg>
  ),
  alert: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>
  ),
  intervention: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6v-2h12v2zm0-4H6v-2h12v2zm-4-4H6V9h8v2z"></path></svg>
  ),
  check: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
  ),
  chart: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M16 6h-2v10h2V6zm-4 4h-2v6h2v-6zM8 8H6v12h2V8zM4 20h16v2H4z"></path></svg>
  ),
  gemini: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 17.5a3.5 3.5 0 0 0 3.5-3.5h-7a3.5 3.5 0 0 0 3.5 3.5zM10.42 2.1l-.14.34a21.94 21.94 0 0 0-4.59 4.88 1 1 0 0 0 .38 1.37 1 1 0 0 0 .5.14 1 1 0 0 0 .86-.51c.88-1.57 1.94-3.03 3.1-4.29a.99.99 0 0 0 .1-.14 1 1 0 0 0-1.2-1.79zm-7.75.98a1 1 0 0 0-1.37.38c-2.32 4.14-2.32 9 0 13.14a1 1 0 0 0 1.37.38 1 1 0 0 0 .38-1.37c-1.92-3.44-1.92-7.86 0-11.3a1 1 0 0 0-.38-1.37zM20.69 3.46a1 1 0 0 0-1.37-.38 1 1 0 0 0-.38 1.37c1.92 3.44 1.92 7.86 0 11.3a1 1 0 0 0 .38 1.37 1 1 0 0 0 1.37-.38c2.32-4.14 2.32-9 0-13.14z"></path>
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
    </svg>
  ),
  loading: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2v2a8 8 0 1 1-8 8H2a10 10 0 1 0 10-10z"></path></svg>
  ),
  note: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
  ),
  noteFilled: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 15H8v-2h5v2zm3-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path></svg>
  ),
  log: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 12h20M12 2v20"/></svg>
  ),
  wand: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="m21.2 6.8-4-4a1 1 0 0 0-1.4 0l-1 1 5.4 5.4 1-1a1 1 0 0 0 0-1.4zM3.8 15.8l-1.3 5.2a1 1 0 0 0 1.5 1.5l5.2-1.3 9-9-5.4-5.4zM9 13.6l-2.7 2.7 1.1 1.1 2.7-2.7-1.1-1.1zm3.8-3.8-4.1 4.1 1.1 1.1 4.1-4.1-1.1-1.1z"/></svg>
  ),
};