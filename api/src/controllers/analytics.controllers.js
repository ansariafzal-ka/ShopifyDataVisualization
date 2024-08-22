const mongoose = require("mongoose");
const db = mongoose.connection;
const shopifyCustomers = db.collection("shopifyCustomers");
const shopifyOrders = db.collection("shopifyOrders");

const analyticsControllers = {
  getAggregateSales: async (req, res) => {
    const { interval } = req.query;

    if (!["daily", "monthly", "quarterly", "yearly"].includes(interval)) {
      return res.status(400).json({ error: "Invalid interval parameter" });
    }

    try {
      let groupBy;
      switch (interval) {
        case "daily":
          groupBy = {
            $dateToString: {
              format: "%Y-%m-%d",
              date: { $dateFromString: { dateString: "$created_at" } },
            },
          };
          break;
        case "monthly":
          groupBy = {
            $dateToString: {
              format: "%Y-%m",
              date: { $dateFromString: { dateString: "$created_at" } },
            },
          };
          break;
        case "quarterly":
          groupBy = {
            $concat: [
              {
                $toString: {
                  $year: { $dateFromString: { dateString: "$created_at" } },
                },
              },
              "-Q",
              {
                $toString: {
                  $ceil: {
                    $divide: [
                      {
                        $month: {
                          $dateFromString: { dateString: "$created_at" },
                        },
                      },
                      3,
                    ],
                  },
                },
              },
            ],
          };
          break;
        case "yearly":
          groupBy = {
            $dateToString: {
              format: "%Y",
              date: { $dateFromString: { dateString: "$created_at" } },
            },
          };
          break;
        default:
          return res.status(400).json({ error: "Invalid interval parameter" });
      }

      const salesAggregation = await shopifyOrders
        .aggregate([
          {
            $match: {
              financial_status: "paid",
            },
          },
          {
            $addFields: {
              created_at_date: {
                $dateFromString: { dateString: "$created_at" },
              },
            },
          },
          {
            $group: {
              _id: groupBy,
              totalSales: {
                $sum: { $toDouble: "$total_price_set.shop_money.amount" },
              },
            },
          },
          {
            $sort: { _id: 1 },
          },
        ])
        .toArray();

      if (!salesAggregation.length)
        return res.status(400).json({ "error message": "no sales data found" });

      res.status(200).json({ [`Total Sales (${interval})`]: salesAggregation });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  getSalesGrowthRate: async (req, res) => {
    const { interval } = req.query;

    if (!["daily", "monthly", "quarterly", "yearly"].includes(interval)) {
      return res.status(400).json({ error: "Invalid interval parameter" });
    }

    try {
      let groupBy, dateFormat;
      switch (interval) {
        case "daily":
          groupBy = {
            $dateToString: {
              format: "%Y-%m-%d",
              date: { $dateFromString: { dateString: "$created_at" } },
            },
          };
          break;
        case "monthly":
          groupBy = {
            $dateToString: {
              format: "%Y-%m",
              date: { $dateFromString: { dateString: "$created_at" } },
            },
          };
          break;
        case "quarterly":
          groupBy = {
            $concat: [
              {
                $toString: {
                  $year: { $dateFromString: { dateString: "$created_at" } },
                },
              },
              "-Q",
              {
                $toString: {
                  $ceil: {
                    $divide: [
                      {
                        $month: {
                          $dateFromString: { dateString: "$created_at" },
                        },
                      },
                      3,
                    ],
                  },
                },
              },
            ],
          };
          break;
        case "yearly":
          groupBy = {
            $dateToString: {
              format: "%Y",
              date: { $dateFromString: { dateString: "$created_at" } },
            },
          };
          break;
        default:
          return res.status(400).json({ error: "Invalid interval parameter" });
      }

      const salesData = await shopifyOrders
        .aggregate([
          {
            $match: { financial_status: "paid" },
          },
          {
            $addFields: {
              created_at_date: {
                $dateFromString: { dateString: "$created_at" },
              },
            },
          },
          {
            $group: {
              _id: groupBy,
              totalSales: {
                $sum: { $toDouble: "$total_price_set.shop_money.amount" },
              },
            },
          },
          {
            $sort: { _id: 1 },
          },
        ])
        .toArray();

      const growthRates = salesData.map((current, index, array) => {
        if (index === 0) {
          return { _id: current._id, growthRate: 0 };
        }

        const previous = array[index - 1];
        const growthRate =
          ((current.totalSales - previous.totalSales) / previous.totalSales) *
          100;

        return { _id: current._id, growthRate: growthRate.toFixed(2) };
      });

      if (!growthRates.length)
        return res.status(400).json({ "error message": "no sales data found" });

      res
        .status(200)
        .json({ [`Sales Growth Rate (${interval})`]: growthRates });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  getNewCustomersOverTime: async (req, res) => {
    const { interval } = req.query;

    if (!["daily", "monthly", "quarterly", "yearly"].includes(interval)) {
      return res.status(400).json({ error: "Invalid interval parameter" });
    }

    try {
      let groupBy;
      switch (interval) {
        case "daily":
          groupBy = {
            $dateToString: {
              format: "%Y-%m-%d",
              date: { $dateFromString: { dateString: "$created_at" } },
            },
          };
          break;
        case "monthly":
          groupBy = {
            $dateToString: {
              format: "%Y-%m",
              date: { $dateFromString: { dateString: "$created_at" } },
            },
          };
          break;
        case "quarterly":
          groupBy = {
            $concat: [
              {
                $toString: {
                  $year: { $dateFromString: { dateString: "$created_at" } },
                },
              },
              "-Q",
              {
                $toString: {
                  $ceil: {
                    $divide: [
                      {
                        $month: {
                          $dateFromString: { dateString: "$created_at" },
                        },
                      },
                      3,
                    ],
                  },
                },
              },
            ],
          };
          break;
        case "yearly":
          groupBy = {
            $dateToString: {
              format: "%Y",
              date: { $dateFromString: { dateString: "$created_at" } },
            },
          };
          break;
        default:
          return res.status(400).json({ error: "Invalid interval parameter" });
      }

      const customersAggregation = await shopifyCustomers
        .aggregate([
          {
            $addFields: {
              created_at_date: {
                $dateFromString: { dateString: "$created_at" },
              },
            },
          },
          {
            $group: {
              _id: groupBy,
              newCustomers: { $sum: 1 },
            },
          },
          {
            $sort: { _id: 1 },
          },
        ])
        .toArray();

      if (!customersAggregation.length)
        return res
          .status(400)
          .json({ "error message": "no customer data found" });

      res
        .status(200)
        .json({ [`New Customers (${interval})`]: customersAggregation });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  getRepeatCustomers: async (req, res) => {
    const { interval } = req.query;

    if (!["daily", "monthly", "quarterly", "yearly"].includes(interval)) {
      return res.status(400).json({ error: "Invalid interval parameter" });
    }

    try {
      let groupBy;
      switch (interval) {
        case "daily":
          groupBy = {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$created_at",
            },
          };
          break;
        case "monthly":
          groupBy = {
            $dateToString: {
              format: "%Y-%m",
              date: "$created_at",
            },
          };
          break;
        case "quarterly":
          groupBy = {
            $concat: [
              { $toString: { $year: "$created_at" } },
              "-Q",
              {
                $toString: {
                  $ceil: {
                    $divide: [{ $month: "$created_at" }, 3],
                  },
                },
              },
            ],
          };
          break;
        case "yearly":
          groupBy = {
            $dateToString: {
              format: "%Y",
              date: "$created_at",
            },
          };
          break;
        default:
          return res.status(400).json({ error: "Invalid interval parameter" });
      }

      const repeatCustomersAggregation = await shopifyOrders
        .aggregate([
          {
            $match: {
              financial_status: "paid",
            },
          },
          {
            $addFields: {
              created_at: { $dateFromString: { dateString: "$created_at" } },
            },
          },
          {
            $group: {
              _id: {
                customerId: "$customer.id",
                timeFrame: groupBy,
              },
              totalPurchases: { $sum: 1 },
            },
          },
          {
            $match: {
              totalPurchases: { $gt: 1 },
            },
          },
          {
            $group: {
              _id: "$_id.timeFrame",
              repeatCustomersCount: { $sum: 1 },
            },
          },
          {
            $sort: { _id: 1 },
          },
        ])
        .toArray();

      if (!repeatCustomersAggregation.length) {
        return res
          .status(400)
          .json({ error: "No repeat customers data found" });
      }

      res.status(200).json({
        [`Number of Repeat Customers (${interval})`]:
          repeatCustomersAggregation,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  getGeographicalDistribution: async (req, res) => {
    try {
      const cityAggregation = await shopifyCustomers
        .aggregate([
          {
            $match: {
              "default_address.city": { $exists: true, $ne: "" },
            },
          },
          {
            $group: {
              _id: "$default_address.city",
              customerCount: { $sum: 1 },
            },
          },
          {
            $sort: { customerCount: -1 },
          },
        ])
        .toArray();

      if (!cityAggregation.length)
        return res.status(400).json({ error: "No customer data found" });

      res
        .status(200)
        .json({ "Geographical Distribution by City": cityAggregation });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  getCustomerLifetimeValueByCohort: async (req, res) => {
    try {
      const cohorts = await shopifyOrders
        .aggregate([
          {
            $match: { financial_status: "paid" },
          },
          {
            $group: {
              _id: "$customer.id",
              firstPurchaseMonth: {
                $min: {
                  $dateToString: {
                    format: "%Y-%m",
                    date: { $dateFromString: { dateString: "$created_at" } },
                  },
                },
              },
              totalSpent: {
                $sum: { $toDouble: "$total_price_set.shop_money.amount" },
              },
            },
          },
          {
            $group: {
              _id: "$firstPurchaseMonth",
              totalLifetimeValue: { $sum: "$totalSpent" },
              numberOfCustomers: { $sum: 1 },
            },
          },
          {
            $sort: { _id: 1 },
          },
        ])
        .toArray();

      if (!cohorts.length) {
        return res.status(400).json({ error: "No cohort data found" });
      }

      res.status(200).json({ "Customer Lifetime Value by Cohort": cohorts });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};

module.exports = analyticsControllers;
