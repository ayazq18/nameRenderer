import React from "react"
import { Download } from "lucide-react"
import * as XLSX from "xlsx"

// Replace this with your actual Button component or use a native <button>
const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`border px-3 py-1 rounded-md text-sm ${className}`}>
    {children}
  </button>
)

export default function ExcelTemplate() {
  const generateTemplate = () => {
    const wb = XLSX.utils.book_new()

    const data = [
      { Name: "IMTIYAZ AHMAD", Location: "NAGPUR", WithFamily: true, Color: "green" },
      { Name: "ZULFIKAR BHAI", Location: "NAGPUR", WithFamily: true, Color: "pink" },
      { Name: "BASHIR MAMU", Location: "NAGPUR", WithFamily: true, Color: "blue" },
      { Name: "MUNNI BAJI", Location: "NAGPUR", WithFamily: true, Color: "amber" },
      { Name: "ARIF BHAI", Location: "NAGPUR", WithFamily: true, Color: "black" },
      { Name: "SHAKIL BHAI", Location: "NAGPUR", WithFamily: true, Color: "black" },
    ]

    const ws = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(wb, ws, "Names")
    XLSX.writeFile(wb, "name-cards-template.xlsx")
  }

  return (
    <Button onClick={generateTemplate} className="flex items-center gap-2">
      <Download className="h-4 w-4" />
      Download Template
    </Button>
  )
}
