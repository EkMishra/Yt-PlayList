import { useContext } from "react";
import { DataContext } from "./FrontPage";

export default function TimeBlock() {
  const {
    fetchedData: { data },
    loading,
    setLoading,
  } = useContext(DataContext);

  const totalTime = data?.totalTime || null;
  const totalVideos = data?.totalVideos || null;

  if (loading) return <div>Loading...</div>;

  if(!data) return <></>
  return (
    <div>
      <h1>Playlist Overview</h1>
      <p>Total Videos: {totalVideos}</p>
      <h2>Video Duration Breakdown</h2>
      <table>
        <thead>
          <tr>
            <th>Scale</th>
            <th>Days</th>
            <th>Hours</th>
            <th>Minutes</th>
            <th>Seconds</th>
          </tr>
        </thead>
        <tbody>
          {totalTime.map((time, index) => (
            <tr key={index}>
              <td>{time.scale}x</td>
              <td>{time.duration.days}</td>
              <td>{time.duration.hours}</td>
              <td>{time.duration.minutes}</td>
              <td>{time.duration.seconds}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
