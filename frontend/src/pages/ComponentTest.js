import "styles/ComponentTest.css";

import GrButton from "components/common/GrButton";
import GrTextField from "components/common/GrTextField";

function ComponentTest() {
  return (
    <>
      <GrButton className="grButton" variant="contained">버튼입니다</GrButton>
      <GrTextField className="grTextField" label="텍스트필드입니다"/>
      <GrTextField label="작은 텍스트필드입니다" size="small" fullWidth/>
    </>
  );
}

export default ComponentTest;

