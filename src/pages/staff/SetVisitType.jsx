import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import { Api } from "../../axios";
import { toast } from "react-toastify";

export default function SetVisitType() {
  const { visitTypeObj, data, loading, handleValueChange, handleSubmit } =
    useSetVisitType();

  return (
    <div className="bg-white h-full p-6">
      <h1 className="text-2xl font-bold text-center py-4">
        Set Visit Type Configuration For {data?.data.visit_purpose_name}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-6 border-2 rounded-md border-lightestblue max-w-2xl m-auto p-7"
      >
        <div className="">
          <div htmlFor="">Visit Type</div>
          <select
            value={data?.data.visit_purpose_name}
            className="p-2 outline-none rounded-lg border border-lightblue cursor-pointer text-lightblue w-full max-w-[250px]"
          >
            <option value={data?.data.visit_purpose_name} hidden>
              {data?.data.visit_purpose_name}
            </option>
          </select>
        </div>

        <div className="">
          <div htmlFor="">Self Sign Out</div>
          <select
            name="self_signout"
            value={visitTypeObj.self_signout}
            onChange={handleValueChange}
            className="p-2 outline-none rounded-lg border border-lightblue cursor-pointer text-lightblue w-full max-w-[250px]"
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>

        <div className="">
          <div htmlFor="">Is Photo Required</div>
          <select
            name="isPhoto_required"
            value={visitTypeObj.isPhoto_required}
            onChange={handleValueChange}
            className="p-2 outline-none rounded-lg border border-lightblue cursor-pointer text-lightblue w-full max-w-[250px]"
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>

        <div className="">
          <div htmlFor="">Visitor Car</div>
          <select
            name="visitor_car"
            value={visitTypeObj.visitor_car}
            onChange={handleValueChange}
            className="p-2 outline-none rounded-lg border border-lightblue cursor-pointer text-lightblue w-full max-w-[250px]"
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>

        <div className="">
          <div htmlFor="">Visitor Item</div>
          <select
            name="visitor_items"
            value={visitTypeObj.visitor_items}
            onChange={handleValueChange}
            className="p-2 outline-none rounded-lg border border-lightblue cursor-pointer text-lightblue w-full max-w-[250px]"
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>

        <div className="col-span-2">
          <button className="w-full text-white bg-lightblue hover:bg-blue py-3 px-4 rounded-md my-2 ">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

const useSetVisitType = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(`/settings/visit-purpose/${id}`, [id]);
  const [visitTypeObj, setVisitTypeObj] = React.useState({
    visit_type: data?.data.visit_purpose_name,
    self_signout: false,
    welcome_message: "text",
    isPhoto_required: false,
    visitor_car: true,
    visitor_items: true,
  });

  const handleValueChange = (e) => {
    setVisitTypeObj({
      ...visitTypeObj,
      [e.target.name]: JSON.parse(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Api.post(`/settings/visit-type-configs`, visitTypeObj).then((res) => {
      toast.success(res.data.message);
    }).catch((err) => {
         toast("Default Visit Types Cannot Be Changed");
    });
  };

  useEffect(() => {
    setVisitTypeObj({
      ...visitTypeObj,
      visit_type: data?.data.visit_purpose_name,
    });
  }, [data]);

  return {
    id,
    data,
    loading,
    handleValueChange,
    visitTypeObj,
    handleSubmit,
  };
};
