import React from 'react';

const CoreCompetency = () => {
  return (
    <section 
      className="min-h-auto py-16 flex flex-col lg:flex-row items-center justify-center"
      style={{ backgroundColor: '#09252c' }}
    >
      <div className="container mx-auto px-6 lg:px-16 xl:px-44 ">
        <div className="flex flex-col lg:flex-row items-center justify-between  lg:gap-16 gap-16">
          
          {/* Title - Left on PC, Top on Mobile */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 leading-tight">
              Our Core
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-emerald-400 leading-tight">
              Competency
            </h2>
          </div>

          {/* Image - Right on PC, Bottom on Mobile */}
          <div className="lg:w-1/2 w-full max-w-lg md:max-w-xl lg:max-w-none">
            <img 
              src="https://fra.cloud.appwrite.io/v1/storage/buckets/blog_thumbnails/files/image1212/view?project=68574292002de14cb7f4&mode=admin" 
              alt="Core Competency" 
              className="w-full h-auto"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default CoreCompetency; 