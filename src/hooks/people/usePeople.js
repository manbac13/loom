import { useDispatch, useSelector } from "react-redux";
import {
  getPeople,
  getSearchedPeople,
  setPage,
  getPersonDetails,
  clearSelectedPerson,
  getKnownForData,
} from "store/people";

function usePeople() {
  const dispatch = useDispatch();

  //data
  const loading = useSelector((state) => state?.people?.ui?.loading);
  const pageNumber = useSelector((state) => state?.people?.page);
  const peopleData = useSelector((state) => state?.people?.popularPeople);

  //persona data
  const personalData = useSelector(
    (state) => state?.people?.selectedPerson?.personalData
  );
  const knownForData = useSelector(
    (state) => state?.people?.selectedPerson?.knownFor?.cast
  );

  //action
  const getPeopleAction = (params) => dispatch(getPeople(params));
  const setPageAction = (params) => dispatch(setPage(params));
  const getSearchedPeopleAction = (params) =>
    dispatch(getSearchedPeople(params));
  const getPersonDetailsAction = (params) => dispatch(getPersonDetails(params));
  const clearSelectedPersonAction = (params) =>
    dispatch(clearSelectedPerson(params));
  const getKnownForDataAction = (params) => dispatch(getKnownForData(params));
  return {
    loading,
    peopleData,
    pageNumber,
    knownForData,

    getPeopleAction,
    getSearchedPeopleAction,
    setPageAction,
    getPersonDetailsAction,
    personalData,
    clearSelectedPersonAction,
    getKnownForDataAction,
  };
}

export default usePeople;
