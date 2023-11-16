import React from "react";

const Active = ({ data }) => {
  return <span
    className={`text-black ${data ? 'bg-green' : 'bg-lightest'} text-white capitalize font-semibold rounded-md py-1 px-2 `}
  >
    {data ? 'active' : 'inactive'}
  </span>
}

const Default = ({ data }) => {
  return (<>
    {
      data ?
        <span className="text-black bg-yellow capitalize rounded-md font-semibold py-1 px-2 mx-2">
          {data && 'default'}
        </span>
        : <> </>
    }</>

  )
}

const Compulsory = ({ data }) => {
  return <span
    className={`text-black ${data ? 'bg-lightred' : 'bg-lightblue'} capitalize text-white  font-semibold rounded-md py-1 px-2`}
  >
    {data ? 'compulsory' : 'optional'}
  </span>
}

const renderStatus = (key, data) => {
  switch (key) {
    case 'is_enabled':
      return <Active data={data} />;
    case 'is_company_default':
      return <Default data={data} />;
    case ('is_default' || 'is_company_default'):
      return <Default data={data} />;
    case 'is_required':
      return <Compulsory data={data} />;
    default:
      break;
  }
}


const StatusCol = ({ keys, row }) => {
  return (
    <div className="space-x-4">
      {
        keys.map((key) => {
          return (
            <>
              {renderStatus(key, row[key])}
            </>
          );
        })
      }
    </div>
  );
};

export default StatusCol;
