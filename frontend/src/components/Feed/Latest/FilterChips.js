import theme from "components/common/theme.js";

import { ThemeProvider } from "@emotion/react";
import { Chip } from "@mui/material";
import { useEffect } from "react";
import { updateInterest } from "api/user";

function FilterChips({
  interestList,
  onToggleInterestList,
  changeInterestList,
}) {
  useEffect(() => {
    // changeInterestList();
  }, [interestList]);

  const handleDeleteChip = (id) => {
    // 토글 후 서버에 관심 운동 종목 업데이트를 요청하기
    onToggleInterestList(id);

    const array = [...interestList];
    const deletedArray = [];

    array.map(
      (item) =>
        item.id !== id &&
        item.isInterested && // 내가 삭제한 칩의 아이디와 같지 않고, isInterested가 true라면
        deletedArray.push(item.id) // deletedArray에 해당 item 추가
    );

    updateInterest(deletedArray, (res) => {
      window.location.reload();
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {interestList.map((item) => {
        if (item.isInterested) {
          return (
            <Chip
              label={item.value}
              onDelete={() => handleDeleteChip(item.id)}
            />
          );
        }
      })}
    </ThemeProvider>
  );
}

export default FilterChips;
