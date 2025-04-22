'use client'

import Navbar from "@/app/navbar/page"

export default function LayoutWrapper({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}