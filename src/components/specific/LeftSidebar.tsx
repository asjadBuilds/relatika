import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { FaArrowUpWideShort } from "react-icons/fa6";
import { MdOutlineExplore } from "react-icons/md";
import { IoMdStats } from "react-icons/io";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useQuery } from "@tanstack/react-query";
import { getUserSpaces } from "@/api/spaceApi";
import { Space } from "@/models/types";
const LeftSidebar = () => {
  const { data: userSpaces } = useQuery<Space[]>({
    queryKey: ['userSpaces'],
    queryFn: getUserSpaces,
  })
  return (
    <div className="flex flex-col items-start text-white p-2 *:w-full max-h-screen overflow-y-auto styled-scrollbars">
      <Link to={'/'}>
        <button className="flex gap-3 items-center text-2xl w-full p-4 hover:bg-neutral-700 transition-colors duration-200 rounded-md">
          <FaHome />
          <span className="text-sm">Home</span>
        </button>
      </Link>
      <Link to={'/'}>
        <button className="flex gap-3 items-center text-2xl w-full p-4 hover:bg-neutral-700 transition-colors duration-200 rounded-md">
          <FaArrowUpWideShort />
          <span className="text-sm">Popular</span>
        </button>
      </Link>
      <Link to={'/'}>
        <button className="flex gap-3 items-center text-2xl w-full p-4 hover:bg-neutral-700 transition-colors duration-200 rounded-md">
          <MdOutlineExplore />
          <span className="text-sm">Explore</span>
        </button>
      </Link>
      <Link to={'/'}>
        <button className="flex gap-3 items-center text-2xl w-full p-4 hover:bg-neutral-700 transition-colors duration-200 rounded-md">
          <IoMdStats />
          <span className="text-sm">All</span>
        </button>
      </Link>
      <Separator className="bg-neutral-600" />
      <Accordion type="single" collapsible className="px-2">
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:no-underline uppercase tracking-widest font-normal text-neutral-300">Spaces</AccordionTrigger>
          <AccordionContent>
            <Link to={'/space/new'}>
              <button className="flex gap-3 items-center text-2xl w-full p-4 hover:bg-neutral-700 transition-colors duration-200 rounded-md">
                <AiOutlinePlusSquare />
                <span className="text-sm">Create Community</span>
              </button>
            </Link>
            {userSpaces?.map((space: Space, index: any) => (
              <Link to={`/space/${space._id}`} key={index} state={{space}}>
                <button className="flex gap-3 items-center text-2xl w-full p-4 hover:bg-neutral-700 transition-colors duration-200 rounded-md">
                  <Avatar>
                    <AvatarImage src={space?.avatar} />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{space?.name}</span>
                </button>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default LeftSidebar