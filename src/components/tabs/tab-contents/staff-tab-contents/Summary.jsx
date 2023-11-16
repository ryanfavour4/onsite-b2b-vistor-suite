import { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import Error from "../../../Error";
import Loading from "../../../Loading";


const Summary = ({ profileFields, loading, error }) => {
  return (
    <div className="my-4">
      {
        loading ?
          <Loading />
          :
          error ?
            <Error message={error?.message} />
            :
            <>
              {profileFields.map(({ title, value }) => {
                return (
                  <div
                    className="flex border-lightblue p-3 border-solid border-b-[1px] capitalize"
                    key={title}
                  >
                    <h3 className="w-2/6 font-semibold">{title}</h3>
                    <p className="w-4/6">{value}</p>
                  </div>
                );
              })}
            </>
      }
    </div>
  );
};

export default Summary;
