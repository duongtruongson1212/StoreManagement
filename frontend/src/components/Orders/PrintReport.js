import moment from "moment";
import formatCurrency from '../../util/formatCurrency';
const printReport = async(data) =>{
    const orderItems = JSON.parse(JSON.stringify(data?.orderItems))
    const contentPrint = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>inhoadon</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <style>
            .bodyPrintPhieuNhapKho * {
                font-family: Times New Roman, Open Sans, sans-serif;
                box-sizing: border-box;
            }

            body {
                background: rgb(204, 204, 204);
                font-size: 14px;
            }

            page {
                background: white;
                display: block;
                margin: 0 auto;
                padding: 10px 20px;
                margin-bottom: 0.5cm;
            }

            table {
                border-collapse: collapse;
                width: 100%;
            }

            td,
            th {
                border: 1px solid #000;
                padding: 8px 0;
            }

            td {
                text-align: center;
            }

            h2 {
                font-size: 1.2em;
                margin-bottom: 5px;
            }

            h3 {
                font-size: 1.1em;
                margin-bottom: 0;
            }

            svg {
                width: 165px !important;
                height: 40px !important;
            }

            .style-th2 {
                width: 130px;
            }

            @media print {
                body,
                page {
                    margin: 0;
                    box-shadow: 0;
                }
            }
        </style>
    </head>
    <body>
        <main class="bodyPrintPhieuNhapKho">
            <page>
                <div style="display: flex; flex-direction: row;">
                    <div style="">
                        <img style="width: 44px; height: 44px; margin-right: 10px;" alt="Sanctum-2.jpg" src="https://tpone.vn/webinfo_files/images/57c57e30-461d-11ed-a701-9b027010aa3d--XMLID_92_.png" />
                    </div>
                    <div style="">
                        <div style="font-weight: bold;">PHÒNG KHÁM ĐA KHOA MỸ THẠNH</div>
                        <div>Tổ 18, Phạm Ngũ Lão, Quận 1, Thành phố Hồ Chí Minh</div>
                        <div>
                            <span>Hotline: 0777 977 177</span>
                        </div>
                    </div>
                </div>
                <div class="title" style="text-align: center; text-transform: uppercase; font-weight: bold; color: #000000; font-size: 14px;">
                    <h2>PHIẾU HÓA ĐƠN</h2>
                </div>
                <div style="margin-top: 5px; font-size: 12px; text-align: center;"><strong>Mã hóa đơn:</strong>${data?._id}</div>
                <div style="margin-top: 5px; font-size: 12px; text-align: center;">Ngày lập: ${moment(data?.importedAt).format("YYYY-MM-DD")}</div>
                <div style="margin-top: 15px;">Nơi bán: Nhà thuốc TPone</div>
                <div style="margin-top: 5px;">Người lập: ${data?.user?.createBillPerson?data?.user?.createBillPerson:"Nhân viên"}</div>
                <div style="margin-top: 5px;">Người nhận: ${data?.user?.name}</div>
                <div style="margin-top: 5px;">Địa chỉ: ${data?.shippingAddress?.city+" - "+data?.shippingAddress?.address}</div>
                <div style="margin-top: 5px;">Số điện thoại: ${data?.user?.phone?data?.user?.phone:"012345356"}</div>

                <section style="margin-top: 20px;">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Ghi chú</th>
                                <th>Giảm giá</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orderItems?.map((item, index)=>`
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${item?.name}</td>
                                    <td>${formatCurrency(item?.price)}</td>
                                    <td>${item?.qty}</td>
                                    <td>${item?.detailStock?item?.detailStock.map(item=>"[Lô:"+ item?.lotNumber+" - "+item?.count+" sp]"):""}</td>
                                    <td>${item?.discount}%</td>
                                    <td>${formatCurrency(((item?.price*item?.qty)*((1)*(1.0)-item?.discount/100)).toFixed(2))}</td>

                                </tr>
                            `)}
                        </tbody>
                    </table>
                </section>
                <div style="margin-top: 20px; display: flex; align-items: center; width: 100%;">
                    <div style="width: 60%; text-align: right;">Tổng tiền hàng:</div>
                    <div style="width: 40%; text-align: right;">${formatCurrency(data?.itemsPrice)}</div>
                </div>
                <div style="margin-top: 8px; display: flex; align-items: center; width: 100%;">
                    <div style="width: 60%; text-align: right;">Vận chuyển:</div>
                    <div style="width: 40%; text-align: right;">${formatCurrency(data?.shippingPrice)}</div>
                </div>
                <div style="margin-top: 8px; display: flex; align-items: center; width: 100%;">
                    <div style="width: 60%; text-align: right;">Chuyển phát nhanh:</div>
                    <div style="width: 40%; text-align: right;">${formatCurrency(data?.taxPrice)}</div>
                </div>
                <div style="margin-top: 8px; display: flex; align-items: center; width: 100%;">
                    <div style="width: 60%; text-align: right;">Trừ điểm qui đổi:</div>
                    <div style="width: 40%; text-align: right;">${data?.discountPoint}</div>
                </div>
                <div style="margin-top: 8px; display: flex; align-items: center; width: 100%;">
                    <div style="width: 60%; text-align: right;">Thành tiền:</div>
                    <div style="width: 40%; text-align: right;">${formatCurrency(data?.totalPrice)}</div>
                </div>
                <div style="margin-top: 8px; display: flex; align-items: center; width: 100%;">
                    <div style="width: 60%; text-align: right;">Trạng thái:</div>
                    <div style="width: 40%; text-align: right;">${data.status[data.status.length-1].status}</div>
                </div>


                <div style="margin-top: 8px;">Ghi chú:</div>

                <div class="footer" style="display: grid; grid-template-columns: 60% 40%; margin-top: 15px; max-width: 100%; page-break-inside: avoid;">
                    <div style="text-align: center; font-weight: 600;">
                        &nbsp;
                    </div>
                    <div style="text-align: center; width: 100%;">
                        An Giang, ngày ${moment().format('DD')} tháng ${moment().format('MM')} năm ${moment().format('YYYY')}
                        <div style="height: 100px; font-weight: bold; margin-top: 5px">Người lập</div>
                        <div>${data.user?.name}</div>
                    </div>
                </div>
            </page>
        </main>
    </body>
</html>

    `

    const iframe = document.createElement('iframe')
    const div = document.createElement('div')
    div.id = 'printIF'
    iframe.srcdoc = contentPrint
    iframe.name = 'printIF'
    div.appendChild(iframe)
    document.querySelector('body').appendChild(div)
    setTimeout(() => {
      window.frames['printIF'].focus()
      window.frames['printIF'].print()
    }, 500)
    window.frames['printIF'].onafterprint = () =>
      document.querySelector('#printIF').remove()
    return true
}
export default printReport