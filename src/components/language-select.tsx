 "use client"
 import { useRouter, usePathname } from 'next/navigation'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
export function LanguageSelect() {
    const router = useRouter()
    const pathname = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
            {
                pathname.startsWith('/en') ? "English" :
                pathname.startsWith('/es') ? "Español" :
                "Other"
        }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => {
           router.push('/en')
        }}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
           router.push('/es')
        }}>
          Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}