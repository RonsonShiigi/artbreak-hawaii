const express = require("express");
const app = express();

//routes
const UserRoutes = require("./users");
const ProductRoutes = require("./products");
const CommentRoutes = require("./comments");
const PurchaseRoutes = require("./purchases");
const MessageRoutes = require("./messages");
const LikeRoutes = require("./likes");
const AuthRoutes = require("./auth");
const ShoppingCartRoutes = require("./shoppingcart");
const PaymentRoutes = require("./payment");
const TestRoute = require("./newProduct");
const StripeRegRoutes = require("./stripeReg");
const ResetPasswordRoutes = require("./resetPassword");
const InvoiceRoutes = require("./invoice");

app.use("/users", UserRoutes);
app.use("/products", ProductRoutes);
app.use("/comments", CommentRoutes);
app.use("/purchases", PurchaseRoutes);
app.use("/messages", MessageRoutes);
app.use("/likes", LikeRoutes);
app.use("/api", AuthRoutes);
app.use("/cart", ShoppingCartRoutes);
app.use("/payment", PaymentRoutes);
app.use("/newProduct", TestRoute);
app.use("/sRegistration", StripeRegRoutes);
app.use("/resetPassword", ResetPasswordRoutes);
app.use("/invoice", InvoiceRoutes);
