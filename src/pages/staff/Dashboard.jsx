import VisitorsStatsCard from "../../components/cards/VisitorsStatsCard";
import VisitorsStatsPieChart from "../../components/charts/VisitorsStatsPieChart";
import { barChartsData, pieChartsData } from "../../data";
import VisitorsStatsBarChart from "../../components/charts/VisitorsStatsBarChart";
import VisitorsStatsLineChart from "../../components/charts/VisitorsStatsLineChart";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Api } from "../../axios";

const Dashboard = () => {
  const {
    availablePov,
    monthlyStats,
    visitPurposeData,
    visitorsStatsPerDay,
    visitorsStatsData
  } = useDashboard();

  return (
    <div className="p-2 w-full z-0 relative">
      <div className="flex flex-wrap p-0 justify-center">
        <div className="bg-white text-dark p-4 shadow-lg mx-2 flex-1 border-solid border-[1px] border-light rounded-md capitalize sm:mt-0 mt-2">
          <h4 className="font-bold">Visitors</h4>
          <div>
            {visitorsStatsPerDay.map(({ day, value }) => {
              return (
                <div
                  className="flex items-center justify-between mt-3 min-w-max"
                  key={day}
                >
                  <p>{day}</p>
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
      {JSON.stringify(availablePov)}

      {/* //!!========================== PIE CHART ===========================!! */}
      <div className="flex flex-1 mr-4 mt-4 flex-col lg:flex-row w-full justify-between flex-wrap p-4 !capitalize">
        {visitPurposeData.map(({ title, data }) => {
          return (
            <VisitorsStatsPieChart
              title={title}
              key={title}
              chartData={{
                labels: data.map(({ label }) => label),
                datasets: [
                  {
                    data: data.map(({ value }) => value),
                    backgroundColor: ["#604e9e", "#8B0000", "#0f6e17"]
                  }
                ]
              }}
            />
          );
        })}
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
                    backgroundColor: ["#604e9e", "#8B0000", "#0f6e17"]
                  }
                ]
              }}
            />
          );
        })}
      </div>

      <div className="w-full p-3">
        <div className="flex flex-1 mr-4 mt-4 flex-col lg:flex-row w-full justify-between">
          <VisitorsStatsBarChart
            title={"Monthly visitors"}
            chartData={{
              labels: monthlyStats?.data.label,
              datasets: [
                {
                  data: monthlyStats?.data.invitedVisitors,
                  label: "Invited Visitors",
                  backgroundColor: ["#604e9e"]
                },
                {
                  data: monthlyStats?.data.uninvitedVisitors,
                  label: "Uninvited Visitors",
                  backgroundColor: "#8B0000"
                }
              ]
            }}
          />

          <VisitorsStatsLineChart
            title={barChartsData[0].title}
            key={barChartsData[0].title}
            chartData={{
              labels: monthlyStats?.data.label,
              datasets: [
                {
                  data: monthlyStats?.data.invitedVisitors,
                  label: "Invited Visitors",
                  backgroundColor: ["#604e9e"],
                  lineTension: 0.5,
                  borderWidth: 1.5,
                  borderColor: "#604e9e"
                },
                {
                  data: monthlyStats?.data.uninvitedVisitors,
                  label: "Uninvited Visitors",
                  backgroundColor: "#8B0000",
                  lineTension: 0.5,
                  borderWidth: 1.5,
                  borderColor: "#8B0000"
                }
              ]
            }}
          />
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
                    backgroundColor: ["#604e9e"]
                  },
                  {
                    data: barChartsData[1].data.map(({ value }) => value[1]),
                    label: "Unscheduled Visitors",
                    backgroundColor: "#8B0000"
                  }
                ]
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
                    borderColor: "#604e9e"
                  },
                  {
                    data: barChartsData[1].data.map(({ value }) => value[1]),
                    label: "Unscheduled Visitors",
                    backgroundColor: "#8B0000",
                    lineTension: 0.5,
                    borderWidth: 1.5,
                    borderColor: "#8B0000"
                  }
                ]
              }}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// !!!!!!!!!!!!!=========================================================================
