import ThemeToggle from '@/components/ThemeToggle'
import ErrorBoundary from '@/components/ErrorBoundary'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 antialiased">
        <ErrorBoundary>
          <ThemeToggle />
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}
