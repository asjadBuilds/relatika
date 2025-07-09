import { getSpacesByQuery } from "@/api/spaceApi";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom"
import { Space } from '../../models/types'
import { Separator } from "@/components/ui/separator";
const SpaceListing = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const { data } = useQuery<Space[]>({
        queryKey: ["searchSpaces", searchQuery],
        queryFn: () => getSpacesByQuery(searchQuery),
        enabled: !!searchQuery
    });
    return (
        <div className="flex flex-col text-white m-2">
            {data?.map((space: any, index: any) => (
                <Link to={`/space/${space._id}`} key={index} state={{ space }}>
                    <Separator className="bg-neutral-600" />
                    <div className="flex items-center gap-4 p-4 rounded-md hover:bg-neutral-800 transition-colors duration-200">
                        <img src={space?.avatar} alt="" className="w-20 rounded-full" />
                        <div className="flex flex-col gap-1">
                            <h1 className="text-2xl font-bold">{space?.name}</h1>
                            <p>{space?.description}</p>
                            <span>{space?.members} Members</span>
                        </div>
                    </div>
                    <Separator className="bg-neutral-600" />
                </Link>
            ))}
        </div>
    )
}

export default SpaceListing