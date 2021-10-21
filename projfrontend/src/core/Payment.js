import { logDOM } from "@testing-library/dom";
import DropIn from "braintree-web-drop-in-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { loadCart, emptyCart } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import { getmeToken, processPayment } from "./helper/paymentHelper";

const Payment = ({ products, setreload = (f) => f, reload = undefined }) => {
  const [info, setinfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      console.log("INFO", info);
      if (info.error) {
        setinfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setinfo({ clientToken });
      }
    });
  };
  const shoebtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={instance => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
        )}
      </div>
    );
  };
  // const shoebtdropIn = () => {
  //   if (info.clientToken == null) {
  //     return <h3>Please login</h3>;
  //   } else if (products.length == 0) {
  //     return <h3>Please add products</h3>;
  //   } else if (info.clientToken !== null && products.length > 0) {
  //     return (
  //       <div>
  //         <DropIn
  //           options={{ authorization: info.clientToken }}
  //           onInstance={(instance) => (info.instance = instance)}
  //         />
  //         <button className="btn btn-block btn-success" onClick={onPurchase}>
  //           Buy
  //         </button>
  //       </div>
  //     );
  //   }
  // };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setinfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then(data => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount()
      };
      processPayment(userId, token, paymentData)
        .then(response => {
          setinfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS");
          //TODO: empty the cart
          //TODO: force reload
        })
        .catch(error => {
          setinfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>Checkout</h3>
      <h4>Your bill is {getAmount()}</h4>
      {shoebtdropIn()}
    </div>
  );
};
export default Payment;
