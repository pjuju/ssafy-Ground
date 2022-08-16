import { useSearchState } from "../../SearchContext";
import NoSearchResult from "../NoSearchResult";
import UserResultItem from "./UsearResultItem";

function UserSearchResult() {
  const { userResult } = useSearchState();

  return (
    <>
      {userResult.length === 0 && <NoSearchResult />}
      {userResult.length !== 0 &&
        userResult.map((user) => <UserResultItem key={user.id} user={user} />)}
    </>
  );
}

export default UserSearchResult;