const useDashboard = () => {
  const [allVisitors, setAllVisitors] = useState(null);
  const [refresh] = useState(false);
  const [daysAgo, setDaysAgo] = useState(1);
  const [availablePov, setAvailablePov] = useState()
  const [mostOccurredPov, setMostOccurredPov] = useState("0")
  const [visitorsForDaysAgo, setVisitorsForDaysAgo] = useState(null);
  const [visitorsForToday, setVisitorsToDay] = useState(null);
  const { data } = useFetch("visitor", [refresh]);
  const pov = useFetch("/settings/visit-purposes", []).data;

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
      const returnPovList = data?.visitors?.map((item) => {
        return item.purpose
      })
      //  getting all POVS  and merging
      const defaultFields = pov?.data?.defaultFields;
      const customFields = pov?.data?.customFields;
      const allFields = defaultFields?.concat(customFields);

      const counts = {};
      for (const pov of returnPovList) {
        if (!counts[pov]) {
          counts[pov] = 0;
        }
        counts[pov]++;
      }

      let maxCount = 0;
      for (const pov in counts) {
        if (counts[pov] > maxCount) {
          maxCount = counts[pov];
          setMostOccurredPov(pov);
        }
      }

      allFields?.map(povs => {
        return povs.id == Number(mostOccurredPov) ? setAvailablePov(povs) : null
      });
    }

    // ?? =============== GETTING USER CURRENT PLAN TO SAVE FROM THE GENESIS OF THE PAGE ======= ??//
    const fetchPlan = async () => {
      await Api.get("/users/current").then((res) => {
        localStorage.setItem("User Current", JSON.stringify(res.data?.data));
        localStorage.setItem("User Plan", res.data?.data.plan?.plan_name);
      });
    };
    fetchPlan();
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
  }, [allVisitors]);

  const visitorsStatsPerDay = [
    { day: "All Time", value: allVisitors?.length },
    { day: "Yesterday", value: visitorsForDaysAgo?.length },
    { day: "Today", value: visitorsForToday?.length }
  ];

  // !!______________________GET VISITOR BY MONTHLY___________________________!! //
  const { data: monthlyStats } = useFetch("visitor/monthly-stats", [refresh]);
  const { data: generalStats } = useFetch("visitor/general-stats", [refresh]);
  const { data: signedIn } = useFetch("visitor/get/signed-in-visitors", [
    refresh
  ]);
  const { data: exitedVisitors } = useFetch(
    "visitor/get/exited-visitor-today",
    [refresh]
  );

  const [visitorsStatsData, setVisitorStatsData] = useState([
    {
      title: "Visitors in premises",
      value: generalStats?.data.signedInVisitors
    },
    { title: "Exits", value: generalStats?.data.signedOutVisitors },
    { title: "Scheduled visits", value: generalStats?.data.todayInvites }
  ]);

  // !!______________________GET VISITOR BY PURPOSE___________________________!! //
  const { data: visitorsByDeliveries } = useFetch(
    "visitor/purposes-schedule/deliveries",
    [refresh]
  );
  const { data: visitorsByContractors } = useFetch(
    "visitor/purposes-schedule/contractor",
    [refresh]
  );
  const { data: visitorsByInterview } = useFetch(
    "visitor/purposes-schedule/interview",
    [refresh]
  );
  if (availablePov)
    Api.get(`/visitor/purposes/${availablePov?.visit_purpose_label}`)
      .then((res) => {
        console.log(res.data.data);
      })

  // console.log(visitorsByHighestPov);


  const [visitPurposeData, setVisitPurposeData] = useState([
    {
      title: "visitors by purpose",
      data: [
        { label: "Interview", value: visitorsByInterview?.data.count },
        { label: "Contractor", value: visitorsByContractors?.data.count },
        { label: "Deliveries", value: visitorsByDeliveries?.data.count }
      ]
    }
  ]);

  // !!______________ RE ASSIGNING DATA FOR ALL VALUES AGAIN___________________!!//
  useEffect(() => {
    setVisitPurposeData([
      {
        title: "visitors by purpose",
        data: [
          { label: "Interview", value: visitorsByInterview?.data.count },
          { label: "Contractor", value: visitorsByContractors?.data.count },
          { label: "Deliveries", value: visitorsByDeliveries?.data.count }
        ]
      }
    ]);

    setVisitorStatsData([
      {
        title: "Visitors in premises",
        value: signedIn?.message.length
      },
      { title: "Exits", value: exitedVisitors?.data.rows.length },
      { title: "Scheduled visits", value: generalStats?.data.todayInvites }
    ]);
  }, [data]);


  return {
    availablePov,
    allVisitors,
    visitorsForDaysAgo,
    visitorsForToday,
    monthlyStats,
    visitPurposeData,
    visitorsStatsPerDay,
    visitorsStatsData
  };
};
