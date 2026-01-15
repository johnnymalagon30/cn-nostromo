"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import {Progress} from "@heroui/react";


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
        const res = await fetch(`https://images-api.nasa.gov/search?q=${query}&page=1&page_size=100&media_type=image`)
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
            src="/rover.png"
            className="block max-w-60 mx-auto"
          />
        
        
        <p className="italic text-center">"Love is the one thing we’re capable of perceiving that transcends dimensions of time and space."</p>
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
          src="/globe.svg"
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

  function shuffle(array) {
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
      <h2 className="text-xl font-semibold my-4">Beep boop! Here's what I found for "<a className="font-bold underline decoration-sky-500">{query}</a>":</h2>
      {results.collection.items.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid gap-3 grid-cols-2">
          {resultsRandomized.map((result: any) => (
            
            <div key={result.indexOf} className="m-1">
              <Card className="py-4">
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
                  <h4 className="font-bold text-large mb-3">{result.data[0].title}</h4>
                  {result.data[0].title === result.data[0].description ? (
                [
                  <p><b>NASA id:</b> {result.data[0].nasa_id}</p>,
                  <p><b>Date Created:</b> {result.data[0].date_created}</p>,
                  <p><b>Center:</b> {result.data[0].center}</p>
                ]

                {
                  "copyright": "\nZixiong Jin\n",
                  "date": "2025-03-25",
                  "explanation": "What causes a blue band to cross the Moon during a lunar eclipse? The blue band is real but usually quite hard to see. The featured HDR image of last week's lunar eclipse, however -- taken from Norman, Oklahoma (USA) -- has been digitally processed to exaggerate  the colors.  The gray color on the upper right of the top lunar image is the Moon's natural color, directly illuminated by sunlight. The lower parts of the Moon on all three images are not directly lit by the Sun since it is being eclipsed -- it is in the Earth's shadow. It is faintly lit, though, by sunlight that has passed deep through Earth's atmosphere. This part of the Moon is red -- and called a blood Moon -- for the same reason that Earth's sunsets are red: because air scatters away more blue light than red. The unusual purple-blue band visible on the upper right of the top and middle images is different -- its color is augmented by sunlight that has passed high through Earth's atmosphere, where red light is better absorbed by ozone than blue.   Celestial Surprise: What picture did APOD feature on your birthday? (post 1995)",
                  "hdurl": "https://apod.nasa.gov/apod/image/2503/LunarEclipseColors_Jin_2700.jpg",
                  "media_type": "image",
                  "service_version": "v1",
                  "title": "A Blue Banded Blood Moon",
                  "url": "https://apod.nasa.gov/apod/image/2503/LunarEclipseColors_Jin_960.jpg"
              }
            ,
            {
              "copyright": "\nJason Kurth;\nMusic: \nHouse of the Rising Sun \n(Sebastia McQueen via SoundCloud)\n",
              "date": "2025-04-01",
              "explanation": "Can the Sun appear to rise twice at the same time? This was just the case a few days ago from Les Escoumins, Quebec, Canada as our Solar System's bright central orb rose just as it was being partially eclipsed by the Moon. The featured video shows this unusual double-sunrise in real time and being reflected by the St. Lawrence River. Soon after the initial two spots of light appear over distant clouds, what appears to be bright horns become visible -- which are really just parts of the Sun not being eclipsed. Soon, the entire eclipsed Sun is visible above the horizon.  In all, this broken sunrise took less than two minutes during a partial eclipse that lasted many times longer.   Although the Moon circles the Earth once a month (moon-th), it does not always eclipse the Sun because its tilted orbit usually takes it above or below.    Gallery: Partial Solar Eclipse of 2025 March",
              "media_type": "video",
              "service_version": "v1",
              "thumbnail_url": "https://img.youtube.com/vi/oTkbHJsqCZM/0.jpg",
              "title": "A Double Sunrise from a Partial Eclipse",
              "url": "https://www.youtube.com/embed/oTkbHJsqCZM?rel=0"
          }
                
               ) : (
                <p className="">{result.data[0].description}</p>
        
              )}
                  
                  
                </CardHeader>
      
              </Card>
              
              <DrawerBody className="flex flex-col items-center">
                {results.media_type === 'video' ? (
                  <>
                    <YouTubeEmbed videoid={} height="full" width="full" playlabel={results.title} />
                    <div className="text-2xl font-bold">{results.title}</div>
                    <div className="">Image Credit & Copyright:{results.copyright ? results.copyright : 'NASA'}</div>
                    <div className="px-10 text-pretty">
                      {results.explanation}
                    </div>

                  </>
                  
                ):(
                  <>
                    <Image
                    
                    alt="HeroUI Album Cover"
                    className="w-full"
                    src={results.hdurl ? results.hdurl : results.url}
                    
                    />
                    <div className="text-2xl font-bold">{results.title}</div>
                    <div className="">Image Credit & Copyright:{results.copyright ? results.copyright : 'NASA'}</div>
                    <div className="px-10 text-pretty">
                      {results.explanation}
                    </div>
                  </>
                )}
                  
              </DrawerBody>
              
              
              
             
            </div>
            
            
          ))}
        </div>
        
      )}
    </div>
  )
}

