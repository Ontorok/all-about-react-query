import { useParams } from "react-router-dom";
import { useSuperHero } from "../hooks/useSuperHero";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RQSuperHero = () => {
  const { id } = useParams();
  const { data, isLoading } = useSuperHero(Number(id));
  const heroId = data?.id;
  console.log(heroId);

  const { data: friend, isLoading: isFriendLoading } = useQuery({
    queryKey: ["super-hero-friends", heroId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:4100/friends?heroId=${heroId}`);
      return res.data;
    },
    enabled: !!heroId,
  });

  console.log(friend);

  if (isLoading) return <div>Loading hero....</div>;

  return (
    <div>
      <div>{data?.name}</div>
      {!isFriendLoading && friend && friend.length > 0 && <div>{friend[0].name}</div>}
    </div>
  );
};

export default RQSuperHero;
