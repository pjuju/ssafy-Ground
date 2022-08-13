import { Dialog, DialogTitle, List } from "@mui/material";
import FollowingUserProfile from "./FollowingUserProfile";
import "styles/Profile/Follow.scss";
import { useEffect, useState } from "react";
import { getFollowingList } from "api/follow";

function FollowingDialog(props) {
  const { onClose, open, profileId, userId, setRerender, rerender } = props;
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    // 사용자 정보 가져오기
    console.log("open : " + open);
    if (open === true) {
      getFollowingList(profileId, userId, (res) => {
        setFollowingList(res.data);
        console.log(res.data);
      });
    }
  }, [open]);

  return (
    <Dialog className="dialog-following" onClose={onClose} open={open}>
      <DialogTitle>팔로잉</DialogTitle>
      <List className="dialog-following__list">
        {followingList.length > 0 ? (
          followingList.map((following, index) => {
            return (
              <FollowingUserProfile
                key={index}
                userId={following.id}
                userImage={following.userImage}
                nickname={following.nickname}
                username={following.username}
                followState={following.followState}
                setRerender={setRerender}
                rerender={rerender}
              />
            );
          })
        ) : (
          <p>팔로우 하고 있는 사용자가 없습니다.</p>
        )}
      </List>
    </Dialog>
  );
}

export default FollowingDialog;
