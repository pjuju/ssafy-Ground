import React from "react";
import IdCheck from "components/FindId/IdCheck.js";
import IdResult from "components/FindId/IdResult.js";

function IdTab() {
	const [isAuth, setIsAuth] = React.useState(false);
	
	const handleIsAuth = (bool) => {
		setIsAuth(bool)
	};


	return (
		<div>
			{isAuth === false && (
				<IdCheck handleIsAuth={handleIsAuth}/>
			)}
			{isAuth === true && (
				<IdResult handleIsAuth={handleIsAuth}/>
			)}
		</div>
		)
}

export default IdTab;