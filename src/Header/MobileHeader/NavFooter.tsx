'use client'

import React from 'react'
import { Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

export const NavFooter: React.FC = () => {
  return (
    <div className="sticky bottom-0 bg-background">
      {/* Global accordion - placeholder, można dodać później */}
      <div className="border-t border-border/25">
        {/* Placeholder dla Global accordion */}
      </div>

      {/* Social media i przyciski */}
      <div className="flex flex-col gap-4 border-t border-border/25 p-4">
        {/* Social icons */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            aria-label="X (Twitter)"
          >
            <Twitter className="h-5 w-5" />
          </Button>
        </div>

        {/* Przyciski */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm">
            Contact Us
          </Button>
          <Button variant="outline" size="sm">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  )
}

