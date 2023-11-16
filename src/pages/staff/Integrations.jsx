import React from "react";
import { useState } from "react";
import IntegrationCard from "../../components/cards/IntegrationCard";
import SearchableDropdown from "../../components/dropdowns/SearchableDropdown";
import eventbriteLogo from '../../assets/eventbrite.png'
import paystackLogo from '../../assets/paystack.png'
import EventbriteModal from "../../components/modals/EventbriteModal";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const Integrations = () => {
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState('')

  const [showEventbriteModal, setShowEventbriteModal] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const { data, loading, error } = useFetch('settings/integrations', [refresh])


  const filterItems = [
    {
      searchState: country,
      stateModifier: setCountry,
      title: "Country",
      options: ["lorem", "ipsum", "dolor"],
    },
    {
      searchState: category,
      stateModifier: setCategory,
      title: "Category",
      options: ["lorem", "ipsum", "dolor"],
    },
  ];

  const integrationsCardData = [
    {
      logo: paystackLogo,
      title: "paystack",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptae vero eum eius quod veritatis odio, nemo nesciunt! Possimus, inventore aut rerum perferendis neque iusto vero a",
      status: "active",
    },
    {
      logo: eventbriteLogo,
      title: 'eventbrite',
      description:
        "Eventbrite is the world's largest event ticketing and marketing platform helping event organizers create, manage, and promote events. From concerts to festivals, and community events to conferences, Eventbrite empowers millions of events in 180 countries.Easy-to-use ticketing solutions, as well as event management and marketing tools",
      status: "inactive",
    },
  ]

  if (loading) return <Loading />
  // if (error) return <Error message={error?.message} />

  return (
    <div>
      {/* <div className="flex bg-white m-2 p-4 shadow-sm rounded-sm py-8">
        {filterItems.map(({ searchState, stateModifier, title, options }) => (
          <div className="w-1/5 min-w-[150px] mx-2 mb-2" key={options}>
            <p className="capitalize font-normal text-dark">{title}</p>
            <SearchableDropdown
              options={options}
              selectedOption={searchState}
              setSelectedOption={stateModifier}
              transparent={true}
            />
          </div>
        ))}
        <div className=" w-max ml-2">
          <p >Search:</p>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 bg-transparent rounded-md border border-light border-solid outline-none"
          />
        </div>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6  justify-center p-2 rounded-md drop-shadow-sm mt-4 bg-lightest">
        {
          integrationsCardData.map(
            ({ title, description, status, logo }) => (
              <IntegrationCard title={title} description={description} status={'connect'} logo={logo} showModal={showEventbriteModal} setShowModal={setShowEventbriteModal} />
            )
          )
        }
      </div>

      <EventbriteModal showModal={showEventbriteModal} setShowModal={setShowEventbriteModal} refresh={refresh} setRefresh={setRefresh} />


    </div>
  );
};

export default Integrations;
