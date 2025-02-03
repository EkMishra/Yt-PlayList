import { useContext } from "react";
import { DataContext } from "../pages/SummaryPage";

export default function SummaryBlock() {
  const {
    fetchedData: { data },
    loading,
  } = useContext(DataContext);

  if (loading) return <div>Creating Summary</div>;

  if (!data) return <></>;
  return (
    <>
      <p>{data.summarizedResult.summary}</p>
      {data.summarizedResult.keyPoints.map(point =><p>{point}</p>)}
      {/* <p>{data.summarizedResult.keyPoints}</p> */}
    </>
  );
}
