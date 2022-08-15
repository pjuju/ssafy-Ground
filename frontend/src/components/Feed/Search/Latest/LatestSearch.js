import { Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function LatestSearch({
  latest,
  setOpen,
  handleDeleteItem,
  handleLatestClick,
}) {
  return (
    <>
      {latest?.map((item, index) => (
        <Grid
          className="search-latest-box__item-wrapper"
          container
          key={index}
          justifyContent="center"
        >
          <Grid
            className="search-latest-box__item"
            item
            xs={10}
            tabIndex={-1}
            onClick={() => handleLatestClick(item.word)}
          >
            {item.word}
          </Grid>
          <CloseIcon
            className="search-latest-box__delete"
            tabIndex={-1}
            onClick={() => handleDeleteItem(item.id)}
            onBlur={(e) => {
              const tabIndex = e.relatedTarget?.tabIndex;
              if (tabIndex !== -1) {
                setOpen(false);
              }
            }}
          />
        </Grid>
      ))}
      {latest.length === 0 && (
        <div className="search-latest-box__no-item">
          최근 검색어가 없습니다.
        </div>
      )}
    </>
  );
}

export default LatestSearch;
