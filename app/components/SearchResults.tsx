"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import {Progress} from "@heroui/react";
import {Tooltip, Button, Link} from "@heroui/react";
import { Download } from "lucide-react";


export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const quotes = [
    'In space, no one can hear you scream',
    'Live long and prosper.',
    'May the force be with you.',
    'I`m doing my part!',
    'I am a traveler of both time and space. To be where I have been.',
    'Wake me, when you need me.',
    'That`s one small step for man, one giant leap for mankind.',
    'Luke I AM your father.',
    'Don`t Panic!',
    'So long and thanks for all the fish!',
    'I`m commander Shepard. And this is my favorite store on the citadel',
    'Does this unit have a soul?',
    'The only good bug is a dead bug.',
    'Would you like to know more?',
    'Sir, finishing this fight.',
    'E.T. phone home',
    'My desert, my Arrakis, my dune.',
    'Good news, everyone!',
    'Multipass.',
    'He`s got a towel! Run Away!',
    'Big things have small beginnings.',


  ]

  function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  

  const randomQuote = getRandomItem(quotes);

  useEffect(() => {
    

    const fetchResults = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`https://images-api.nasa.gov/search?q=${query}&page=1&page_size=50&media_type=image`)
        if (!res.ok) throw new Error("Failed to fetch data")
        const data = await res.json()
        setResults(data)
      } catch (err) {
        setError("An error occurred while fetching results")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query])

  if (!query) return (
    <div className="block mt-[220px] bottom-0 w-full mx-auto">

      
          
      <div className="flex flex-col">
        
          <img
            src="images/rover.png"
            className="block max-w-60 mx-auto"
          />
        
        
        <p className="italic text-center mt-[8px]">"Love is the one thing we’re capable of perceiving that transcends dimensions of time and space."</p>
        <p className="text-center">
          - Interstellar
        </p>
        
        
        
      </div>
          
    </div>
  )
  if (loading) return (
    <div className="h-80 w-full text-center">
          
      <div className="pt-40 text-center">
        <div className="inline-flex gap-1">
          <img
          src="images/globe.svg"
          className="max-w-6"
          />
          <h1 className="text-3xl">Loading...</h1>
          
        </div>
        <Progress isIndeterminate aria-label="Loading..." className="max-w-md block mx-auto" size="md" classNames={{
          indicator: "bg-red-500",
        }} />
        
        <h1 className="italic mt-[8px]">"{randomQuote}"</h1>
      </div>
          
    </div>
    )
  if (error) return <div>{error}</div>
  if (!results) return null

  function shuffle(array: []) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array
  }

  const resultsRandomized = shuffle(results.collection.items)

  return (
    <div>
      <h2 className="text-xl font-semibold my-4 pl-3">Beep! Boop! Here's what I found for "<a className="font-bold underline decoration-sky-500">{query}</a>":</h2>
      {results.collection.items.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="columns-2 gap-4">
          {resultsRandomized.map((result: any) => (
            
            <div key={result.data[0].nasa_id} className="break-inside-avoid mb-[16px]">
              <Card className="py-4" shadow="sm">
                <CardBody className="overflow-visible py-2">
                  <Image
                    isBlurred
                    isZoomed
                    alt="Card background"
                    className="object-cover w-full h-full rounded-xl"
                    src={result.links[0].href || "/placeholder.svg"}
                  />
                  
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large mb-3 flex items-center justify-between w-full">
                    <span className="text-2xl">{result.data[0].title}</span>
                    <Tooltip content="Download original image" showArrow={true} placement="left" delay={1000}>
                      <Button 
                        as={Link} 
                        isExternal 
                        color="danger" 
                        variant="light" 
                        href={result.links[result.links.length - 1].href} 
                        isIconOnly
                      >
                      <Download className="h-[20px] w-[20px]" color="red"/>
                      </Button>
                    </Tooltip>
                  </h4>
                  {result.data[0].title === result.data[0].description ? (
                    <p>
                      <b>NASA ID:</b> {result.data[0].nasa_id}
                      <br/>
                      <b>Date Created:</b> {result.data[0].date_created}
                      <br/>
                      <b>Center:</b> {result.data[0].center}
                    </p>
                  ) : (
                    <div>
                      <b>NASA ID:</b> {result.data[0].nasa_id}
                      <br/>
                      <b>Date Created:</b> {result.data[0].date_created}
                      <br/>
                      <b>Center:</b> {result.data[0].center}
                      <br/>
                      <br/>
                      <b>Notes:</b>
                      <div className="pb-3 text-pretty">{result.data[0].description}</div>
                      
                    </div>
                    )
                  }
                </CardHeader>
                
              </Card>
              
              
              
              
              
             
            </div>
            
            
          ))}
        </div>
        
      )}
    </div>
  )
}

