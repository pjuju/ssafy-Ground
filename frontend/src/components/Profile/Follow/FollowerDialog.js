import { Dialog, DialogTitle, List } from "@mui/material";
import FollowerUserProfile from "./FollowerUserProfile";
import "styles/Profile/Follow.scss";
import { getFollowerList } from "api/follow";
import { useEffect, useState } from "react";

function FollowerDialog(props) {
  const { onClose, open, profileId, userId, setRerender, rerender } = props;
  const [followerList, setFollowerList] = useState([]);

  // 팔로워 다이얼로그에서 삭제 버튼 클릭 시 다이얼로그를 다시 렌더링하기 위함
  const [deleteRerender, setDeleteRerender] = useState(false);

  useEffect(() => {
    // 팝업 창이 열릴 때
    if (open === true) {
      getFollowerList(profileId, userId, (res) => {
        setFollowerList(res.data);
        console.log(res.data);
      });
    }
  }, [open, deleteRerender]);

  return (
    <Dialog className="dialog-follower" onClose={onClose} open={open}>
      <DialogTitle>팔로워</DialogTitle>
      <List className="dialog-follower__list">
        {followerList.length > 0 ? (
          followerList.map((follower, index) => {
            return (
              <FollowerUserProfile
                key={index}
                userId={follower.id}
                userImage={follower.userImage}
                nickname={follower.nickname}
                username={follower.username}
                followState={follower.followState}
                setRerender={setRerender}
                rerender={rerender}
                setDeleteRerender={setDeleteRerender}
                deleteRerender={deleteRerender}
              />
            );
          })
        ) : (
          <p className="dialog-follower__list--none">
            해당 사용자를 팔로우하고 있는 사람이 없습니다.
          </p>
        )}
      </List>
    </Dialog>
  );
}

export default FollowerDialog;
