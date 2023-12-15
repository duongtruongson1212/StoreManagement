import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
const Sidebar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div style={{ fontSize: "19px" }}>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src="/images/user_avatar_default.png"
              // src="	https://tpone.vn/webinfo_files/images/5410b390-461d-11ed-a701-9b027010aa3d--Group%202268.png"
              style={{ height: "46" }}
              className="logo"
              alt="Ecommerce dashboard template"
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            {/* //! Trang chủ */}
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/"
                exact={true}
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Trang chủ</span>
              </NavLink>
            </li>

            {/* //! Danh mục  */}
            {(userInfo?.role === "isAdmin" ||
              userInfo?.role === "isInventory" ||
              userInfo?.role === "isSaleAgent") && (
              <>
                <li className="menu-item lv1 arrow down">
                  <NavLink
                    activeClassName="active"
                    className="menu-link"
                    to="/products"
                  >
                    <i className="icon fas fa-list"></i>
                    <span className="text">Danh mục</span>
                  </NavLink>
                  <ul className="menu-aside lv2">
                    <li className="menu-item">
                      <NavLink
                        activeClassName="active"
                        className="menu-link"
                        to="/products"
                      >
                        <i className="icon fas fa-capsules"></i>
                        <span className="text">Dược phẩm</span>
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        activeClassName="active"
                        className="menu-link"
                        to="/categories"
                      >
                        <i className="icon fas fa-medkit"></i>
                        <span className="text">Nhóm sản phẩm</span>
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        activeClassName="active"
                        className="menu-link"
                        to="/categories-drug"
                      >
                        <i className="icon fas fa-pills"></i>
                        <span className="text">Nhóm thuốc</span>
                      </NavLink>
                    </li>
                  </ul>
                </li>
                {/* //! Supplier */}
                <li className="menu-item">
                  <NavLink
                    activeClassName="active"
                    className="menu-link"
                    to="/providers"
                  >
                    <i className="icon fas fa-store-alt"></i>
                    <span className="text">Nhà cung cấp</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* //! Thông tin cá nhân */}
            {userInfo.role === "isAdmin" && (
              <>
                <li className="menu-item">
                  <NavLink
                    activeClassName="active"
                    className="menu-link"
                    to="/users"
                  >
                    <i className="icon fas fa-user"></i>
                    <span className="text">Người dùng</span>
                  </NavLink>
                </li>
              </>
            )}
            {
              (userInfo?.role === "isAdmin" || userInfo?.role === "isSaleAgent") &&(
                <>
                {/* //! Order */}
                <li className="menu-item">
                  <NavLink
                    activeClassName="active"
                    className="menu-link"
                    to="/orders"
                  >
                    <i className="icon fas fa-bags-shopping"></i>
                    <span className="text">Đơn đặt hàng</span>
                  </NavLink>
                </li>
                {/* //! Customer */}
                <li className="menu-item">
                  <NavLink
                    activeClassName="active"
                    className="menu-link"
                    to="/customers"
                  >
                    <i className="icon fas fa-user"></i>
                    <span className="text">Khách hàng</span>
                  </NavLink>
                </li>
                {/* //! Drugstore */}
                <li className="menu-item">
                  <NavLink
                    activeClassName="active"
                    className="menu-link"
                    to="/drugstore"
                  >
                    <i className="icon fas fa-clinic-medical"></i>
                    <span className="text">Nhà Thuốc</span>
                  </NavLink>
                </li>
                {/* //! Content */}
                <li className="menu-item">
                  <NavLink
                    activeClassName="active"
                    className="menu-link"
                    to="/content/"
                  >
                    <i className="icon fas fa-server"></i>
                    <span className="text">Nội dung</span>
                  </NavLink>
                </li>
                {/* //! Review */}
                <li className="menu-item">
                  <NavLink
                    activeClassName="active"
                    className="menu-link"
                    to="/review/"
                  >
                    <i className="icon fas fa-comment-alt" ></i>
                    <span className="text">Bình luận</span>
                  </NavLink>
                </li>
                {/* //! Promotion */}
                <li className="menu-item">
                  <NavLink
                    activeClassName="active"
                    className="menu-link"
                    to="/promotion/"
                  >
                    <i className="icon fas fa-tags" ></i>
                    <span className="text">Khuyến mãi</span>
                  </NavLink>
                </li>
                </>
              )
            }
            {(userInfo.role === "isAdmin" ||
              userInfo.role === "isInventory") && (
              <>
                <li className="menu-item">
                  <NavLink
                    activeClassName="active"
                    className="menu-link"
                    to="/import-stock"
                  >
                    <i className="icon fas fa-sign-in-alt"></i>
                    <span className="text">Nhập kho</span>
                  </NavLink>
                </li>

                <li className="menu-item">
                  <NavLink
                    activeClassName="active"
                    className="menu-link"
                    to="/export-stock"
                  >
                    <i className="icon fas fa-sign-out-alt"></i>
                    <span className="text">Xuất kho</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink
                    activeClassName="active"
                    className="menu-link"
                    to="/req-inventory"
                  >
                    <i className="icon fas fa-calendar"></i>
                    <span className="text">Yêu cầu đặt hàng</span>
                  </NavLink>
                </li>

                <li className="menu-item lv1 arrow down">
                  <NavLink
                    activeClassName="active"
                    className="menu-link"
                    to="/inventories"
                  >
                    <i className="icon fas fa-warehouse"></i>
                    <span className="text">Kho dược</span>
                  </NavLink>
                  <ul className="menu-aside lv2">
                    <li className="menu-item">
                      <NavLink
                        activeClassName="active"
                        className="menu-link"
                        to="/inventories"
                      >
                        <i className="icon fas fa-archive"></i>
                        <span className="text">Xem tồn kho</span>
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        activeClassName="active"
                        className="menu-link"
                        to="/tag-inventory"
                      >
                        <i className="icon fas fa-tags"></i>
                        <span className="text">Thẻ kho</span>
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        activeClassName="active"
                        className="menu-link"
                        to="/inventory-check"
                      >
                        <i className="icon fab fa-dropbox"></i>
                        <span className="text">Kiểm kê tồn kho</span>
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
