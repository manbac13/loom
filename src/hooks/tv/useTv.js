import { useDispatch, useSelector } from "react-redux";
import { clearSelectedTvShow, getTvShowCast, getTvShowDetails } from "store/tv";

function useTv() {
  const dispatch = useDispatch();

  //data
  const loading = useSelector((state) => state?.tv?.ui?.loading);
  const selectedTvShow = useSelector(
    (state) => state?.tv?.selectedTvShow?.tvShowData
  );
  const selectedTvShowCast = useSelector(
    (state) => state?.tv?.selectedTvShow?.tvShowCast
  );

  //actions
  const clearSelectedTvShowAction = () => dispatch(clearSelectedTvShow());
  const getTvShowDetailsAction = (params) => dispatch(getTvShowDetails(params));
  const getTvShowCastAction = (params) => dispatch(getTvShowCast(params));

  return {
    loading,
    selectedTvShow,
    selectedTvShowCast,

    clearSelectedTvShowAction,
    getTvShowDetailsAction,
    getTvShowCastAction,
  };
}

export default useTv;
