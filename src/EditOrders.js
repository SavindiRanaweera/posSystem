import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./utils/Authcontext";

function EditOrders() {
  const { isAuthenticated, jwtToken } = useAuth();

  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState(null);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  }

  useEffect(() => {
    if(isAuthenticated){
      axios
      .get(`http://localhost:8081/transactions/${id}`,config)
      .then(function (response) {
        setOrder(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:8081/items",config)
      .then(function (response) {
        setItems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
  }, [isAuthenticated]);

  return (
    <div className="container">
      <h1>Add Items to Cart #{id}</h1>

      {order && (
        <div>
          <div className="order-details">
            <div className="d-flex align-items-center justify-content-between">
              <div className="datetime">Date and Time: {order.orderDate}</div>
              <div className="total-price">
                <h3>Total Price: Rs. {order.totalPrice}</h3>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-9">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {order.saleItems.map((item) => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            const data = {
                              itemId: item.id,
                              quantity: 1,
                            };

                            axios
                              .delete(
                                `http://localhost:8081/transactions/${id}/removeCartItem`,
                                {
                                  data: data,
                                },config
                              )
                              .then(function (response) {
                                setOrder(response.data);
                              })
                              .catch(function (error) {
                                console.log(error);
                              });
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button type="button" className="btn btn-success  btn-lg" onClick={
                
                () => {
                            const data = {
                              status:1,
                            };

                            axios
                              .put(
                                `http://localhost:8081/transactions/${id}`,
                                 data,config
                                
                              )
                              .then(function (response) {
                                setOrder(response.data);
                                navigate(`/orders`);
                              })
                              .catch(function (error) {
                                console.log(error);
                              });
                          }}>
                Complete Order
              </button>
            </div>

            <div className="col-lg-3">
              <div className="items">
                {items &&
                  items.map((item) => (
                    <div className="item p-3 bg-light shadow-sm mb-3 rounded">
                      <h5>{item.name}</h5>
                      <div>Rs. {item.price}</div>
                      <button
                        type="button"
                        onClick={() => {
                          const data = {
                            itemId: item.id,
                            quantity: 1,
                          };

                          axios
                            .post(
                              `http://localhost:8081/transactions/${id}/addCartItem`,
                              data,config
                            )
                            .then(function (response) {
                              setOrder(response.data);
                            })
                            .catch(function (error) {
                              console.log(error);
                            });
                        }}
                        className="btn btn-outline-secondary btn-sm"
                      >
                        Add
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          
        </div>
      )}
    </div>
  );
}

export default EditOrders;
