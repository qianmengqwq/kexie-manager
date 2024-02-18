export const useFileConversion = () => {
  const fileToBase64 = (file: Blob, type: string): Promise<string> =>
    new Promise((resolve, reject) => {
      const blob = new Blob([file], { type: type })
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onload = function (event) {
        resolve(event.target?.result as string)
      }
      reader.onerror = function (error) {
        console.error(error)
        reject('error')
      }
    })

  return [fileToBase64]
}
