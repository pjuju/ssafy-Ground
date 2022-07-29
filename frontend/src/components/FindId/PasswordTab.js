import React from "react";
import PasswordCheck from "components/FindId/PasswordCheck.js";
import PasswordResult from "components/FindId/PasswordResult.js";

export function PasswordTab(){
	const [isAuth, setIsAuth] = React.useState(false);
	
	const handleIsAuth = (bool) => {
		setIsAuth(bool)
	};


	return (
		<div>
			{isAuth === false && (
				<PasswordCheck handleIsAuth={handleIsAuth}/>
			)}
			{isAuth === true && (
				<PasswordResult handleIsAuth={handleIsAuth}/>
			)}
		</div>
		)
};

export default PasswordTab;