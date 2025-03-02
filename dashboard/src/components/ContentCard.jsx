export const ContentCard = ({ src = "", heading = "", subHeading = "" }) => {
  return (
    <div className="flex items-center gap-4">
      <figure className="flex size-10 items-center justify-center overflow-hidden rounded bg-gray-300">
        <img src={src} className="w-full rounded object-cover" />
      </figure>
      <div>
        <h5 className="text-sm font-semibold text-text-primary-color">
          {heading}
        </h5>
        <p className="text-xs font-medium text-text-secondary-color">
          {subHeading}
        </p>
      </div>
    </div>
  );
};
