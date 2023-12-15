import React from "react";

const SaleStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card card-custom mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Doanh thu</h5>
          <iframe 
            title="Doanh thu"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              width: "100%",
              height: "350px"
            }} 
            src="https://charts.mongodb.com/charts-atlat_mongodb-vuzxw/embed/charts?id=6385a1fb-6ca1-47a8-80ef-08768a902b5f&maxDataAge=3600&theme=light&autoRefresh=true">
          </iframe>
          {/* <img
            style={{ width: "100%", height: "350px", objectFit: "contain" }}
            src="/images/static.png"
          /> */}
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;
