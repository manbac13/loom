import { Pagination } from "@mui/material";

const PaginationItem = ({
  count,
  pageNumber,
  setPageAction,
  setIsTransitioning,
}) => {
  const handlePageChange = (event, value) => {
    setPageAction(value);
    setIsTransitioning(true);
  };
  return (
    <>
      <Pagination
        count={count > 500 ? 500 : count}
        page={pageNumber}
        variant="outlined"
        shape="rounded"
        color="primary"
        onChange={handlePageChange}
      />
    </>
  );
};

export default PaginationItem;
