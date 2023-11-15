import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"

export default function FilesViewer({ fileUri }) {
  const docs = [
    { uri: fileUri }, // Remote file
  ]

  return (
    <DocViewer
      documents={docs}
      pluginRenderers={DocViewerRenderers}
    />
  )
}
