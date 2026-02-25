'use client'

import Script from 'next/script'

export function BeambackWidget() {
  return (
    <Script
      src="https://beamback.whoisarjen.com/widget.js"
      data-api-key="ak_FOGvNVCYJonr64qXksEN6"
      strategy="afterInteractive"
    />
  )
}
