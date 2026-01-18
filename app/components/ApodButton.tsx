"use client"

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure,
    Link,
  } from "@heroui/react";

import { Telescope } from "lucide-react";
import { useEffect, useState } from "react";
import { Image } from "@heroui/react";
import { YouTubeEmbed } from "@next/third-parties/google";
import { getYouTubeVideoId } from "@/lib/youtube-utils"
import { useBacktoTop } from "../contexts/BacktoTopContext"
  
  export default function ApodButton() {
    const [results, setResults] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { hideBacktoTop } = useBacktoTop();
    const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    useEffect(() => {
        
    
        const apodResults = async () => {
          try {
            const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&thumbs=true`)
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
    
        apodResults()
      }, [])
      
      if (loading) {
        return (
          <Button variant="solid" className="bg-sky-500 text-white"><Telescope />APOD</Button>
        )
      }
    
      if (error) {
        return (
          <Button variant="solid" className="bg-sky-500 text-white"><Telescope />APOD</Button>
        )
      }
    
      if (results.media_type === 'other') return (
        <Button as={Link} href="https://apod.nasa.gov/apod/" onPress={() => { hideBacktoTop(); onOpen(); }} variant="solid" className="bg-sky-500 text-white"><Telescope />APOD</Button>
      )
    const youtubeId = getYouTubeVideoId(results.url);
    return (
      <>
        <Button onPress={() => { hideBacktoTop(); onOpen(); }} variant="solid" className="bg-sky-500 text-white"><Telescope />APOD</Button>
        <Drawer
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          backdrop="blur"
          placement="top"
          size="5xl"
        >
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="flex justify-center items-center gap-1 text-2xl bg-gradient-to-r bg-clip-text text-transparent from-red-500 from-30% to-sky-500 to-60%"><div>Official NASA Astronomy Picture of The Day</div><div className="mx-2 text-gray-200">|</div><div className="text-black">{formattedDate.toString()}</div></DrawerHeader>
                <DrawerBody className="flex flex-col items-center">
                  {results.media_type === 'video' && youtubeId ? (
                    <>
                      <div className="w-full flex flex-col"><div className="w-[720px] mx-auto"><YouTubeEmbed videoid={youtubeId} playlabel={results.title} /></div></div>
                      
                      <div className="text-2xl font-bold">{results.title}</div>
                      <div className="italic">Image Credit & Copyright: {results.copyright ? results.copyright : 'NASA'}</div>
                      <div className="px-10 text-pretty">
                        {results.explanation}
                      </div>

                    </>
                  
                  ):(
                    <>
                      <Image
                    
                      alt="APOD"
                      className="w-full"
                      src={results.hdurl ? results.hdurl : results.url}
                    
                      />
                      <div className="text-2xl font-bold">{results.title}</div>
                      <div className="italic">Image Credit & Copyright: {results.copyright ? results.copyright : 'NASA'}</div>
                      <div className="px-10 text-pretty">
                        {results.explanation}
                      </div>
                    </>
                  )}
                  
                </DrawerBody>
                <DrawerFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </>
    );
  }
  