import { spaceTopics } from "@/utils/helpers"
import { Button } from '@/components/ui/button';
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSpaces, joinSpace } from "@/api/spaceApi";
import { Space } from "@/models/types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SelectSpace = () => {
  const [topics, setTopics] = useState<string[]>([])
  const [isTopicsPanel, setIsTopicsPanel] = useState(true);
  const [joinedSpaces, setJoinedSpaces] = useState<any[]>([]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handlePanelToggle = ()=>{
    if (topics.length < 1) {
      toast.error("Please select at least one topic to continue");
      return;
    }
    setIsTopicsPanel(!isTopicsPanel);
  }
  const handleTopicClick = (topic: string) => {
    setTopics((prev) => {
      if (prev.includes(topic)) {
        return prev.filter((t) => t !== topic);
      } else {
        return [...prev, topic];
      }
    });
  };
  const { data:recommendedSpaces } = useQuery<Space[]>({
    queryKey:["getSpaces"],
    queryFn: getSpaces,
  })
  const mutation = useMutation({
    mutationFn: joinSpace,
    onError: (error:any) => {
      toast.error(error?.response?.data?.error);
    },
    onSuccess: (response) =>{
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["getSpaces"] });
    }
  })
  const handleJoinSpace = (spaceId:any)=>{
    mutation.mutate(spaceId);
    setJoinedSpaces((prev) => [...prev, spaceId]);
  }
  const handleSpacesContinue = () =>{
    if(joinedSpaces.length < 3){
      toast.error("Please join at least 3 spaces to continue");
      return;
    }
    else{
      navigate('/');
    }
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-neutral-900">
      <div className={`flex-col items-center md:max-w-3xl text-white ${isTopicsPanel ? 'flex' : 'hidden'}`}>
        <h2 className="text-3xl font-bold">What are your Interests</h2>
        <p className="text-gray-500">Select your interests to get started</p>
        <div className="flex flex-wrap gap-4 mt-4">
          {spaceTopics.map((topic)=>(
            <button key={topic} onClick={() => handleTopicClick(topic)} className={`bg-neutral-800 text-white border border-solid border-white rounded-full px-4 py-2 text-sm font-medium hover:bg-neutral-700 transition-colors duration-300 ${topics.includes(topic) ? '!bg-neutral-600' : ''}`}>
              {topic}
            </button>
          ))}
        </div>
        <Button variant={"default"} className="mt-6 bg-white text-black hover:bg-neutral-200 border border-solid border-white transition-colors duration-150" onClick={() => handlePanelToggle()}>
          Continue
        </Button>
      </div>
      <div className={`flex-col items-center md:max-3xl text-white ${isTopicsPanel ? 'hidden' : 'flex'}`}>
        <h2 className="text-3xl font-bold">Here are some Recommended Spaces</h2>
        <p className="text-gray-500">Join upto 3 Spaces to get Started</p>
        <div className="flex flex-wrap justify-center gap-4 mt-4 w-full">
          {recommendedSpaces?.map((space:Space,index)=>(
            <div key={index} className="w-1/4 flex items-start justify-between rounded-md p-4 border border-solid border-white">
              <div className="flex">
              <img src={space.avatar}  className="w-12 h-12 rounded-full mr-2" />
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{space.name}</span>
                {/* <span className="text-gray-500 text-xs">{space.tagline}</span> */}
              </div>
              </div>
              <Button variant={joinedSpaces.includes(space._id) ? "secondary" : "default"} className={`ml-auto bg-blue-500 text-white text-xs hover:bg-blue-600 transition-colors duration-150 ${joinedSpaces.includes(space._id) ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => handleJoinSpace(space._id)} >
                Join
              </Button>
            </div>
          ))}
        </div>
        <Button variant={"default"} onClick={()=> handleSpacesContinue()} className="mt-6 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-150">
          Continue
        </Button>
      </div>
    </div>
  )
}

export default SelectSpace