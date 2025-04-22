

export default function AuthLayout({ children }) {
  return (
    <main className="flex w-full justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {children}
      </div>
    </main>
  )
}
