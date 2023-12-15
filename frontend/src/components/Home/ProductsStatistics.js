import React from "react";


const ProductsStatistics = () => {
  
  
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card card-custom mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Số liệu thống kê sản phẩm</h5>
          <iframe 
            title="Số liệu thống kê sản phẩm"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              width: "100%",
              height: "350px"
            }}
            src="https://charts.mongodb.com/charts-atlat_mongodb-vuzxw/embed/charts?id=6385a49b-ac07-43ea-8524-02272aac61be&maxDataAge=3600&theme=light&autoRefresh=true">
          </iframe>
          
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistics;
