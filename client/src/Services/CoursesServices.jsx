

 function downloadFile(fileName, fileDirectory) {
    const url = `${import.meta.env.VITE_API_FILE_URL}/${fileDirectory}/${fileName}`

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = blobURL
        a.download = fileName
        a.style.display = "none"

        document.body.appendChild(a)
        a.click()

        document.body.removeChild(a)
        window.URL.revokeObjectURL(blobURL)
      })
      .catch((error) => {
        console.error("Error downloading file:", error)
      })
  }

export default downloadFile;