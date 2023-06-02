
const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="md:w-4/12 mx-auto text-center my-10" >
            <p className="text-yellow-600 mb-2 italic" >---{subHeading}---</p>
            <h3 className="text-3xl uppercase border-y-2 border-yellow-600 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;