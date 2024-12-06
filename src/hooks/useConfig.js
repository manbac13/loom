import { useDispatch, useSelector } from "react-redux";
import { getLanguages } from "store/config";

function useConfig() {
  const dispatch = useDispatch();

  const languages = useSelector((state) => state?.config?.languages);

  //actions
  const getLangaugesAction = () => dispatch(getLanguages());
  
  return {
    languages,

    getLangaugesAction,
  };
}

export default useConfig;
