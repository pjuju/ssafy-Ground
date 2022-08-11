import theme from "components/common/theme.js";

import { ThemeProvider } from "@emotion/react";
import { Chip } from "@mui/material";
import { useEffect } from "react";
import { initUserDetail } from "api/user";

function FilterChips({ interestList, onToggleInterestList }) {
  useEffect(() => {
    console.log(interestList);
  });

  const handleDeleteChip = (id) => {
    onToggleInterestList(id);

    // 서버에 관심 운동 종목 업데이트를 요청하기
    initUserDetail();
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
