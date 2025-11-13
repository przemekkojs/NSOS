import Papa from 'papaparse'

export async function parseCSV<TRow>(file: File) {
  const text = await file.text()

  const result = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  })

  return result.data as TRow[]
}
