import VisitorsStatsCard from "../../components/cards/VisitorsStatsCard";
import VisitorsStatsPieChart from "../../components/charts/VisitorsStatsPieChart";
import { barChartsData, pieChartsData } from "../../data";
import VisitorsStatsBarChart from "../../components/charts/VisitorsStatsBarChart";
import VisitorsStatsLineChart from "../../components/charts/VisitorsStatsLineChart";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Api } from "../../axios";

const visitorsStatsData = [
  { title: "Visitors in premises", value: 0 },
  { title: "Exits", value: 0 },
  { title: "Scheduled visits", value: 0 },
];

const Dashboard = () => {
  const { visitorsForDaysAgo, visitorsForToday } = useDashboard();

  const [totalCompanies, setTotalCompanies] = useState(Number);
  const [monthlyCompanies, setMonthlyCompanies] = useState(Number);
  const [allStaffs, setAllStaffs] = useState(Number);
  const [allVisitors, setAllVisitors] = useState(Number);
  const [averageVisitors, setAverageVisitors] = useState(Number);

  useEffect(() => {
    try {
      const getTotalCompanies = async () => {
        await Api.get("admin/companies").then((res) => {
          console.log(res.data.count);
          setTotalCompanies(res?.data.count);
        });
      };

      const getMonthlyCompanies = async () => {
        await Api.get("admin/new-companies").then((res) => {
          console.log(res?.data.data.count);
          setMonthlyCompanies(res?.data.data.count);
        });
      };

      const getAllStaffs = async () => {
        await Api.get("admin/staffs").then((res) => {
          console.log(res?.data.data.count);
          setAllStaffs(res?.data.data.count);
        });
      };

      const getAllVisitors = async () => {
        await Api.get("admin/visitors").then((res) => {
          console.log(res?.data.data.count);
          setAllVisitors(res?.data.data.count);
        });
      };

      const getAverageVisitors = async () => {
        await Api.get("admin/av-visitors").then((res) => {
          console.log(res?.data.data.count);
          setAverageVisitors(res?.data.averageVisitors);
        });
      };

      getTotalCompanies();
      getMonthlyCompanies();
      getAllStaffs();
      getAllVisitors();
      getAverageVisitors();
    } catch (error) {
      console.log(error);
    }
  }, [totalCompanies, monthlyCompanies]);

  const visitorsStatsPerDay = [
    { details: "Total companies", value: totalCompanies },
    { details: "monthly  companies", value: monthlyCompanies },
    { details: "Total staffs", value: allStaffs },
    { details: "Total visitors", value: allVisitors },
    { details: "Average visitor", value: averageVisitors },
  ];

  return (
    <div className="p-2 w-full z-0 relative">
      <div className="flex flex-wrap p-0 justify-center">
        <div className="bg-white text-dark p-4 shadow-lg mx-2 flex-1 border-solid border-[1px] border-light rounded-md capitalize sm:mt-0 mt-2">
          <h4 className="font-bold">Visitors</h4>
          <div>
            {visitorsStatsPerDay.map(({ details, value }) => {
              return (
                <div
                  className="flex items-center justify-between mt-3 min-w-max"
                  key={details}
                >
                  <p>{details}</p>
                  <p>{value}</p>
                </div>
              );
            })}
          </div>
        </div>

        {visitorsStatsData.map(({ value, title }) => {
          return <VisitorsStatsCard value={value} title={title} key={title} />;
        })}
      </div>

      <div className="flex flex-wrap mt-4 p-0 !capitalize">
        {pieChartsData.map(({ title, data }) => {
          return (
            <VisitorsStatsPieChart
              title={title}
              key={title}
              chartData={{
                labels: data.map(({ label }) => label),
                datasets: [
                  {
                    data: data.map(({ value }) => value),
                    backgroundColor: ["#604e9e", "#8B0000", "#0f6e17"],
                  },
                ],
              }}
            />
          );
        })}
      </div>

      <div className="w-full p-3">
        <div className="flex flex-1 mr-4 mt-4 flex-col lg:flex-row w-full justify-between">
          {
            <VisitorsStatsBarChart
              title={barChartsData[0].title}
              key={barChartsData[0].title}
              chartData={{
                labels: barChartsData[0].data.map(({ month }) => month),
                datasets: [
                  {
                    data: barChartsData[0].data.map(({ value }) => value[0]),
                    label: "Scheduled Visitors",
                    backgroundColor: ["#604e9e"],
                  },
                  {
                    data: barChartsData[0].data.map(({ value }) => value[1]),
                    label: "Unscheduled Visitors",
                    backgroundColor: "#8B0000",
                  },
                ],
              }}
            />
          }
          {
            <VisitorsStatsLineChart
              title={barChartsData[0].title}
              key={barChartsData[0].title}
              chartData={{
                labels: barChartsData[0].data.map(({ month }) => month),
                datasets: [
                  {
                    data: barChartsData[0].data.map(({ value }) => value[0]),
                    label: "Scheduled Visitors",
                    backgroundColor: ["#604e9e"],
                    lineTension: 0.5,
                    borderWidth: 1.5,
                    borderColor: "#604e9e",
                  },
                  {
                    data: barChartsData[0].data.map(({ value }) => value[1]),
                    label: "Unscheduled Visitors",
                    backgroundColor: "#8B0000",
                    lineTension: 0.5,
                    borderWidth: 1.5,
                    borderColor: "#8B0000",
                  },
                ],
              }}
            />
          }
        </div>

        <div className="flex flex-1 mr-4 mt-4 flex-col md:flex-row w-full justify-between">
          {
            <VisitorsStatsBarChart
              title={barChartsData[1].title}
              key={barChartsData[1].title}
              chartData={{
                labels: barChartsData[1].data.map(({ month }) => month),
                datasets: [
                  {
                    data: barChartsData[1].data.map(({ value }) => value[0]),
                    label: "Scheduled Visitors",
                    backgroundColor: ["#604e9e"],
                  },
                  {
                    data: barChartsData[1].data.map(({ value }) => value[1]),
                    label: "Unscheduled Visitors",
                    backgroundColor: "#8B0000",
                  },
                ],
              }}
            />
          }
          {
            <VisitorsStatsLineChart
              title={barChartsData[1].title}
              key={barChartsData[1].title}
              chartData={{
                labels: barChartsData[1].data.map(({ month }) => month),
                datasets: [
                  {
                    data: barChartsData[1].data.map(({ value }) => value[0]),
                    label: "Scheduled Visitors",
                    backgroundColor: ["#604e9e"],
                    lineTension: 0.5,
                    borderWidth: 1.5,
                    borderColor: "#604e9e",
                  },
                  {
                    data: barChartsData[1].data.map(({ value }) => value[1]),
                    label: "Unscheduled Visitors",
                    backgroundColor: "#8B0000",
                    lineTension: 0.5,
                    borderWidth: 1.5,
                    borderColor: "#8B0000",
                  },
                ],
              }}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const useDashboard = () => {
  const [allVisitors, setAllVisitors] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [daysAgo, setDaysAgo] = useState(1);
  const [visitorsForDaysAgo, setVisitorsForDaysAgo] = useState(null);
  const [visitorsForToday, setVisitorsToDay] = useState(null);
  const { loading, error, data } = useFetch("visitor", [refresh]);

  // Get the current date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight for comparison

  const sortByDate = (a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateA - dateB;
  };

  useEffect(() => {
    if (data?.visitors) {
      setAllVisitors(data.visitors);
      allVisitors?.sort(sortByDate);
    }
  }, [data]);

  useEffect(() => {
    // Find the data objects with the date equal to today
    const todayData = allVisitors?.filter((item) => {
      const itemDate = new Date(item.createdAt);
      itemDate.setHours(0, 0, 0, 0); // Set time to midnight for comparison
      return itemDate.getTime() === today.getTime();
    });
    setVisitorsToDay(todayData);

    // Find the data objects with the date equal to yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - daysAgo); // Subtract 1 day

    const yesterdayData = allVisitors?.filter((item) => {
      const itemDate = new Date(item.createdAt);
      itemDate.setHours(0, 0, 0, 0); // Set time to midnight for comparison
      return itemDate.getTime() === yesterday.getTime();
    });
    setVisitorsForDaysAgo(yesterdayData);
  }, allVisitors);

  return {
    allVisitors,
    visitorsForDaysAgo,
    visitorsForToday,
  };
};
