import { Button } from 'react-bootstrap';
import { useState } from 'react';
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log('Async: Copying to clipboard was successful!');
    },
    function (err) {
      console.error('Async: Could not copy text: ', err);
    }
  );
}
export const Copier = ({ code }) => {
  const [copyText, setCopyText] = useState('Copy Code');
  const copying = () => {
    setCopyText('Copied!');
    copyTextToClipboard(code);
    setTimeout(() => {
      setCopyText('Copy Code');
    }, 850);
  };
  return (
    <Button variant="outline-primary" onClick={copying} disabled={!code}>
      {copyText}
    </Button>
  );
};
