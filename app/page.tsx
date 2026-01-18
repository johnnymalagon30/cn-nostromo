import SearchInput from "./components/SearchInput";
import SearchResults from "./components/SearchResults";
import BacktoTopButton from "./components/BacktoTopButton";
import TopNav from "./components/TopNav";
import {Card, CardBody} from "@heroui/react";


export default function Home() {

  return (
    <main className="container mx-auto">
      <TopNav />
      <Card className="mt-[10px]" shadow="sm">
        <CardBody>
          <h2 className="text-2xl font-bold">NASA Image Library Search</h2>
          <p className="mt-2">
            Welcome, traveler! Use this tool to launch a <a className="font-bold underline decoration-sky-500">keyword</a> shuttle at <a className="underline font-bold decoration-red-500">NASA Image and Video Library</a>. Cargo (and crew) will hopefully return intact.
          </p>
          <SearchInput />
        </CardBody>
      </Card>
      
      <SearchResults />
      <BacktoTopButton />
    </main>
  )
}

