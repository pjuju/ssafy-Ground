import React from "react";
import PasswordCheck from "components/FindId/PasswordCheck.js";
import PasswordResult from "components/FindId/PasswordResult.js";

export function PasswordTab({userId, userEmail, pwFlag, onSetUserId, onSetUserEmail, onSetPwFlag}){


	return (
    <div>
      {pwFlag === 0 && (
        <PasswordCheck
					userId={userId}
					userEmail={userEmail}
					onSetUserId={onSetUserId}
          onSetUserEmail={onSetUserEmail}
          onSetPwFlag={onSetPwFlag}
        />
      )}
      {pwFlag === 1 && <PasswordResult userId={userId} userEmail={userEmail} />}
    </div>
  );
};

export default PasswordTab;