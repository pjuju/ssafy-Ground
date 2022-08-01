import PropTypes from "prop-types";
import IdTab from "components/FindId/IdTab.js";
import PasswordTab from "components/FindId/PasswordTab.js";

export function TabPanel(props) {
	const {value, index, ...other } = props;
	 
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === 0 && (
				<IdTab/>
			)}
			{value === 1 && (
				<PasswordTab/>
			)}
		</div>
	);
};

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

export default TabPanel;