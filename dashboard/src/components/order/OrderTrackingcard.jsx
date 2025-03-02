import { CardTop } from "../CardTop";
import { MainCardContainer } from "../MainCardCointainer";
import { FaTruckMoving } from "react-icons/fa";

export const OrderTrackingcard = () => {
  return (
    <MainCardContainer>
      <CardTop heading="Order Tracking">
        <div className="text-sm font-medium text-text-primary-color">
          Order Id: <span className="text-accent-color">#ORD008</span>
        </div>
      </CardTop>
      <div>
        <div className="px-3 py-3">
          <h4 className="text-lg font-semibold text-text-primary-color">
            Out For Delivery
          </h4>
          <p className="text-sm font-medium text-text-secondary-color">
            Estimated Delivery Date :{" "}
            <span className="font-semibold text-text-primary-color">
              10 Jan 2025
            </span>
          </p>
          <div className="mt-4 border border-border-color p-4">
            <div className="grid h-[7px] w-full grid-cols-4 overflow-hidden rounded-full bg-bg-color-3">
              <div className="bg-accent-color"></div>
              <div className="bg-orange-500"></div>
              <div className="bg-green-500"></div>
              <div className="bg-blue-500"></div>
            </div>
            <div className="mt-4">
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                <TrackingLabel title="Ordered" />
                <TrackingLabel dotColor="bg-orange-500" title="Processing" />
                <TrackingLabel dotColor="bg-green-500" title="In Transist" />
                <TrackingLabel dotColor="bg-blue-500" title="Delivered" />
              </ul>
            </div>
          </div>
          <VerticalTimeLine />
        </div>
      </div>
    </MainCardContainer>
  );
};

const TrackingLabel = ({ dotColor = "bg-accent-color", title = "title" }) => {
  return (
    <li className="flex items-center gap-2">
      <span className={`size-2 rounded-full ${dotColor}`}></span>
      <h4 className="text-xs font-medium text-text-primary-color">
        {title} <span className="text-green-500">(Completed)</span>
      </h4>
    </li>
  );
};

const VerticalTimeLine = () => {
  return (
    <div className="mt-5">
      <h3 className="text-[17px] font-semibold text-text-primary-color">
        Shipment Progress :
      </h3>
      <div className="mt-4 pl-4">
        <VerticalTimeLineCard
          date="09 Jan 2025, 12:05 PM"
          statusText="Arrived at Rourkela Local Facility"
          location="Rourkela Sub Offile"
        />
        <VerticalTimeLineCard
          date="09 Jan 2025, 03:00 PM"
          statusText="Departed from Rourkela Local Facility"
          location="Rourkela Sub Offile"
        />
        <VerticalTimeLineCard
          date="09 Jan 2025, 07:30 PM"
          statusText="Arrived at Bhubaneswar Transit Hub"
          location="Bhubaneswar Main Office"
        />
        <VerticalTimeLineCard
          date="10 Jan 2025, 12:00 AM"
          statusText="Departed from Bhubaneswar Transit Hub"
          location="Bhubaneswar Main Office"
        />
        <VerticalTimeLineCard
          date="10 Jan 2025, 08:00 AM"
          statusText="Arrived at Delhi Transit Hub"
          location="Delhi Main Office"
        />
        <VerticalTimeLineCard
          date="10 Jan 2025, 01:30 PM"
          statusText="Out for Delivery"
          location="Delhi Local Office"
        />
        <div className="relative pb-5 pl-10">
          <h3 className="pb-1 text-[15px] font-semibold text-text-primary-color">
            Delivered
          </h3>

          <div className="absolute left-0 top-0 z-10 flex size-5 -translate-x-2/4 items-center justify-center rounded-full bg-accent-color text-xs text-white">
            <FaTruckMoving />
          </div>
        </div>
      </div>
    </div>
  );
};

const VerticalTimeLineCard = ({ date, location, statusText }) => {
  return (
    <div className="relative border-l-2 border-dashed border-accent-color pb-5 pl-10">
      <h3 className="pb-1 text-[15px] font-semibold text-text-primary-color">
        {date}
      </h3>
      <h5 className="pb-2 text-[13px] text-text-secondary-color">
        {statusText}
        {"  "}
        <span className="font-semibold text-text-primary-color">
          - {location}
        </span>
      </h5>
      <div className="absolute left-0 top-0 z-10 flex size-5 -translate-x-2/4 items-center justify-center rounded-full bg-accent-color text-xs text-white">
        <FaTruckMoving />
      </div>
    </div>
  );
};
