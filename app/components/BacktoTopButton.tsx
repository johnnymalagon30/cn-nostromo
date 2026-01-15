"use client"

import { useState, useEffect } from "react"
import { ChevronsUp } from "lucide-react"
import { Button, Tooltip } from "@heroui/react"
import { useBacktoTop } from "../contexts/BacktoTopContext"

export default function BacktoTopButton() {
  const { isVisible: contextVisible, setIsVisible: setContextVisible } = useBacktoTop()
  const [scrollVisible, setScrollVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 5000) {
        setScrollVisible(true)
        setContextVisible(true)
      } else {
        setScrollVisible(false)
        setContextVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [setContextVisible])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!contextVisible || !scrollVisible) {
    return null
  }

  return (
    <Tooltip content="Scroll to top" showArrow={true} placement="left" delay={1000}>
      <Button isIconOnly variant="solid" onPress={scrollToTop} className="fixed z-[100] bottom-4 right-5 bg-sky-500">
        <ChevronsUp color="#ffffff" className="h-[24px] w-[24px]" />
      </Button>
    </Tooltip>
    
    
  )
}

