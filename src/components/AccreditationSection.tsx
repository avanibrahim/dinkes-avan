import React from "react";

const AccreditationsSection = () => {
  return (
    <section className="bg-white py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left Text + Logos */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <h2 className="text-4xl font-bold text-gray-900">Accreditations</h2>
          <p className="text-teal-600 text-lg">
            their impression after using our service
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-8 pt-4">
            <img
              src="https://cdn.who.int/media/images/default-source/infographics/who-emblem.png?sfvrsn=877bb56a_2"
              alt="WHO"
              className="h-20 object-contain"
            />
            <img
              src="https://dinkes.bpkad.co.id/img/dinkes.png"
              alt="DINKES"
              className="h-20 object-contain"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0c/LOGO_KOTA_GORONTALO.png"
              alt="PEMKOT"
              className="h-20 object-contain"
            />
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="rounded-[3rem] border-2 border-teal-600 overflow-hidden p-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1b214ec01ff65d832451352c0f246216a9b8a2a3?width=1612"
              alt="Lab"
              className="rounded-[2.5rem] w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccreditationsSection;
