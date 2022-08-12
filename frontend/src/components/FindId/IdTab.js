import React from "react";
import IdCheck from "components/FindId/IdCheck.js";
import IdResult from "components/FindId/IdResult.js";

function IdTab({idFlag, onSetIdFlag, userId, onSetUserId}) {


	return (
		<div>
			{idFlag === 0 && (
				<IdCheck onSetIdFlag={onSetIdFlag} idFlag={idFlag} onSetUserId={onSetUserId} userId={userId}/>
			)}
			{idFlag === 1 && (
				<IdResult onSetIdFlag={onSetIdFlag} idFlag={idFlag} userId={userId}/>
			)}
		</div>
		)
}

export default IdTab;