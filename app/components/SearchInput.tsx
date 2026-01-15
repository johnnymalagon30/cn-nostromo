"use client"

import { useState, useCallback, useRef, KeyboardEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Rocket } from "lucide-react";
import { Input } from "@heroui/react";

export default function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")

  const handleSearch = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    const params = new URLSearchParams(searchParams)
    if (query) {
      params.set("q", query)
    } else {
      params.delete("q")
    }
    router.push(`/?${params.toString()}`)
    setQuery("")
  }, [query, router, searchParams])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSearch()
    }
  }
  
  return (
    <div className="flex gap-2 mt-[8px]">
      <button className="flex rounded-xl py-4  text-white bg-red-500 hover:bg-red-600 h-auto mr-1 px-6" onClick={handleSearch}>LAUNCH <Rocket className="ml-1"/></button>
      
      <Input label="Enter super secret launch codes..." isClearable size="md" type="text" 
       value={query}
       onChange={(e) => setQuery(e.target.value)}
       onKeyDown={handleKeyDown}
       ref={inputRef}
       
       />
      
    </div>
  )
}

