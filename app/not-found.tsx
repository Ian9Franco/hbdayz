'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NotFound() {
  const t = useTranslations('NotFound')
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold text-foreground mb-4">{t('title')}</h1>
      <p className="text-lg text-muted-foreground mb-8">{t('message')}</p>
      <div className="flex space-x-4">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          {t('goBack')}
        </button>
        <Link
          href="/"
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
        >
          {t('backHome')}
        </Link>
      </div>
    </div>
  )
}
