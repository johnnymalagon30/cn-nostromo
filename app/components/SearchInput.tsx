"use client"

import { useState, useCallback, useRef, KeyboardEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Rocket, TrendingUp } from "lucide-react";
import { Input, Button, Skeleton } from "@heroui/react";

interface TrendingSearch {
  query: string;
  count: number;
}

export default function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [trendingSearches, setTrendingSearches] = useState<TrendingSearch[]>([])
  const [isLoadingTrending, setIsLoadingTrending] = useState(true)

  useEffect(() => {
    const fetchTrendingSearches = async () => {
      setIsLoadingTrending(true)
      try {
        const res = await fetch('/api/search/trending')
        if (res.ok) {
          const data = await res.json()
          setTrendingSearches(data.data || [])
        }
      } catch (error) {
        console.error('Failed to fetch trending searches:', error)
      } finally {
        setIsLoadingTrending(false)
      }
    }

    fetchTrendingSearches()
  }, [])

  const handleSearch = useCallback((searchQuery?: string) => {
    const queryToUse = searchQuery || query
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    const params = new URLSearchParams(searchParams)
    if (queryToUse) {
      params.set("q", queryToUse)
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

  const handleTrendingClick = (trendingQuery: string) => {
    setQuery(trendingQuery)
    handleSearch(trendingQuery)
  }
  
  return (
    <div>
      <div className="flex gap-2 mt-[8px]">
        <button className="flex rounded-xl py-4  text-white bg-red-500 hover:bg-red-600 h-auto mr-1 px-6" onClick={() => handleSearch()}>LAUNCH <Rocket className="ml-1"/></button>
        
        <Input label="Enter super secret launch codes..." isClearable size="md" type="text" 
         value={query}
         onChange={(e) => setQuery(e.target.value)}
         onKeyDown={handleKeyDown}
         ref={inputRef}
         
         />
        
      </div>
      {(isLoadingTrending || trendingSearches.length > 0) && (
        <div className="mt-3 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Trending this week<TrendingUp className="inline ml-1 h-4 w-4" /></span>
          {isLoadingTrending ? (
            [...Array(5)].map((_, index) => (
              <Skeleton key={index} className="rounded-full">
                <div className="h-8 w-20"></div>
              </Skeleton>
            ))
          ) : (
            trendingSearches.map((trending) => (
              <Button
                key={trending.query}
                variant="flat"
                color="danger"
                radius="full"
                size="sm"
                onPress={() => handleTrendingClick(trending.query)}
              >
                {trending.query}
              </Button>
            ))
          )}
        </div>
      )}
    </div>
  )
}

