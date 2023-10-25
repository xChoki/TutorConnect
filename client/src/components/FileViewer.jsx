function FileViewer({ fileUrl }) {
  return (
    <iframe
      title="File Viewer"
      src={fileUrl}
      width="100%"
      height="500px" // You can adjust the height as needed
      frameBorder="0"
    >
      <p>Your browser does not support iframes.</p>
    </iframe>
  );
}

export default FileViewer;
