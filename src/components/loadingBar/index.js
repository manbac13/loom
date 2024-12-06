import Loader from "components/loader";
import PropTypes from "prop-types";

// project import

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const UILoader = ({ loading = false }) => (loading ? <Loader /> : <></>);
UILoader.propTypes = {
  loading: PropTypes.bool,
};
export default UILoader;
