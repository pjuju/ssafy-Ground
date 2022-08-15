import "styles/Search/Filter.scss";
import { Box, Modal } from "@mui/material";

import { useSearchDispatch } from "../SearchContext";
import FilterContent from "./FilterContent";
import { useFilterDispatch, useFilterState } from "./FilterContext";

function FilterModal({ open, setOpen }) {
  const { select, date, category, gender, age, location } = useFilterState();
  const filterDispatch = useFilterDispatch();
  const searchDispatch = useSearchDispatch();

  // 모달창 닫기
  const handleClose = () => {
    filterDispatch({ type: "select", select: false });
    setOpen(false);
  };

  // 설정 버튼을 누르면 SearchContext 변경
  const submit = (e) => {
    e.preventDefault();
    searchDispatch({ type: "date", date });
    searchDispatch({ type: "category", category });
    searchDispatch({ type: "gender", gender });
    searchDispatch({ type: "age", age });
    searchDispatch({ type: "location", location });
    handleClose();
  };

  return (
    <>
      <Modal
        className="filter-modal-container"
        open={open}
        onClose={handleClose}
        aria-labelledby="search-modal-title"
        aria-describedby="search-modal-description"
      >
        <Box className={open ? "filter-modal" : "filter-modal close"}>
          <FilterContent />
          {!select && (
            <button className="filter-modal__submit" onClick={submit}>
              설정
            </button>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default FilterModal;
