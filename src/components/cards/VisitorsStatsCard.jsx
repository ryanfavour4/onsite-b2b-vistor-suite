const VisitorsStatsCard = ({ title, value }) => {
  return (
    <div className="bg-white text-dark p-4 shadow-lg mx-2 flex-1 border-solid border-[1px] border-light rounded-md capitalize sm:mt-0 mt-2">
      <div className="flex items-center justify-between py-2">
        <h4  className="font-bold">{title}</h4>
        <p>{value}</p>
      </div>
      <div className="bg-light h-2 w-full rounded-lg mt-4"></div>
    </div>
  );
};

export default VisitorsStatsCard;
