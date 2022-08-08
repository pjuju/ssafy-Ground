import theme from "components/common/theme.js";

import { ThemeProvider } from "@emotion/react";
import { Chip } from "@mui/material";

function FilterChips() {
  const handleDeleteChip = () => {
    console.log("삭제");
  };

  return (
    <ThemeProvider theme={theme}>
      <Chip label="요가" onDelete={handleDeleteChip} />
      <Chip label="러닝" onDelete={handleDeleteChip} />
      <Chip label="축구" onDelete={handleDeleteChip} />
      <Chip label="필라테스" onDelete={handleDeleteChip} />
      {/* <Chip label="자전거/사이클" onDelete={handleDeleteChip} />
      <Chip label="야구" onDelete={handleDeleteChip} />
      <Chip label="배구" onDelete={handleDeleteChip} />
      <Chip label="홈트레이닝" onDelete={handleDeleteChip} />
      <Chip label="농구" onDelete={handleDeleteChip} /> */}
    </ThemeProvider>
  );
}

export default FilterChips;
