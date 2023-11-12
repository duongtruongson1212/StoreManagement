import { ONE_SIGNAL_CONFIG } from "../config/app.config.js";
import https from "https";
import HistoryNotification from "../Models/HistoryNotification.js";
import Inventory from "../Models/InventoryModels.js";
async function SendNotification(data) {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: "Basic " + ONE_SIGNAL_CONFIG.API_KEY,
  };
  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers,
  };
  var req = https.request(options);
  req.on("error", function (e) {
    console.log(e);
  });
  req.write(JSON.stringify(data));
  req.end();
}

function ConfigNotify({ contents, bigPicture, headings }) {
  var message = {
    app_id: ONE_SIGNAL_CONFIG.APP_ID,
    contents: { en: contents },
    included_segments: ["All"],
    content_available: true,
    small_icon: "ic_notification_icon",
    data: {
      PushTitle: "Custom Notification",
    },
    name: "INTERNAL_CAMPAIGN_NAME",
    big_picture: bigPicture,
    headings: {
      en: headings,
    },
  };

  SendNotification(message);
}

async function sendNotificationsExpDrug() {
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const query = { expDrug: { $lt: thirtyDaysFromNow } };
  const products = await Inventory.find(query).populate("idDrug", "name");
  if (products.length > 0) {
    products.forEach(async (product) => {
      const message = {
        headings: "Phòng Khám đa khoa Mỹ Thạnh",
        contents: `Thuốc ${
          product.idDrug.name
        } sắp hết hạn sử dụng (${product.expDrug.toLocaleDateString("en-GB")})`,
      };
      ConfigNotify(message);
      await HistoryNotification.saveNotification(message);
    });
  }
}
async function sendNotificationsInventory() {
  const products = await Inventory.find({ count: { $lt: 30 } }).populate(
    "idDrug",
    "name"
  );
  if (products.length > 0) {
    products.forEach(async (product) => {
      const message = {
        headings: "Phòng Khám đa khoa Mỹ Thạnh",
        contents: `Thuốc ${product.idDrug.name} dưới mức tồn kho (${product.count})`,
      };
      ConfigNotify(message);
      await HistoryNotification.saveNotification(message);
    });
  }
}
export {
  sendNotificationsExpDrug,
  sendNotificationsInventory,
  SendNotification,
  ConfigNotify,
};
