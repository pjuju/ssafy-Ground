import "styles/Profile/UserStatic.scss";
import { Grid } from "@mui/material";
import { badges } from "./badgeIcon";

const getCategoryLists = (board) => {
  let i = 0;
  let categoryLists = [];
  let categoryList = [];

  for (; i < board.length; i++) {
    if (i !== 0 && i % 5 === 0) {
      categoryLists.push(categoryList);
      categoryList = [];
    }
    categoryList.push(board[i].categoryId);
  }

  if (categoryList.length !== 0) {
    categoryLists.push(categoryList);
  }

  return categoryLists;
};

function UserGroundBadge({ board }) {
  return (
    <>
      <Grid className="ground__title category-badge__title">
        <h2>최근 운동한 종목</h2>
      </Grid>
      <Grid className="category-badge" container textAlign="center">
        {getCategoryLists(board).map((categoryList, index) => (
          <Grid
            key={index}
            className="category-badge__wrapper"
            item
            xs={6}
            sm={3}
          >
            {categoryList.map((id, index) => (
              <img
                className="category-badge__img"
                key={index}
                width="18px"
                src={badges[id - 1]}
                alt="category_image"
              />
            ))}
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default UserGroundBadge;
