import { Grid2 } from "@mui/material";
import UILoader from "components/loadingBar";
import useHome from "hooks/home/useHome";
import HomeBanner from "sections/home/banner";
import LatestTrailers from "sections/home/trailers";
import TrendingAll from "sections/home/trendingAll";
import WhatsPopular from "sections/home/whatsPopular";

const Home = () => {
  const { trendingAllLoading, whatsPopularLoading } = useHome();
  return (
    <>
      <UILoader loading={trendingAllLoading || whatsPopularLoading} />
      <Grid2 container spacing={4} mb={4}>
        <Grid2 size={12}>
          <HomeBanner />
        </Grid2>

        <Grid2 size={12} sx={{ px: { xs: 4, sm: 6, md: 10, lg: 20 } }}>
          <TrendingAll />
        </Grid2>

        <Grid2 size={12}>
          <LatestTrailers />
        </Grid2>

        <Grid2 size={12} sx={{ px: { xs: 4, sm: 6, md: 10, lg: 20 } }}>
          <WhatsPopular />
        </Grid2>
      </Grid2>
    </>
  );
};

export default Home;
