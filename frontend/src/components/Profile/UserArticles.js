import { TabContext, TabPanel } from "@mui/lab";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";

function UserArticles() {
  const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const styles = () => ({
    indicator: {
      "&:active": {
        outline: "none",
      },
      "&:focus": {
        outline: "none",
      },
    },
    selected: {
      fontWeight: "700",
    },
  });

  return (
    <Grid className="user-articles">
      <TabContext>
        <Box sx={{ borderBottom: 1, borderColor: "#fff" }}>
          <Tabs
            value={value}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab className="user-articles__tab" label="작성한 글" value={0} />
            <Tab className="user-articles__tab" label="저장한 글" value={1} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          작성한 글
        </TabPanel>
        <TabPanel value={value} index={1}>
          저장한 글
        </TabPanel>
      </TabContext>
    </Grid>
  );
}

export default UserArticles;
