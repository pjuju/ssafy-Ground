import { Grid, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import GrButton from "components/common/GrButton";
import GrTextField from "components/common/GrTextField";
import { useForm, Controller } from "react-hook-form";
import "styles/Search/Search.scss";

function Search() {
  const { control } = useForm({ defaultValues: { standard: "", word: "" } });
  return (
    <Grid className="search-inner" item>
      <form>
        <Grid className="search-inner__top" container direction="column">
          <Grid className="top__search-bar" container justifyContent="center">
            <Grid xs={2} item>
              <FormControl size="small" sx={{ minWidth: "100%" }}>
                <InputLabel id="search-standard" className="top__search-label">
                  기준 선택
                </InputLabel>
                <Controller
                  name="standard"
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="search-standard"
                      label="기준 선택"
                      {...field}
                    >
                      <MenuItem className="top__search-dropdown" value="board">
                        게시글
                      </MenuItem>
                      <MenuItem className="top__search-dropdown" value="user">
                        유저
                      </MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid className="top__search-field-wrapper" xs={6} item>
              <Controller
                name="word"
                control={control}
                render={({ field }) => (
                  <GrTextField
                    className="top__search-field"
                    size="small"
                    label="검색어 입력"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid xs={1} item>
              <GrButton className="top__search-button" variant="contained">
                검색
              </GrButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default Search;
