import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./utils/Authcontext";

function Orders() {
  const { isAuthenticated, jwtToken } = useAuth();

  const [orders, setOrders] = useState(null);

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  }

  function fetchOrders() {
    axios
      .get("http://localhost:8081/transactions",config)
      .then(function (response) {
        setOrders(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if(isAuthenticated){
      fetchOrders();
    }
    
  }, [isAuthenticated]);

  function createOrder() {
    axios
      .post("http://localhost:8081/transactions",config)
      .then(function (response) {
        navigate(`/orders/${response.data.id}/editOrders`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <h1>Orders</h1>

      <div className="text-end">
        <button type="button" onClick={createOrder} className="btn btn-primary">
          Create Order
        </button>
      </div>

      <table className="table table-hover " >
        <thead>
          <tr>
            <th>#ID</th>
            <th>Date and Time</th>
            <th>Total Items</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody >
          {orders &&
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.orderDate}</td>
                <td>{order.saleItems.length}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.status === 1 ? (
                    <div className="done"><span  >Done</span></div>
                    
                  ) : (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        navigate(`/orders/${order.id}/editOrders`);
                      }}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
